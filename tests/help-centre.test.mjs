import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

import ts from "../node_modules/typescript/lib/typescript.js";

const require = createRequire(import.meta.url);
const repoRoot = path.resolve(import.meta.dirname, "..");
const candidateRepoRoot = "/Users/Aman/Desktop/work/kairo-candidate-android-v1-production";
const hrRepoRoot = "/Users/Aman/Desktop/work/kairo-hr-workspace";
const institutionRepoRoot = "/Users/Aman/Desktop/work/kairo-institution-workspace";
const validAudiences = new Set(["candidate", "hr", "institution", "security", "troubleshooting"]);
const validSections = new Set([
  "candidate",
  "hr",
  "institution",
  "account-security",
  "troubleshooting",
  "contact-support",
]);

test("the visible website brand uses the approved canonical KairoID lockup", () => {
  const logoPath = path.join(repoRoot, "src/assets/kairoid-logo-primary.png");
  const logoHash = crypto.createHash("sha256").update(fs.readFileSync(logoPath)).digest("hex");
  const faviconPath = path.join(repoRoot, "public/kairoid-favicon.png");
  const faviconHash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(faviconPath))
    .digest("hex");
  const logoSource = fs.readFileSync(path.join(repoRoot, "src/components/Logo.tsx"), "utf8");
  const rootSource = fs.readFileSync(path.join(repoRoot, "src/routes/__root.tsx"), "utf8");
  const footerSource = fs.readFileSync(
    path.join(repoRoot, "src/components/site/SiteFooter.tsx"),
    "utf8",
  );

  assert.equal(logoHash, "1c386d11e0c9dcbb4d67e99f9f5bffef779664b2c75452dedf2391f6e6aee5dc");
  assert.equal(faviconHash, "1042fd2a4e70c06387ddcb8d9357e36357614fa9a8ba7a692cd7c455d3561e89");
  assert.match(logoSource, /alt="KairoID"/);
  assert.match(logoSource, /width=\{728\}/);
  assert.match(logoSource, /height=\{192\}/);
  assert.match(footerSource, /Verify once\. Trusted everywhere\./);
  assert.match(rootSource, /href: "\/kairoid-favicon\.png"/);
});

function loadTsModule(filePath, { stripSiteUrlImport = false } = {}) {
  let source = fs.readFileSync(filePath, "utf8");
  if (stripSiteUrlImport) {
    source = source.replace(
      /^import\s+\{\s*siteUrl\s*\}\s+from\s+["']@\/lib\/domain-config["'];?\n/m,
      "",
    );
  }

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: path.basename(filePath),
  }).outputText;

  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    require: (specifier) => {
      if (specifier === "zod") return require("zod");
      throw new Error(`Unsupported require: ${specifier}`);
    },
    siteUrl: (route = "") => `https://kairoid.com${route}`,
    URL,
    console,
  };

  vm.runInNewContext(transpiled, context, { filename: filePath });
  return module.exports;
}

const helpCentre = loadTsModule(path.join(repoRoot, "src/lib/help-center.ts"), {
  stripSiteUrlImport: true,
});
const supportRequest = loadTsModule(path.join(repoRoot, "src/lib/support-request.ts"), {
  stripSiteUrlImport: true,
});
const candidateHelpLinksSource = fs.readFileSync(
  path.join(candidateRepoRoot, "src/shared/lib/help-links.ts"),
  "utf8",
);
const institutionHelpLinksSource = fs.readFileSync(
  path.join(institutionRepoRoot, "src/lib/institution/help-links.ts"),
  "utf8",
);
const hrHelpWidgetSource = fs.readFileSync(
  path.join(hrRepoRoot, "src/components/app/HelpWidget.tsx"),
  "utf8",
);

function extractHelpCenterPaths(source) {
  return [...source.matchAll(/helpCenterUrl\("([^"]+)"\)/g)].map((match) => match[1]);
}

function extractSupportPath(source) {
  const match = source.match(/help-center\/contact-support|helpSupportUrl\s*\(/);
  return match ? "/help-center/contact-support" : null;
}

test("help article slugs are unique and article lookup resolves known content", () => {
  const slugs = helpCentre.helpArticles.map((article) => article.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  const article = helpCentre.getHelpArticle("candidate-password-reset");
  assert.ok(article);
  assert.equal(article.slug, "candidate-password-reset");
});

test("help article categories, sections, audiences, and related references are valid", () => {
  for (const article of helpCentre.helpArticles) {
    assert.ok(article.category.trim().length > 0, `${article.slug} has category`);
    assert.ok(validSections.has(article.section), `${article.slug} section is valid`);
    for (const audience of article.audience) {
      assert.ok(validAudiences.has(audience), `${article.slug} audience ${audience} is valid`);
    }
    for (const relatedSlug of article.related) {
      if (relatedSlug === "contact-support") continue;
      assert.ok(
        helpCentre.getHelpArticle(relatedSlug),
        `${article.slug} related article ${relatedSlug} resolves`,
      );
    }
  }
});

test("unknown slug lookup fails closed", () => {
  assert.equal(helpCentre.getHelpArticle("not-a-real-article"), null);
});

test("search finds representative Help Centre articles", () => {
  const expectedMatches = new Map([
    ["password reset", "candidate-password-reset"],
    ["trust invitation", "trust-invitation-basics"],
    ["verification pending", "verification-pending-troubleshooting"],
    ["upload document", "candidate-evidence-help"],
    ["passport", "candidate-trust-passport"],
    ["university verification", "institution-getting-started"],
    ["email not received", "otp-not-received"],
  ]);

  for (const [query, expectedSlug] of expectedMatches) {
    const results = helpCentre.searchHelpArticles(query);
    assert.ok(
      results.some((article) => article.slug === expectedSlug),
      `${query} finds ${expectedSlug}`,
    );
  }
});

test("support request validation enforces required fields, enums, email, honeypot, and optional public ID", () => {
  const valid = supportRequest.supportRequestSchema.safeParse({
    name: "Aman Test",
    email: "aman@example.com",
    product: "Candidate",
    category: "OTP not received",
    subject: "OTP help",
    description: "I did not receive the OTP on my registered phone number.",
    relevantPublicId: "",
    currentRoute: "/help-center/contact-support",
    appVersion: "1.0.0",
    platform: "web",
    pageUrl: "https://kairoid.com/help-center/contact-support",
    referrer: "",
    website: "",
  });
  assert.equal(valid.success, true);
  assert.equal(valid.data.relevantPublicId, "");

  const invalid = supportRequest.supportRequestSchema.safeParse({
    name: "",
    email: "bad-email",
    product: "Bad Product",
    category: "Other",
    subject: "",
    description: "too short",
    website: "bot",
  });
  assert.equal(invalid.success, false);
  const fields = new Set(invalid.error.issues.map((issue) => issue.path.join(".")));
  assert.ok(fields.has("name"));
  assert.ok(fields.has("email"));
  assert.ok(fields.has("product"));
  assert.ok(fields.has("subject"));
  assert.ok(fields.has("description"));
  assert.ok(fields.has("website"));
});

test("support schema strips unexpected sensitive fields instead of serializing them", () => {
  const parsed = supportRequest.supportRequestSchema.parse({
    name: "Aman Test",
    email: "aman@example.com",
    product: "Account & Security",
    category: "Security or account access concern",
    subject: "Sensitive data check",
    description: "Please help me recover access after my device was replaced yesterday.",
    relevantPublicId: "pub_123",
    currentRoute: "/help-center/contact-support",
    otp: "123456",
    token: "secret-token",
    accessToken: "secret-access-token",
    refreshToken: "secret-refresh-token",
    password: "secret-password",
    website: "",
  });

  assert.equal("otp" in parsed, false);
  assert.equal("token" in parsed, false);
  assert.equal("accessToken" in parsed, false);
  assert.equal("refreshToken" in parsed, false);
  assert.equal("password" in parsed, false);
});

test("candidate, HR, and institution contextual help links resolve to valid Help Centre routes", () => {
  for (const pathName of extractHelpCenterPaths(candidateHelpLinksSource)) {
    const slug = pathName.replace(/^\//, "");
    if (slug === "contact-support") continue;
    assert.ok(helpCentre.getHelpArticle(slug), `${slug} resolves`);
  }

  assert.equal(extractSupportPath(candidateHelpLinksSource), "/help-center/contact-support");

  for (const pathName of extractHelpCenterPaths(institutionHelpLinksSource)) {
    const slug = pathName.replace(/^\//, "");
    assert.ok(helpCentre.getHelpArticle(slug), `${slug} resolves`);
  }

  assert.equal(extractSupportPath(institutionHelpLinksSource), "/help-center/contact-support");

  assert.match(hrHelpWidgetSource, /href=\{`\$\{marketingWebsiteUrl\}\/help-center`\}/);
  assert.match(
    hrHelpWidgetSource,
    /href=\{`\$\{marketingWebsiteUrl\}\/help-center\/contact-support\?product=HR%20Workspace&category=Other`\}/,
  );
});
