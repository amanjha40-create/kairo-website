import { CONTACT_TO_EMAIL, type ContactFormData } from "@/lib/contact";

type SesConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  region: string;
  fromEmail: string;
};

type SesSendResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

function getSesConfig(): SesConfig | null {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.AWS_SESSION_TOKEN;
  const region = process.env.AWS_REGION;
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;

  if (!accessKeyId || !secretAccessKey || !region || !fromEmail) {
    return null;
  }

  return {
    accessKeyId,
    secretAccessKey,
    sessionToken,
    region,
    fromEmail,
  };
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toHex(digest);
}

async function hmacSha256Raw(
  key: string | ArrayBuffer | Uint8Array,
  value: string,
): Promise<ArrayBuffer> {
  const rawKey =
    typeof key === "string"
      ? new TextEncoder().encode(key)
      : key instanceof Uint8Array
        ? key.slice()
        : new Uint8Array(key);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    rawKey as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  return crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(value));
}

async function hmacSha256Hex(
  key: string | ArrayBuffer | Uint8Array,
  value: string,
): Promise<string> {
  return toHex(await hmacSha256Raw(key, value));
}

async function getSignatureKey(secretAccessKey: string, dateStamp: string, region: string) {
  const kDate = await hmacSha256Raw(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = await hmacSha256Raw(kDate, region);
  const kService = await hmacSha256Raw(kRegion, "ses");
  return hmacSha256Raw(kService, "aws4_request");
}

function buildPlainTextBody(payload: ContactFormData): string {
  return [
    "New Kairo contact request",
    "",
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Work email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Hires per month: ${payload.hires}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export async function sendContactEmail(payload: ContactFormData): Promise<SesSendResult> {
  const config = getSesConfig();
  if (!config) {
    return { ok: false, error: "Contact email service is not configured." };
  }

  const endpoint = `https://email.${config.region}.amazonaws.com/v2/email/outbound-emails`;
  const host = `email.${config.region}.amazonaws.com`;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const dateStamp = amzDate.slice(0, 8);

  const requestBody = JSON.stringify({
    FromEmailAddress: config.fromEmail,
    Destination: { ToAddresses: [CONTACT_TO_EMAIL] },
    ReplyToAddresses: [payload.email],
    Content: {
      Simple: {
        Subject: { Data: `New contact request - ${payload.company}` },
        Body: {
          Text: { Data: buildPlainTextBody(payload) },
        },
      },
    },
  });

  const payloadHash = await sha256Hex(requestBody);
  const canonicalHeaders = [
    "content-type:application/json",
    `host:${host}`,
    `x-amz-content-sha256:${payloadHash}`,
    `x-amz-date:${amzDate}`,
    ...(config.sessionToken ? [`x-amz-security-token:${config.sessionToken}`] : []),
  ].join("\n");
  const signedHeaders = [
    "content-type",
    "host",
    "x-amz-content-sha256",
    "x-amz-date",
    ...(config.sessionToken ? ["x-amz-security-token"] : []),
  ].join(";");

  const canonicalRequest = [
    "POST",
    "/v2/email/outbound-emails",
    "",
    `${canonicalHeaders}\n`,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${config.region}/ses/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = await getSignatureKey(
    config.secretAccessKey,
    dateStamp,
    config.region,
  );
  const signature = await hmacSha256Hex(signingKey, stringToSign);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: [
        "AWS4-HMAC-SHA256",
        `Credential=${config.accessKeyId}/${credentialScope},`,
        `SignedHeaders=${signedHeaders},`,
        `Signature=${signature}`,
      ].join(" "),
      "Content-Type": "application/json",
      Host: host,
      "X-Amz-Content-Sha256": payloadHash,
      "X-Amz-Date": amzDate,
      ...(config.sessionToken
        ? { "X-Amz-Security-Token": config.sessionToken }
        : {}),
    },
    body: requestBody,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[contact-email] SES delivery failed", response.status, body);
    return { ok: false, error: "Contact email delivery failed." };
  }

  const data = (await response.json().catch(() => null)) as
    | { MessageId?: string; messageId?: string }
    | null;
  const messageId = data?.MessageId ?? data?.messageId;

  if (!messageId) {
    console.error("[contact-email] SES response missing message id", data);
    return { ok: false, error: "Contact email delivery failed." };
  }

  return { ok: true, messageId };
}
