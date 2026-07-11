// The site was previously bilingual with `/en/**` and `/nl/**` route prefixes
// (see docs/MIGRATION_PLAN.md, Phase 1b). It is now English-only with flat
// routes, so permanently redirect any lingering prefixed URL to its flat
// equivalent, e.g. `/en/blogs` -> `/blogs`. Dutch pages are gone; a `/nl/*`
// slug that has no flat English page will land on the normal 404.
const localePrefix = /^\/(?:en|nl)(?=[/?]|$)/

export default defineEventHandler((event) => {
  if (!localePrefix.test(event.path)) {
    return
  }

  const stripped = event.path.replace(localePrefix, '')
  const target = stripped.startsWith('/') ? stripped : `/${stripped}`

  return sendRedirect(event, target, 301)
})
