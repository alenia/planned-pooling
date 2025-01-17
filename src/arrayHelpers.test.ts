import { describe, expect, it } from 'vitest'
import { circularSlice } from './arrayHelpers'

describe('circularSlice', () => {
  it('returns an array of the given length starting at the starting index', () => {
    expect(circularSlice(['a','b','c','d','e','f','g','h'], 0, 3)).toEqual(['a','b','c'])
    expect(circularSlice(['a','b','c','d','e','f','g','h'], 2, 3)).toEqual(['c','d','e'])
    expect(circularSlice(['a','b','c','d','e','f','g','h'], 2, 5)).toEqual(['c','d','e','f','g'])
  })
  it('goes back to the beginning if the index is greater than the length of the list', () => {
    expect(circularSlice(['a','b','c','d','e','f','g','h'], 8, 3)).toEqual(['a','b','c'])
  })
  it('allows for negative numbers of the index', () => {
    expect(circularSlice(['a','b','c','d','e','f','g','h'], -5, 3)).toEqual(['d','e','f'])
    expect(circularSlice(['a','b','c','d','e','f','g','h'], -13, 3)).toEqual(['d','e','f'])
  })
  it('loops back to the beginning', () => {
    expect(circularSlice(['a','b','c','d','e','f','g','h'], 6, 3)).toEqual(['g','h','a'])
  })
  it('works for lengths much bigger than the initial array', () => {
    expect(circularSlice(['a','b','c'], 1, 9)).toEqual(['b','c','a','b','c','a','b','c','a'])
  })
  it('works for negative index numbers even when lengths are bigger than the initial array', () => {
    expect(circularSlice(['a','b','c'], -2, 9)).toEqual(['b','c','a','b','c','a','b','c','a'])
  })
})
