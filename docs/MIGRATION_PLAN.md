# NXTDES — Monorepo · Sanity · Design-System Migration Plan

> Status: **Planning** · Owner: Rob · Last updated: 2026-07-10
>
> Goal: revive NXTDES by moving to a **pnpm + Turborepo monorepo**, replacing
> **Strapi** with **Sanity**, and replacing **Nuxt UI Pro** with an **own,
> Claude-designed design system** in a local `packages/ui` package — while
> keeping the existing concept and visual identity.

The blueprint is your own [`robin-website`](https://github.com/RobArkesteijn/robin-website)
repo. It already runs this exact stack (pnpm 10 + Turbo 2.9 + Nuxt 4 + Tailwind 4
+ Sanity + a `packages/ui` design system + a Storybook app). This migration is
mostly **replicating a pattern you have already validated**, swapping the
content model to travel data and designing our own components.

---

## 1. Decisions (locked)

| # | Decision | Choice |
|---|----------|--------|
| D1 | Monorepo tooling | **pnpm workspaces + Turborepo** (+ `catalog:` version pinning), mirroring `robin-website` |
| D2 | CMS | **Sanity** (replaces Strapi) |
| D3 | Content migration | **Re-enter fresh** in Sanity Studio — no automated Strapi import; model schemas ideally, re-author content by hand |
| D4 | Design system | **Fully custom, Claude-designed** — own tokens + own Vue components, **own accessibility** (no Reka UI / headless dependency). Target: **zero `@nuxt/ui`** in `web` |
| D5 | Execution style | **Full plan doc first** (this document), then execute phases top-to-bottom |
| D6 | Localization | **English only.** Drop i18n entirely — remove `@nuxtjs/i18n`, the `/en`·`/nl` route prefixes, `defineI18nRoute`, and the `nl-NL`/`en-GB` lang files. Content is authored once, in English |
| D7 | Package manager | **pnpm** (retire `bun.lockb`), with `catalog:` version pinning |

Notes on resolved sub-decisions:
- **A11y (D4):** we implement focus management, ARIA, and keyboard interaction
  ourselves in `packages/ui` — no headless primitive library. This is the most
  work but the fullest ownership, which is the point.
- **Sanity plan:** **Free tier** is sufficient for this project's volume and is
  the whole point (Strapi Cloud cost was the trigger).

---

## 2. Target architecture

```
NXTDES/                          # repo root (this repo, restructured)
├── package.json                 # workspace root: turbo scripts only
├── pnpm-workspace.yaml          # packages/* + apps/*  + catalog: (pinned deps)
├── turbo.json                   # build/dev/lint/typecheck/test pipelines
├── vercel.json                  # points Vercel at packages/web
├── tsconfig.json                # base tsconfig, extended by each package
├── docs/
│   └── MIGRATION_PLAN.md         # this file
├── packages/
│   ├── config/                  # @nxtdes/config — shared eslint, ts, tailwind preset
│   ├── ui/                      # @nxtdes/ui — the design system (Vue + Tailwind 4 tokens)
│   ├── studio/                  # @nxtdes/studio — Sanity Studio (schemas + config)
│   └── web/                     # @nxtdes/web — the Nuxt 4 travel site
└── apps/
    └── storybook/               # design-system playground for packages/ui
```

Package responsibilities:

| Package | Replaces | Contents |
|---------|----------|----------|
| `packages/web` | current `app/` + `server/` | Nuxt 4 app: pages, layouts, feature components, server API (weather/currency proxies), i18n, SEO |
| `packages/studio` | `NXTDES_cms` (Strapi) | Sanity schema types, Studio config, GROQ queries, generated types |
| `packages/ui` | `@nuxt/ui-pro` | Design tokens (Tailwind 4 `@theme`), primitives, patterns, `web` consumes as a Nuxt layer/module |
| `packages/config` | scattered root config | eslint flat config, tsconfig base, tailwind preset, prettier |
| `apps/storybook` | — | Isolated component development + visual review |

---

## 3. Current-state inventory (what we are migrating)

### 3.1 Content model (Strapi → Sanity)

Five Strapi types today. Target Sanity schemas (`document` unless noted):

| Strapi type | Sanity schema | Key fields | Notes |
|-------------|---------------|-----------|-------|
| `home` (single) | `home` (singleton) | `title`, `intro`, `heroImage`, `highlighted{ headline, title, description, countries[] }` | Singleton via Studio structure; `countries[]` = references to `country` |
| `country` | `country` | `country`, `countryNative`, `continent`, `currency`, `description`, `title`, `flagImage`, `heroImage`, `attractions[]` | `attractions` = array of `attraction` **objects** (embedded, matches current) |
| — (component) | `attraction` (object) | `attraction`, `description`, `image` | Embedded object type, not a document |
| `blog` | `blog` | `title`, `label`, `date`, `description`, `heroImage`, `author→ref`, `body?` | `author` = reference to `author` |
| `author` | `author` | `name`, `avatar` | `blogs` derived via GROQ reverse lookup (no stored back-ref needed) |
| `faq` | `faq` | question/answer list | Confirm shape from `app/types/Faq.ts` when modeling |

Cross-cutting model concerns:
- **Localization**: none. Per **D6** the site is English-only — schemas hold a
  single English value per field, no localized objects, no
  `@sanity/document-internationalization`. The Dutch content in Strapi is not
  carried over.
- **Slugs**: current pages de-slug by matching title (`title.split('-').join(' ')`).
  In Sanity, add a proper `slug` field per document → cleaner GROQ + faster.
- **Images**: Strapi `StrapiImage` (with `formats.large/medium/small/thumbnail`)
  → Sanity image assets + `@sanity/image-url` for on-the-fly transforms. This
  replaces `@nuxt/image`'s `strapi` provider.

### 3.2 Data-fetching pattern (per-page rewrite)

Current pattern (in every content page):
```ts
const { data } = await useAsyncData(fullPath, async () => {
  const { find } = useStrapi()
  return await find<T>('countries', { populate: {...}, filters: { country: { $eqi: slug } } })
})
const content = computed(() => data.value?.data[0]?.attributes)
if (!content.value) throw createError({ statusCode: 404, ... })
```

Target pattern (Sanity + GROQ), same shape so the rest of each page barely changes:
```ts
const { data } = await useAsyncData(fullPath, () =>
  useSanityQuery<Country>(groq`*[_type == "country" && slug.current == $slug][0]{
    ..., attractions[]{..., image}, "heroImage": heroImage.asset->url
  }`, { slug }))
const content = computed(() => data.value)
if (!content.value) throw createError({ statusCode: 404, ... })
```
Files that import `useStrapi` / `Strapi4Response` (**10 files** to convert):
`pages/index`, `pages/faq`, `pages/countries/index`, `pages/countries/[slug]`,
`pages/blogs/index`, `pages/blogs/[slug]`, `pages/authors/index`,
`pages/authors/[slug]`, `components/App/AppHeader`, `components/Country/CountryGridDisplay`.

### 3.3 Design-system inventory (Nuxt UI → `packages/ui`)

Components currently consumed from Nuxt UI / Nuxt UI Pro (must be provided by `packages/ui` to reach zero-`@nuxt/ui`):

| Group | Components | Effort |
|-------|-----------|--------|
| **Primitives** | `Icon`, `Button`, `Input`, `Form` + `FormGroup`, `Breadcrumb`, `ColorModeToggle` | M — `Icon` wraps Iconify; forms need validation wiring (currently `yup`, switch to `zod` to match robin-website) |
| **App shell** | `Header` + `HeaderLinks`, `Footer` + `FooterColumns`, `Main`, `NavigationTree` (mobile menu), `PageError` | L — these carry the 145-line `app.config.ts` theming; the header popover/nav is the fiddliest |
| **Patterns (Nuxt UI *Pro* Landing)** | `LandingHero`, `LandingSection` (×6), `LandingCTA`, `LandingFAQ`, `BlogList`, `BlogPost` | L — these are opinionated marketing blocks; we rebuild as `NxtHero`, `NxtSection`, `NxtCta`, `NxtFaq`, `NxtBlogList`, `NxtBlogCard` |

Design tokens already exist and carry over verbatim — no redesign of the palette needed unless you want one:
- **Colors**: `boston-blue` (primary), `copper`, `teak`, `shark` (gray), `scarpa-flow` — full 50–950 ramps in `tailwind.config.ts`.
- **Fonts**: `Thermite` (display/headings, uppercase), `Brixton` (bold) — `.otf`/`.ttf` in `public/fonts`.
- **Theme**: light default, dark mode supported; `theme-color` `#4394b1`.

These move into `packages/ui` as a Tailwind v4 `@theme` block (CSS-first config, replacing `tailwind.config.ts`).

### 3.4 Things NOT touched by the CMS/UI swap (carry over as-is)

- **Server API proxies**: `server/api/weather.ts` (+ a currency one implied by `CurrencyCalculator`) — RapidAPI key stays server-side via `runtimeConfig`. Moves into `packages/web/server` unchanged.
- **Mapbox** interactive map (`nuxt-mapbox`), **GSAP** page transitions (e.g. the country flag overlay), **Vercel Analytics + Speed Insights**, **SEO** (`@nuxtjs/seo`, OG images, schema.org), **static legal/story pages** (the-goal, the-story, contact, terms, privacy).

> **Removed** by D6: `@nuxtjs/i18n`, the `/en`·`/nl` route prefixes,
> `defineI18nRoute` blocks, `app/lang/en-GB.ts` + `app/lang/nl-NL.ts`, and the
> `LanguageSwitcher` component. Error/UI strings that came from `t(...)` become
> plain English literals (or a tiny local `strings.ts`).

---

## 4. Phased execution

Each phase ends in a **green build** and is independently shippable. Do them in order; do not start a phase before the previous one is merged.

### Phase 0 — Foundations & spike (½–1 day)
- [ ] Create `docs/` (done) and land this plan.
- [ ] Spin up a **free Sanity project**, capture `projectId` / `dataset`.
- [ ] Create a long-lived migration branch strategy (one branch per phase, PR-reviewed).

### Phase 1 — Monorepo shell (1–2 days) · *lowest risk, unblocks everything*
Goal: current app runs **byte-for-byte the same**, just relocated. No CMS or UI change.
- [ ] Add `pnpm-workspace.yaml` (`packages/*`, `apps/*`) + `catalog:` seeded from `robin-website`'s (Nuxt 4.4, Vue 3.5, Tailwind 4, etc.). Omit `@nuxtjs/i18n` per D6.
- [ ] Add root `package.json` (turbo scripts: `dev/build/lint/typecheck/test`) + `turbo.json` + root `tsconfig.json`.
- [ ] Move current app into `packages/web`: `app/` → `packages/web/app/`, `server/` → `packages/web/server/`, `public/`, `nuxt.config.ts`, `tailwind.config.ts`, tests. Name it `@nxtdes/web`.
- [ ] Create `packages/config` (eslint flat config + base tsconfig + tailwind preset extracted from current setup).
- [ ] Retire `bun.lockb`; generate `pnpm-lock.yaml`. Update `.nvmrc` to Node 24, engines to pnpm 10.
- [ ] Update Husky pre-commit to run `turbo lint typecheck`.
- [ ] Update `vercel.json` / Vercel project root to `packages/web`.
- [ ] **Gate**: `pnpm build` green, site identical locally, deploy preview works.

⚠️ Still on Strapi + Nuxt UI at the end of Phase 1 — that is intentional.

### Phase 1b — English-only: remove i18n (½–1 day)
Goal: collapse the localized routing to a single English site (**D6**). Do this
right after the shell so every later phase works against final URLs.
- [ ] Remove `@nuxtjs/i18n` from `web` (module, config, `catalog:`).
- [ ] Flatten routes: drop the `/en`·`/nl` prefixes so pages live at `/`, `/countries/[slug]`, `/blogs/[slug]`, etc. Remove all `defineI18nRoute` blocks.
- [ ] Delete `app/lang/en-GB.ts`, `app/lang/nl-NL.ts`, and `LanguageSwitcher.vue`.
- [ ] Replace `t('...')` calls (incl. error messages) with English literals or a small `strings.ts`.
- [ ] Update `routeRules` (ISR/SWR) to the new flat paths; update sitemap/robots/canonical base.
- [ ] Add redirects from old `/en/**` URLs to the flattened paths (preserve any existing links/SEO).
- [ ] **Gate**: all pages reachable at new URLs, old `/en/**` redirect, `pnpm build` green.

### Phase 2 — Sanity Studio + data layer (3–5 days)
Goal: content comes from Sanity; Strapi is removed. UI unchanged (still Nuxt UI).
- [ ] Scaffold `packages/studio` (Sanity Studio v3, TypeScript).
- [ ] Model schemas: `home` (singleton), `country`, `attraction` (object), `blog`, `author`, `faq`. Add `slug` fields. Single-language (English) — no localized fields (D6).
- [ ] Configure Studio structure (singleton for `home`, sensible desk structure).
- [ ] Add `@sanity/client` + `@sanity/image-url` to `web`; create a `useSanity` composable / Nuxt Sanity module setup + `groq` queries per page.
- [ ] Replace `@nuxt/image` `strapi` provider with Sanity image URLs.
- [ ] Convert the **10 files** in §3.2 from `useStrapi` → GROQ. Replace `app/types/*` Strapi interfaces with Sanity-generated types (`sanity typegen`).
- [ ] Re-author content by hand in Studio (D3): countries, attractions, blogs, authors, home, faq — **English only**.
- [ ] Remove `@nuxtjs/strapi`, `STRAPI_*` env, and Strapi types.
- [ ] **Gate**: every page renders from Sanity; 404 paths still `createError`; SEO/OG intact; `pnpm build` green.

### Phase 3 — Design system `packages/ui` (5–8 days) · *largest effort*
Goal: zero `@nuxt/ui` in `web`. This is where **Claude design** does the heavy lifting.
- [ ] Scaffold `packages/ui` as a Nuxt layer (or module) `web` extends. Set up as installable design system with auto-imported `Nxt*` components.
- [ ] **Tokens**: port palette + fonts into a Tailwind v4 `@theme` CSS file in `ui`; expose as the shared preset. Retire `tailwind.config.ts`.
- [ ] Stand up `apps/storybook` pointing at `ui` for isolated development.
- [ ] Build primitives with **our own accessibility** (focus/ARIA/keyboard hand-rolled, per D4 — no headless lib): `NxtIcon`, `NxtButton`, `NxtInput`, `NxtForm`/`NxtFormGroup` (zod), `NxtBreadcrumb`, `NxtColorModeToggle`.
- [ ] Build app shell: `NxtHeader`(+links/mobile `NxtNavTree`), `NxtFooter`(+columns), `NxtMain`, `NxtPageError`. Fold in the behavior currently encoded in the 145-line `app.config.ts`.
- [ ] Build patterns: `NxtHero`, `NxtSection`, `NxtCta`, `NxtFaq`, `NxtBlogList`, `NxtBlogCard`.
- [ ] Migrate `web` page-by-page from `U*` → `Nxt*`. Delete `app/app.config.ts` `ui` block as each area is covered.
- [ ] Remove `@nuxt/ui`, `@nuxt/ui-pro`, `NUXT_UI_PRO_LICENSE`.
- [ ] Port `yup` → `zod`; keep GSAP transitions, Mapbox, SVGO icons.
- [ ] **Gate**: no `@nuxt/ui` import remains; Storybook covers each component; visual parity (or intended improvement) reviewed; `pnpm build` green.

### Phase 4 — Polish, harden, retire (2–3 days)
- [ ] Re-verify SEO: `useSeoMeta`, `useSchemaOrg`, OG image fonts (`thermite`, `brixton`), sitemap, robots, canonical.
- [ ] Re-verify ISR/SWR `routeRules` on the flattened English routes and that `/en/**` redirects still resolve.
- [ ] Accessibility audit of `packages/ui` (since we own a11y per D4): keyboard nav, focus-visible, ARIA roles on menu/accordion/dialog, color contrast.
- [ ] Re-wire Vercel Analytics + Speed Insights; run `unlighthouse` and fix regressions.
- [ ] Tests: migrate Vitest to the monorepo; add Storybook interaction/visual tests for `ui`.
- [ ] Update `CLAUDE.md` (this repo's) + `README` to describe the new monorepo + Sanity + design-system architecture.
- [ ] Archive/retire the `NXTDES_cms` Strapi repo and its hosting.
- [ ] **Gate**: full green CI, Lighthouse ≥ prior scores, both locales correct, Strapi fully decommissioned.

---

## 5. Effort & sequencing summary

| Phase | Rough effort | Risk | Ships |
|-------|-------------|------|-------|
| 0 Foundations | ½–1 d | low | plan + Sanity project |
| 1 Monorepo shell | 1–2 d | low | identical site, relocated |
| 1b English-only | ½–1 d | low | i18n removed, flat routes |
| 2 Sanity | 3–5 d | med | content from Sanity, Strapi gone |
| 3 Design system | 5–8 d | high | own UI (own a11y), Nuxt UI gone |
| 4 Polish | 2–3 d | low | production-hardened |

Total: ~**12.5–20 focused days**. Phases 1→1b→2→4 are mechanical; Phase 3 is the creative/ownership-heavy one and where scope can grow — keep it bounded to the ~20 components in §3.3. Owning a11y ourselves (D4) is the main thing that can push Phase 3 toward the high end.

---

## 6. Key risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Nuxt UI is more deeply woven in than the component list suggests (the 145-line `app.config.ts`, header popover, mobile nav) | Rebuild app-shell first in Storybook before touching pages; keep Nuxt UI installed until the last page is migrated (Phases can overlap component-by-component) |
| Hand-rolling accessibility (D4) — focus traps, ARIA, keyboard nav for menu/accordion/dialog is easy to get subtly wrong | Build interactive primitives against WAI-ARIA Authoring Practices patterns; add a Phase 4 a11y audit; if a component proves too costly, revisit the headless-lib decision for that one component only |
| Re-authoring content by hand is tedious/error-prone (D3) | Model schemas with validation + previews first; if volume turns out large, a throwaway import script is a fallback (revisit) |
| Flattening `/en`·`/nl` routes breaks existing inbound links / SEO | Add explicit `/en/**` → flat-path redirects in Phase 1b; verify in Phase 4 |
| Monorepo/Vercel deploy config drift | Copy `robin-website`'s `vercel.json` + `turbo.json` verbatim, adjust paths only |
| Version drift between packages | Use `catalog:` for every shared dep (no per-package version literals) |
| `@nuxt/image` strapi provider removal breaks images | Swap to `@sanity/image-url` in the same PR that converts each page's data source |

---

## 7. Immediate next steps

All sub-decisions are now resolved (see §1: own a11y, English-only, pnpm).

1. Create the free Sanity project (Phase 0) so Phase 2 modeling can proceed.
2. Start **Phase 1** on a `phase-1-monorepo` branch — pure relocation, no behavior change.
3. Follow immediately with **Phase 1b** (remove i18n, flatten to English-only routes).

> When ready, say the word and I'll begin Phase 1 (scaffold the pnpm/turbo
> monorepo and relocate the app into `packages/web`) on a fresh branch.
