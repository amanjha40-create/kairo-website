import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const routeSource = fs.readFileSync(path.join(repoRoot, "src/routes/invite.$token.tsx"), "utf8");
const rootSource = fs.readFileSync(path.join(repoRoot, "src/routes/__root.tsx"), "utf8");
const assetLinks = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "public/.well-known/assetlinks.json"), "utf8"),
);

test("public invitation router stays generic and never loads invitation data", () => {
  assert.match(routeSource, /You&apos;ve received a Trust Invitation/);
  assert.match(routeSource, /Open KairoID to review and respond/);
  assert.doesNotMatch(routeSource, /apiClient|fetch\(|organization_name|subject_name|requirements/);
  assert.doesNotMatch(routeSource, /console\.|trackEvent|analytics/);
  assert.match(rootSource, /isPublicInviteRouter \? content : <AuthProvider>/);
  assert.match(rootSource, /!nextPath\.startsWith\("\/invite\/"\)/);
});

test("public invitation router links only to the canonical app route and Play listing", () => {
  assert.match(routeSource, /`\/invite\/\$\{encodeURIComponent\(token\)\}`/);
  assert.match(
    routeSource,
    /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.kairoid\.app/,
  );
  assert.doesNotMatch(routeSource, /app\.kairoid\.com|candidate|email=/i);
  assert.match(routeSource, /referrerPolicy="no-referrer"/);
});

test("public invitation router is excluded from indexing and referrer leakage", () => {
  assert.match(routeSource, /noindex, nofollow, noarchive/);
  assert.match(routeSource, /name: "referrer", content: "no-referrer"/);
});

test("asset links publishes only the certified Play production identity", () => {
  assert.deepEqual(assetLinks, [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.kairoid.app",
        sha256_cert_fingerprints: [
          "38:CB:29:61:3E:0B:47:45:41:51:21:43:FA:6D:2A:BF:1B:62:E5:DF:E5:D9:29:56:14:E6:4D:51:51:06:03:79",
        ],
      },
    },
  ]);
});
