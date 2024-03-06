import { expect, test } from 'vitest'
import { nextStitchColorByIndex } from './color'
import { Color, ColorConfig, ColorConfigArray } from './types'

test('it gives the next stitch color in the sequence', () => {
  const config = [
    {color: "#f00", length: 2},
    {color: "#0f0", length: 3},
    {color: "#00f", length: 4}
  ] as ColorConfigArray

  expect(nextStitchColorByIndex(0, config, {colorShift: 0})).toBe("#f00")
  expect(nextStitchColorByIndex(1, config, {colorShift: 0})).toBe("#f00")
  expect(nextStitchColorByIndex(2, config, {colorShift: 0})).toBe("#0f0")
  expect(nextStitchColorByIndex(3, config, {colorShift: 0})).toBe("#0f0")
  expect(nextStitchColorByIndex(4, config, {colorShift: 0})).toBe("#0f0")
  expect(nextStitchColorByIndex(5, config, {colorShift: 0})).toBe("#00f")
  expect(nextStitchColorByIndex(6, config, {colorShift: 0})).toBe("#00f")
  expect(nextStitchColorByIndex(7, config, {colorShift: 0})).toBe("#00f")
  expect(nextStitchColorByIndex(8, config, {colorShift: 0})).toBe("#00f")
  expect(nextStitchColorByIndex(9, config, {colorShift: 0})).toBe("#f00")
  expect(nextStitchColorByIndex(10, config, {colorShift: 0})).toBe("#f00")
  expect(nextStitchColorByIndex(11, config, {colorShift: 0})).toBe("#0f0")
})

test('it gives the next stitch color in the sequence with a color shift when color shift is provided', () => {
  const config = [
    {color: "#f00", length: 2},
    {color: "#0f0", length: 3},
    {color: "#00f", length: 4}
  ] as ColorConfigArray

  expect(nextStitchColorByIndex(0, config, {colorShift: 3})).toBe("#0f0")
  expect(nextStitchColorByIndex(1, config, {colorShift: 3})).toBe("#0f0")
  expect(nextStitchColorByIndex(2, config, {colorShift: 3})).toBe("#00f")
  expect(nextStitchColorByIndex(3, config, {colorShift: 3})).toBe("#00f")
  expect(nextStitchColorByIndex(4, config, {colorShift: 3})).toBe("#00f")
  expect(nextStitchColorByIndex(5, config, {colorShift: 3})).toBe("#00f")
  expect(nextStitchColorByIndex(6, config, {colorShift: 3})).toBe("#f00")
  expect(nextStitchColorByIndex(7, config, {colorShift: 3})).toBe("#f00")
  expect(nextStitchColorByIndex(8, config, {colorShift: 3})).toBe("#0f0")
  expect(nextStitchColorByIndex(9, config, {colorShift: 3})).toBe("#0f0")
  expect(nextStitchColorByIndex(10, config, {colorShift: 3})).toBe("#0f0")
  expect(nextStitchColorByIndex(11, config, {colorShift: 3})).toBe("#00f")
})
