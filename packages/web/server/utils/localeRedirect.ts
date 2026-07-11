// Pure path-transform behind the `/en`·`/nl` -> flat redirect middleware
// (see server/middleware/redirect-locale.ts). Kept separate from the H3
// handler so the regex edge cases can be unit-tested without a Nitro event.
// Returns the flat target path, or null when `path` carries no locale prefix
// and should be left untouched.
const localePrefix = /^\/(?:en|nl)(?=[/?]|$)/

export const localeRedirectTarget = (path: string): string | null => {
  if (!localePrefix.test(path)) {
    return null
  }

  const stripped = path.replace(localePrefix, '')
  return stripped.startsWith('/') ? stripped : `/${stripped}`
}
