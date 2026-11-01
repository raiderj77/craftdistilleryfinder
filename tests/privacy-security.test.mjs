import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const layout = read("src/app/layout.tsx");
const privacy = read("src/app/privacy/page.tsx");
const policy = read("next.config.ts");

test("optional analytics is consent- and env-gated", () => {
  const component = read("src/components/AnalyticsConsent.tsx");
  assert.match(layout, /AnalyticsConsent/);
  assert.doesNotMatch(layout, /googlesyndication|clarity\.ms|Cookiebot/i);
  assert.doesNotMatch(policy, /unsafe-eval|googlesyndication|clarity\.ms|Cookiebot/i);
  assert.match(policy, /googletagmanager\.com/);
  assert.match(component, /NEXT_PUBLIC_GA_ID/);
  assert.match(component, /localStorage/);
  assert.match(component, /analytics_storage: 'denied'/);
  assert.ok(component.indexOf("localStorage.getItem") < component.indexOf("googletagmanager.com/gtag/js"));
});

test("obsolete tracking cookie middleware is absent", () => {
  assert.equal(existsSync(join(root, "src/middleware.ts")), false);
  assert.equal(existsSync(join(root, "src/lib/gpc.ts")), false);
});

test("public disclosures and publisher verification match production", () => {
  assert.match(privacy, /only after you accept/i);
  assert.match(privacy, /withdraw/i);
  assert.doesNotMatch(privacy, /Google Analytics[^.]*not currently enabled/i);
  assert.match(read("public/ads.txt"), /pub-7171402107622932/);
});

test("the public footer does not cross-link to MindCheck Tools", () => {
  assert.doesNotMatch(layout, /mindchecktools\.com|Mind Check Tools/i);
});
