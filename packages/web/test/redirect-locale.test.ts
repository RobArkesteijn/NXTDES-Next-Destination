import { describe, expect, it } from 'vitest'
import { localeRedirectTarget } from '../server/utils/localeRedirect'

describe('localeRedirectTarget', () => {
  it('strips a leading /en prefix', () => {
    expect(localeRedirectTarget('/en/the-story')).toBe('/the-story')
  })

  it('strips a leading /nl prefix', () => {
    expect(localeRedirectTarget('/nl/landen')).toBe('/landen')
  })

  it('maps a bare /en to the site root', () => {
    expect(localeRedirectTarget('/en')).toBe('/')
  })

  it('preserves the query string on a bare locale root', () => {
    expect(localeRedirectTarget('/en?ref=news')).toBe('/?ref=news')
  })

  it('preserves the query string on a nested path', () => {
    expect(localeRedirectTarget('/en/blogs?page=2')).toBe('/blogs?page=2')
  })

  it('does not over-match a path that merely starts with the same letters', () => {
    expect(localeRedirectTarget('/energy')).toBeNull()
  })

  it('only matches the first path segment', () => {
    expect(localeRedirectTarget('/blogs/en-route')).toBeNull()
  })

  it('leaves an already-flat path untouched', () => {
    expect(localeRedirectTarget('/countries/spain')).toBeNull()
  })
})
