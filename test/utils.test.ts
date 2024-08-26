// sum.test.js
import { expect, test } from 'vitest'
import formatNumber from '@/utils'

test('formatNumber', () => {
  expect(formatNumber(1234.567, 2, 'EUR')).toBe('€1,234.57')
})
