import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('the homepage and trust pages may be indexed', () => {
  const layout = read('src/app/layout.tsx');
  assert.match(layout, /robots:\s*{[\s\S]*?index:\s*true,[\s\S]*?googleBot:\s*{\s*index:\s*true/);
});

test('thin state and listing routes remain noindex,follow', () => {
  for (const path of ['src/app/[state]/page.tsx', 'src/app/[state]/[slug]/page.tsx']) {
    const source = read(path);
    assert.match(source, /robots:\s*{\s*index:\s*false,\s*follow:\s*true/);
    assert.match(source, /googleBot:\s*{\s*index:\s*false,\s*follow:\s*true/);
  }
});

test('directory-only browse hubs remain noindex when present', () => {
  for (const path of ['src/app/browse/page.tsx', 'src/app/browse-states/page.tsx']) {
    const url = new URL(`../${path}`, import.meta.url);
    if (existsSync(url)) {
      assert.match(read(path), /robots:\s*{\s*index:\s*false,\s*follow:\s*true/);
    }
  }
});

test('the sitemap contains only an explicit allowlist', () => {
  const sitemap = read('src/app/sitemap.ts');
  assert.match(sitemap, /INDEXABLE_PATHS/);
  assert.doesNotMatch(sitemap, /data\/locations|locations\.map|statePages|locationPages|parkPages/);
  assert.match(sitemap, /'\/about'/);
  assert.match(sitemap, /'\/contact'/);
});

test('Googlebot can crawl pages to observe route-level noindex rules', () => {
  const robots = read('public/robots.txt');
  assert.match(robots, /User-agent:\s*Googlebot[\s\S]*?Allow:\s*\//i);
});

test('imported records are not presented as live-verified visitor profiles', () => {
  const home = read('src/app/page.tsx');
  const state = read('src/app/[state]/page.tsx');
  const detail = read('src/app/[state]/[slug]/page.tsx');
  const llms = read('public/llms.txt');

  assert.match(home, /imported location records, not live-verified distillery profiles/i);
  assert.match(home, /0[\s\S]*Live-verified profiles/);
  assert.match(state, /Not live-verified/);
  assert.match(detail, /does not record the original source or collection date/i);
  assert.doesNotMatch(detail, /'@type': 'Winery'/);
  assert.match(llms, /Bulk imported pages are not monetization-ready/);
});

test('unsupported tours, tastings, pricing, hours, and market claims stay retired', () => {
  const home = read('src/app/page.tsx');
  const about = read('src/app/about/page.tsx');
  const contact = read('src/app/contact/page.tsx');
  const terms = read('src/app/terms/page.tsx');

  for (const source of [home, about]) {
    assert.doesNotMatch(source, /\$15 to \$30|\$10 to \$20|over 2,000 craft|grown over 700%|sales exceeded \$6 billion/i);
    assert.doesNotMatch(source, /Most craft distilleries (?:offer|are open)|verified distillery directory/i);
  }
  assert.doesNotMatch(contact, /respond.+2-3 business days/i);
  assert.doesNotMatch(terms, /By using[\s\S]*at least 21 years of age/i);
});

test('source limits and accessible navigation are visible', () => {
  const layout = read('src/app/layout.tsx');
  const home = read('src/app/page.tsx');
  const browse = read('src/app/browse/page.tsx');
  const css = read('src/app/globals.css');

  assert.match(home, /no source, website, phone, hours, product, reservation/i);
  assert.match(layout, /Skip to main content/);
  assert.match(layout, /age and ID policy/i);
  assert.match(browse, /googleBot:\s*{\s*index:\s*false/);
  assert.match(css, /:focus-visible/);
});

test('the Creator footer link is followed only on the homepage', () => {
  const layout = read('src/app/layout.tsx');
  const creatorLink = read('src/components/CreatorRevenueLink.tsx');

  assert.match(layout, /s\.href === 'https:\/\/creatorrevenuecalculator\.com'/);
  assert.match(creatorLink, /pathname === '\/' \? 'noopener noreferrer' : 'nofollow noopener noreferrer'/);
});
