import { localeRedirectTarget } from '../utils/localeRedirect'

// The site was previously bilingual with `/en/**` and `/nl/**` route prefixes
// (see docs/MIGRATION_PLAN.md, Phase 1b). It is now English-only with flat
// routes, so permanently redirect any lingering prefixed URL to its flat
// equivalent, e.g. `/en/blogs` -> `/blogs`. Dutch pages are gone; a `/nl/*`
// slug that has no flat English page will land on the normal 404.
export default defineEventHandler((event) => {
  const target = localeRedirectTarget(event.path)

  if (target === null) {
    return
  }

  return sendRedirect(event, target, 301)
})
