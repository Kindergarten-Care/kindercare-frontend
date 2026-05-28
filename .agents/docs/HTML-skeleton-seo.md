# 🔍 SEO & Semantic HTML Review Guideline

This guideline outlines the non-negotiable standards for HTML structure and Technical SEO in our Next.js/React applications.

---

## 1. Semantic Architecture (The Hierarchy)
- [ ] **One `<h1>` Rule:** Each page must have exactly one `<h1>`. For the homepage/hub, it's the site name. For article details, it must be the article title.
- [ ] **Sectioning:** Major blocks of content must be wrapped in semantic tags (`<section>`, `<article>`, `<aside>`, `<nav>`), NEVER just `<div>`.
- [ ] **Accessible Labels:** Every `<section>` and `<nav>` must have an `aria-label` or `aria-labelledby` describing its purpose (e.g., `<nav aria-label="Main Categories">`).
- [ ] **Heading Hierarchy:** Headings must flow logically (`H1` -> `H2` -> `H3`). Do not skip levels (e.g., jumping from `H1` to `H3` just for styling purposes).

## 2. The "Overlay Link" Pattern (Fixing Hydration & SEO)
*We strictly prohibit nested anchor tags (`<a>` inside `<a>`).*
- [ ] **Card Wrapper:** Post cards must be wrapped in an `<article>` tag with `position: relative`, NOT an `<a>` tag.
- [ ] **Main Link:** The primary link should wrap the title (`<h2>` or `<h3>`) and use the `::after` pseudo-element with `position: absolute; inset: 0; z-index: 1;` to stretch across the card.
- [ ] **Interactive Children:** Any clickable elements inside the card (like Category Tags) must have `position: relative; z-index: 10;` to remain clickable above the overlay.

## 3. List Structures
- [ ] **Categories/Tags:** Must be rendered using `<ul>` and `<li>` inside a `<nav>` tag.
- [ ] **Article Lists:** Must be rendered as a list (`<ul>` -> `<li>` -> `<article>`). Never stack `<article>` tags directly inside a `<div>`.

## 4. Pagination & Crawlability (Deep Link Discovery)
- [ ] **Standard Anchor Tags:** All navigation controls (Page numbers, Next, Previous, First, Last) **MUST** be `<a>` tags with a valid `href`. Never use `<button>` with `onClick` for pagination (crawlers cannot follow them).
- [ ] **Dynamic Toggle:** When a button is disabled (e.g., "Previous" on Page 1), it can be a `<button disabled>`. However, once active, it **MUST** switch to an `<a>` tag.
- [ ] **Aria-current:** The active page link must have `aria-current="page"` for accessibility and crawler orientation.
- [ ] **Head Relations:** For better indexing, include `<link rel="prev" />` and `<link rel="next" />` in the document `<head>` to signal the sequence to Googlebot.

## 5. Metadata & E-E-A-T Signals
- [ ] **Time Definition:** Publication dates must use the `<time>` tag with a valid ISO 8601 `dateTime` attribute (e.g., `<time dateTime="2026-04-02T10:09:33.000Z">`).
- [ ] **Author Tag:** The author's name must include the `rel="author"` attribute (if it's a link) or `itemProp="author"` (if using Schema microdata).
- [ ] **Sapo/Excerpt:** List views and featured posts MUST display a short excerpt (`<p>`) to provide context and LSI keywords for search engines.

## 6. Image Optimization (Core Web Vitals)
- [ ] **Alt Text:** Every `<img />` MUST have a descriptive `alt` attribute. If decorative, use `alt=""`. Avoid using the exact same text as the post title.
- [ ] **LCP Priority:** The Largest Contentful Paint image (Hero/Featured post) must have `fetchpriority="high"` and `loading="eager"`.
- [ ] **Lazy Loading:** All images below the fold must have `loading="lazy"`.
- [ ] **Aspect Ratio:** Images must have explicit `width`/`height` or CSS `aspect-ratio` to prevent Cumulative Layout Shift (CLS).

## 7. External Links
- [ ] **Security & SEO:** Any external link (e.g., Youtube, external partners) MUST include `target="_blank" rel="noopener noreferrer"`.

## 8. URL Canonicalization & Internationalization (i18n)
- [ ] **Single Canonical Rule:** There MUST be exactly ONE `<link rel="canonical" href="..." />` tag in the `<head>`. Verify that Next.js Metadata API and custom `<Head>` components are not generating duplicates.
- [ ] **Absolute URLs:** Canonical tags must use the full, absolute URL including the correct production domain (e.g., `https://example.io/page`, not `/page`).
- [ ] **Parameter Stripping:** The canonical URL must be clean. Strip out tracking parameters (e.g., `?utm_source=...`) and session IDs. Only include parameters that fundamentally change the page content.
- [ ] **Pagination Canonical Logic:** Each paginated page MUST point to itself (e.g., `/blog/page/2` has a canonical of `/blog/page/2`). Do NOT point paginated pages back to the root `/blog`.
- [ ] **Hreflang Consistency:** For multi-language sites, ensure `<link rel="alternate" hreflang="lang_code" />` tags are present. The domain used in `hreflang` MUST match the domain used in the `canonical` tag to prevent indexing conflicts. Always include an `x-default` fallback.

## 9. Crawlability, Sitemap & Indexing Control
- [ ] **Dynamic Sitemap.xml:** Ensure the Next.js sitemap automatically updates to include new articles and pages. 
- [ ] **Sitemap Exclusions:** Do NOT include paginated URLs (e.g., `/page/2`), filter/search result URLs, or test/dummy content in the `sitemap.xml`.
- [ ] **Robots.txt Validity:** Ensure `robots.txt` exists and does not block critical rendering assets (like `/_next/static/`). It should clearly point to the absolute URL of the `sitemap.xml`.
- [ ] **Noindex for Thin Content:** Use `<meta name="robots" content="noindex, follow" />` on pages with thin or user-generated filter content (e.g., empty categories, internal search result pages) to preserve crawl budget.

---

> **Note for Reviewers:** A clean DOM tree is as important as the content. If you see more than 5 levels of nested `<div>` before reaching the actual content, question the component's architecture. Ensure no conflicting Meta tags exist between server-rendered layouts and client-rendered pages.