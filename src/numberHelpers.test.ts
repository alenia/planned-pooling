import { describe, expect, it } from 'vitest'
import { mod } from './numberHelpers'

describe('mod', () => {
  it('returns the correct positive number for a big negative number', () => {
    expect(mod(-33, 10)).toEqual(7)
  })
  it('returns the correct positive number for a negative number', () => {
    expect(mod(-3, 10)).toEqual(7)
  })
  it('returns the correct number for a small positive number', () => {
    expect(mod(7, 10)).toEqual(7)
  })
  it('returns the correct number for a big positive number', () => {
    expect(mod(53, 10)).toEqual(3)
  })
  it('works when the second number is not ten', () => {
    expect(mod(7, 5)).toEqual(2)
  })
})
