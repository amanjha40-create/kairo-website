type RuntimeEnv = Record<string, string | undefined>;

const DEFAULT_URLS = {
  WEBSITE_URL: "https://kairoid.com",
  HR_WORKSPACE_URL: "https://hr.kairoid.com",
  CANDIDATE_APP_URL: "https://app.kairoid.com",
  UNIVERSITY_URL: "https://university.kairoid.com",
  ADMIN_URL: "https://admin.kairoid.com",
} as const;

function getImportMetaEnv(): RuntimeEnv {
  try {
    return ((import.meta as { env?: RuntimeEnv }).env ?? {}) as RuntimeEnv;
  } catch {
    return {};
  }
}

function readEnv(name: keyof typeof DEFAULT_URLS): string | undefined {
  const env = getImportMetaEnv();
  return env[`VITE_${name}`] ?? process.env[`VITE_${name}`] ?? process.env[name];
}

function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function readUrl(name: keyof typeof DEFAULT_URLS): string {
  const value = readEnv(name) ?? DEFAULT_URLS[name];

  try {
    return normalizeUrl(new URL(value).toString());
  } catch {
    console.error(`[domains] Invalid ${name}: ${value}. Falling back to ${DEFAULT_URLS[name]}.`);
    return DEFAULT_URLS[name];
  }
}

export const WEBSITE_URL = readUrl("WEBSITE_URL");
export const HR_WORKSPACE_URL = readUrl("HR_WORKSPACE_URL");
export const CANDIDATE_APP_URL = readUrl("CANDIDATE_APP_URL");
export const UNIVERSITY_URL = readUrl("UNIVERSITY_URL");
export const ADMIN_URL = readUrl("ADMIN_URL");

export function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

export function siteUrl(path = "/"): string {
  return new URL(path, `${WEBSITE_URL}/`).toString();
}

export function urlWithPath(baseUrl: string, path = ""): string {
  return new URL(path, `${normalizeUrl(baseUrl)}/`).toString();
}

export function urlLabel(baseUrl: string, path = ""): string {
  const url = new URL(urlWithPath(baseUrl, path));
  const pathname = url.pathname === "/" ? "" : url.pathname;
  return `${url.host}${pathname}`;
}

export function urlHost(baseUrl: string): string {
  return new URL(baseUrl).host;
}
