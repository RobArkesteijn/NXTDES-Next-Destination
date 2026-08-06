# NXTDES — Monorepo · Design-System · Sanity Migration Plan

> Status: **In progress** — Phase 1 (monorepo) complete · Owner: Rob · Last updated: 2026-07-11
>
> Goal: revive NXTDES by moving to a **pnpm + Turborepo monorepo**, replacing
> **Nuxt UI Pro + Tailwind** with an **own, Claude-designed design system in plain
> CSS**, replacing **Strapi** with **Sanity**, and bringing **every dependency to
> its latest version** (Nuxt 4) — while keeping the existing concept and identity.

The structural blueprint is your own
[`robin-website`](https://github.com/RobArkesteijn/robin-website) repo (pnpm 10 +
Turbo 2.9 + Nuxt 4 + Sanity + a `packages/ui` design system + a Storybook app). We
adopt its **monorepo / Sanity / Storybook** pattern, but deliberately **diverge on
styling**: robin-website uses Tailwind 4; NXTDES uses **plain CSS** (D8).

---

## 1. Decisions (locked)

| # | Decision | Choice |
|---|----------|--------|
| D1 | Monorepo tooling | **pnpm workspaces + Turborepo** (+ `catalog:` version pinning), mirroring `robin-website` |
| D2 | CMS | **Sanity** (replaces Strapi) |
| D3 | Content migration | **Re-enter fresh** in Sanity Studio — no automated Strapi import; model schemas ideally, re-author content by hand |
| D4 | Design system | **Fully custom, Claude-designed** — own components, **own accessibility** (no Reka UI / headless dependency). Target: **zero `@nuxt/ui`** in `web` |
| D5 | Execution style | **Full plan doc first** (this document), then execute phases top-to-bottom |
| D6 | Localization | **English only.** Drop i18n entirely — remove `@nuxtjs/i18n`, the `/en`·`/nl` route prefixes, `defineI18nRoute`, and the `nl-NL`/`en-GB` lang files |
| D7 | Package manager | **pnpm** (retire `bun.lockb`), with `catalog:` version pinning |
| D8 | Styling | **Plain CSS** — no Tailwind. Scoped component CSS + CSS custom properties for tokens. Remove `tailwind.config.ts`, `@apply`, `screen()`, and all utility classes in templates |
| D9 | Dependency versions | **Everything on latest.** Nuxt 4 and current-major of every dep. The bridge pins added in Phase 1 are temporary and get removed once their blocker is gone |

Notes on resolved sub-decisions:
- **A11y (D4):** we implement focus management, ARIA, and keyboard interaction
  ourselves in `packages/ui` — no headless primitive library.
- **Sanity plan:** **Free tier** is sufficient and is the whole point (Strapi
  Cloud cost was the trigger).
- **Sequencing (D9):** the design system is built **before** the Sanity
  migration, because removing Nuxt UI Pro is what unblocks the full
  Nuxt-4/latest jump — so we get to a modern stack as early as possible.

---

## 2. The path to "everything latest" (why the order is what it is)

Three current deps each cap the stack, and each is being **removed**, not upgraded:

| Blocker | What it caps | Removed in |
|---------|--------------|------------|
| `@nuxtjs/i18n@9.0.0-alpha.1` | Pins `unhead` v1 / `h3` v1 (uses `getActiveHead`) | **Phase 1b** |
| `@nuxt/ui-pro@1.x` | Sits on the `unhead` **v1** side → caps Nuxt < 3.17 / < 4, forces Tailwind v3 | **Phase 2** (design system) |
| `@nuxtjs/strapi` | Nuxt-3-era data module | **Phase 3** (Sanity) |

Because Nuxt UI Pro v1 lives on the **`unhead` v1** side of the major boundary,
the framework core (`nuxt` 4, `unhead` 2, `h3` 2, `nitropack` latest,
`@nuxtjs/seo` 5, …) **can only jump to latest once Nuxt UI Pro is gone**. That jump
is therefore bundled into the design-system phase, where the **bridge pins from
Phase 1 are deleted**:

```
pnpm.overrides (Phase 1, TEMPORARY):  unhead 1.11.20 · h3 ^1.13 · nitropack 2.9.7
web deps pinned (Phase 1, TEMPORARY): nuxt ~3.13.2 · @nuxt/test-utils ~3.14.2
                                      tailwindcss ^3.4.19 (removed entirely, D8)
```

---

## 3. Target architecture

```
NXTDES/                          # repo root
├── package.json                 # workspace root: turbo scripts + pnpm overrides
├── pnpm-workspace.yaml          # packages/* + apps/*  + catalog:
├── turbo.json                   # build/dev/lint/type-check/test pipelines
├── tsconfig.json                # base, extends packages/config
├── docs/MIGRATION_PLAN.md        # this file
├── packages/
│   ├── config/                  # @nxtdes/config — shared eslint + base tsconfig
│   ├── ui/                      # @nxtdes/ui — design system (Vue + plain CSS, no Tailwind)
│   ├── studio/                  # @nxtdes/studio — Sanity Studio (schemas + config)
│   └── web/                     # @nxtdes/web — the Nuxt 4 travel site
└── apps/
    └── storybook/               # design-system playground for packages/ui
```

| Package | Replaces | Contents |
|---------|----------|----------|
| `packages/web` | current `app/` + `server/` | Nuxt 4 app: pages, layouts, feature components, server API proxies, SEO |
| `packages/ui` | `@nuxt/ui-pro` + Tailwind | Plain-CSS design system: tokens as CSS custom properties, primitives, patterns; `web` consumes it as a Nuxt layer |
| `packages/studio` | `NXTDES_cms` (Strapi) | Sanity schema types, Studio config, GROQ queries, generated types |
| `packages/config` | scattered root config | eslint flat config, base tsconfig |
| `apps/storybook` | — | Isolated component development + visual review |

---

## 4. Current-state inventory

### 4.1 Content model (Strapi → Sanity)

| Strapi type | Sanity schema | Key fields | Notes |
|-------------|---------------|-----------|-------|
| `home` (single) | `home` (singleton) | `title`, `intro`, `heroImage`, `highlighted{ headline, title, description, countries[] }` | `countries[]` = references to `country` |
| `country` | `country` | `country`, `countryNative`, `continent`, `currency`, `description`, `title`, `flagImage`, `heroImage`, `attractions[]` | `attractions` = array of `attraction` **objects** |
| — (component) | `attraction` (object) | `attraction`, `description`, `image` | Embedded object type |
| `blog` | `blog` | `title`, `label`, `date`, `description`, `heroImage`, `author→ref`, `body?` | `author` = reference |
| `author` | `author` | `name`, `avatar` | `blogs` via GROQ reverse lookup |
| `faq` | `faq` | question/answer list | Confirm shape from `app/types/Faq.ts` |

- **Localization**: none (D6) — single English value per field.
- **Slugs**: add a proper `slug` field per document (current code de-slugs by title).
- **Images**: Sanity assets + `@sanity/image-url`, replacing `@nuxt/image`'s `strapi` provider.

### 4.2 Data-fetching pattern (per-page rewrite, Phase 3)

Current `useStrapi()` + `find()`/`findOne()` inside `useAsyncData` → Sanity GROQ,
keeping the same `useAsyncData` + `computed` + `createError(404)` shape. **10 files**
import `useStrapi` / `Strapi4Response`: `pages/index`, `pages/faq`,
`pages/countries/index`, `pages/countries/[slug]`, `pages/blogs/index`,
`pages/blogs/[slug]`, `pages/authors/index`, `pages/authors/[slug]`,
`components/App/AppHeader`, `components/Country/CountryGridDisplay`.

### 4.3 Design-system inventory (Nuxt UI + Tailwind → `packages/ui`, plain CSS)

Components consumed from Nuxt UI / Nuxt UI Pro (must be re-provided as `Nxt*` to reach zero-`@nuxt/ui`):

| Group | Components | Effort |
|-------|-----------|--------|
| **Primitives** | `Icon`, `Button`, `Input`, `Form` + `FormGroup`, `Breadcrumb`, `ColorModeToggle` | M — `Icon` wraps Iconify; forms switch `yup` → `zod` |
| **App shell** | `Header` + `HeaderLinks`, `Footer` + `FooterColumns`, `Main`, `NavigationTree` (mobile menu), `PageError` | L — these carry the 145-line `app.config.ts` theming; header popover/nav is fiddliest |
| **Patterns (Nuxt UI *Pro* Landing)** | `LandingHero`, `LandingSection` (×6), `LandingCTA`, `LandingFAQ`, `BlogList`, `BlogPost` | L — rebuild as `NxtHero`, `NxtSection`, `NxtCta`, `NxtFaq`, `NxtBlogList`, `NxtBlogCard` |

**Tailwind removal (D8) is a second axis of work** on top of replacing components:
every `<style>` block using `@apply` / `screen()` and every utility class in
templates (e.g. `class="z-20 bg-boston-blue-500/[.5]"`) converts to plain CSS.

Design tokens carry over as **CSS custom properties** (were Tailwind theme values):
- **Colors**: `boston-blue` (primary), `copper`, `teak`, `shark` (gray), `scarpa-flow` — 50–950 ramps → `--color-*` variables.
- **Fonts**: `Thermite` (display, uppercase), `Brixton` (bold) — `@font-face` from `public/fonts`.
- **Theme**: light default + dark mode via a `:root` / `.dark` variable set; `theme-color` `#4394b1`.

### 4.4 Carried over as-is

Server API proxies (`server/api/weather.ts` + currency), Mapbox interactive map,
GSAP page transitions, Vercel Analytics + Speed Insights, SEO (`@nuxtjs/seo`, OG
images, schema.org), static legal/story pages, `nuxt-svgo`, `@nuxtjs/fontaine`.

> **Removed** by D6: `@nuxtjs/i18n`, `/en`·`/nl` prefixes, `defineI18nRoute`,
> `app/lang/*.ts`, `LanguageSwitcher.vue`; `t(...)` → English literals.
> **Removed** by D8: `tailwindcss`, `tailwind.config.ts`, `@nuxtjs/tailwindcss`,
> `@apply`/`screen()` usage.

---

## 5. Phased execution

Each phase ends **green** (`turbo lint type-check build`) and is independently shippable.

### Phase 0 — Foundations
- [x] Land this plan (`docs/MIGRATION_PLAN.md`).
- [ ] Spin up a **free Sanity project**, capture `projectId` / `dataset` (needed for Phase 3).

### Phase 1 — Monorepo shell ✅ **DONE** (PR #47)
- [x] pnpm workspace (`packages/*`, `apps/*`) + `catalog:`; root `package.json` (turbo scripts); `turbo.json`; base `tsconfig.json`.
- [x] Relocate app → `packages/web` (via `git mv`, history preserved); `packages/config` with base tsconfig; `apps/` placeholder.
- [x] Retire `bun.lockb` → pnpm; Husky pre-commit runs `turbo lint type-check`.
- [x] Reconcile deps that bun had hoisted/frozen (explicit `typescript` + `tailwindcss`; **temporary** bridge pins for the h3/unhead/nitro drift — see §2).
- [x] **Gate met**: lint + type-check + production build green; server boots; `/`→`/en` works. (Content pages 500 only because Strapi is unreachable — expected.)

### Phase 1b — English-only + safe latest bumps (½–1 day) · **NEXT**
Goal: single English site; upgrade everything not blocked by Nuxt UI Pro.
- [ ] Remove `@nuxtjs/i18n` (module, config, catalog). Flatten routes to `/`, `/countries/[slug]`, etc.; remove `defineI18nRoute` blocks.
- [ ] Delete `app/lang/*.ts` + `LanguageSwitcher.vue`; replace `t('...')` with English literals / small `strings.ts`.
- [ ] Update `routeRules` (ISR/SWR) to flat paths; add `/en/**` → flat redirects; update sitemap/robots/canonical base.
- [ ] Bump every dep **not** tied to Nuxt UI Pro's `unhead`-v1 graph to latest (mapbox-gl, nuxt-mapbox, gsap, iconify collections, nuxt-svgo, @vue/test-utils, @nuxtjs/fontaine, husky, turbo, eslint, vitest, typescript, …).
- [ ] **Gate**: pages reachable at new URLs, `/en/**` redirects, build green.

⚠️ The core framework (`nuxt`, `unhead`, `h3`, `nitropack`, `@nuxtjs/seo`) stays on the Phase-1 bridge versions until Phase 2 removes Nuxt UI Pro.

### Phase 2 — Design system (plain CSS) + framework to latest (6–9 days) · *largest effort*
Goal: zero `@nuxt/ui`, zero Tailwind, and **the full jump to Nuxt 4 / everything latest**.
- [ ] Scaffold `packages/ui` as a Nuxt layer `web` extends; auto-imported `Nxt*` components. Stand up `apps/storybook`.
- [ ] **Tokens in plain CSS**: palette + fonts + theme as CSS custom properties (`--color-*`, `@font-face`, `:root`/`.dark`). No Tailwind.
- [ ] Build primitives with **own a11y** (per D4): `NxtIcon`, `NxtButton`, `NxtInput`, `NxtForm`/`NxtFormGroup` (zod), `NxtBreadcrumb`, `NxtColorModeToggle`.
- [ ] Build app shell: `NxtHeader`(+links/mobile `NxtNavTree`), `NxtFooter`(+columns), `NxtMain`, `NxtPageError` — folding in the 145-line `app.config.ts` behavior.
- [ ] Build patterns: `NxtHero`, `NxtSection`, `NxtCta`, `NxtFaq`, `NxtBlogList`, `NxtBlogCard`.
- [ ] Migrate `web` page-by-page `U*` → `Nxt*`; convert all `@apply`/utility-class styling to plain CSS; delete `app.config.ts` `ui` block.
- [ ] Remove `@nuxt/ui`, `@nuxt/ui-pro`, `NUXT_UI_PRO_LICENSE`, `tailwindcss`, `tailwind.config.ts`, `@nuxtjs/tailwindcss`.
- [ ] **Jump to latest**: `nuxt` 4, `unhead` 2, `h3` 2, `nitropack` latest, `@nuxtjs/seo` 5, `@nuxt/image`/`@nuxt/eslint` latest; **delete all Phase-1 `pnpm.overrides` and version pins** (§2).
- [ ] **Gate**: no `@nuxt/ui`/Tailwind remains; no bridge pins remain; Storybook covers each component; build green on Nuxt 4.

### Phase 3 — Sanity Studio + data layer (3–5 days)
Goal: content from Sanity; Strapi removed. Pages already use `Nxt*` components.
- [ ] Scaffold `packages/studio` (Sanity Studio v3). Model schemas (§4.1) with `slug` fields, English-only, singleton `home`.
- [ ] Add `@sanity/client` + `@sanity/image-url` to `web`; `useSanity` + GROQ per page; swap image provider to Sanity.
- [ ] Convert the **10 files** (§4.2) `useStrapi` → GROQ; replace `app/types/*` with `sanity typegen` types.
- [ ] Re-author content by hand in Studio (D3), English only. Remove `@nuxtjs/strapi`, `STRAPI_*` env, Strapi types.
- [ ] **Gate**: every page renders from Sanity; 404s still `createError`; SEO/OG intact; build green.

### Phase 4 — Polish, harden, retire (2–3 days)
- [ ] Re-verify SEO (`useSeoMeta`, `useSchemaOrg`, OG fonts, sitemap, robots, canonical) and ISR/SWR on flat routes + `/en/**` redirects.
- [ ] Accessibility audit of `packages/ui` (D4): keyboard nav, focus-visible, ARIA, contrast.
- [ ] Confirm **nothing is pinned** — every dep on latest; re-wire Analytics/Speed Insights; run `unlighthouse`.
- [ ] Tests to the monorepo; Storybook interaction/visual tests.
- [ ] Update `CLAUDE.md` + `README` for the new architecture; set Vercel Root Directory to `packages/web`; archive the Strapi CMS repo.
- [ ] **Gate**: full green CI, Lighthouse ≥ prior, English site correct, Strapi decommissioned, zero bridge pins.

---

## 6. Effort & sequencing summary

| Phase | Effort | Risk | Ships |
|-------|--------|------|-------|
| 0 Foundations | ½ d | low | plan ✅ + Sanity project |
| 1 Monorepo shell | ✅ done | low | relocated app, green build |
| 1b English-only + safe bumps | ½–1 d | low | flat routes, most deps latest |
| 2 Design system + Nuxt 4 | 6–9 d | high | own plain-CSS UI, **100% latest** |
| 3 Sanity | 3–5 d | med | content from Sanity, Strapi gone |
| 4 Polish | 2–3 d | low | production-hardened |

Total remaining: ~**12–18 focused days**. Phase 2 is the big one — it now carries
three things at once (own components + Tailwind→plain-CSS + Nuxt-4/latest jump).

---

## 7. Key risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Phase 2 does three things at once (components, plain-CSS rewrite, Nuxt-4 jump) — hard to bisect failures | Land the Nuxt-4/latest jump as its **own commit** right after Nuxt UI Pro is removed, separate from component commits, so a regression is easy to isolate |
| Tailwind → plain CSS touches nearly every template & `<style>` block | Do it page-by-page alongside the `U*`→`Nxt*` migration, not as a separate sweep; lean on the CSS-variable token set so values stay centralized |
| Hand-rolled a11y (D4) — focus traps, ARIA, keyboard nav easy to get subtly wrong | Build to WAI-ARIA Authoring Practices; Phase 4 audit; revisit headless-lib for a single component only if one proves too costly |
| Design system built before Sanity → components built against Strapi's data shape | Keep components **data-shape-agnostic** (props, not `useStrapi` inside); the Phase-3 re-wire then only touches the 10 data files, not the `Nxt*` components |
| Removing bridge pins reveals new drift on Nuxt 4 | Nuxt 4 + latest is the *consistent* modern set (what robin-website runs); the pins existed only to straddle the old boundary — removing them on Nuxt 4 is the fix, not a risk |
| Re-authoring content by hand (D3) | Model schemas with validation + previews first; throwaway import script as fallback if volume is high |
| Vercel deploy config | Set project **Root Directory** to `packages/web`; mirror `robin-website`'s `turbo.json`/`vercel.json` |

---

## 8. Immediate next steps

1. Create the free Sanity project (Phase 0) — unblocks Phase 3 later.
2. Start **Phase 1b** (remove i18n → English-only + safe latest bumps) on a `phase-1b-english-only` branch.
3. Then **Phase 2** (design system + Nuxt-4/latest jump) — the milestone where everything reaches latest.

> Phase 1 is merged-ready (PR #47). Say the word and I'll start Phase 1b.
