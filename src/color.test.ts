import { describe, expect, it, vi } from 'vitest'
import { nextStitchColorByIndex, isStringAColor, getRandomNotWhiteColor, totalColorSequenceLength } from './color'
import { ColorSequenceArray } from './types'

describe('nextStitchByColorIndex', () => {
  it('gives the next stitch color in the sequence', () => {
    const config = [
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
      {color: "#00f", length: 4}
    ] as ColorSequenceArray

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

  it('gives the next stitch color in the sequence with a color shift when color shift is provided', () => {
    const config = [
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
      {color: "#00f", length: 4}
    ] as ColorSequenceArray

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
})

describe('isStringAColor', () => {
  it('tells you whether or not a string is a hex color', () => {
    expect(isStringAColor('#fff')).toBe(true)
    expect(isStringAColor('#FFF')).toBe(true)
    expect(isStringAColor('#000')).toBe(true)
    expect(isStringAColor('#012345')).toBe(true)
    expect(isStringAColor('#ffffff')).toBe(true)
    expect(isStringAColor('#FFFFFF')).toBe(true)
    expect(isStringAColor('#gggggg')).toBe(false)
    expect(isStringAColor('ffffff')).toBe(false)
    expect(isStringAColor('#ffff')).toBe(false)
  })
})

describe('getRandomNotWhiteColor', () => {
  it('gets a random color', () => {
    const randomColor = getRandomNotWhiteColor()
    expect(isStringAColor(randomColor), `${randomColor} should match color string expectations`).toBe(true)
  })
  it('can be black', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const black = getRandomNotWhiteColor()
    expect(black).toEqual('#000000')
    expect(isStringAColor(black), `${black} should match color string expectations`).toBe(true)
    vi.spyOn(Math, 'random').mockRestore();
  })

  it('cannot be white, but can be very light', () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)
    const almostWhite = getRandomNotWhiteColor()
    expect(isStringAColor(almostWhite), `${almostWhite} should match color string expectations`).toBe(true)
    expect(almostWhite).toEqual('#fffffe')
    vi.spyOn(Math, 'random').mockRestore();
  })
})

describe('totalColorSequenceLength', () => {
  it('sums the lenght of the colors in the sequence', () => {
    const config = [
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
      {color: "#00f", length: 4}
    ] as ColorSequenceArray
    expect(totalColorSequenceLength(config)).toEqual(9)
  })
})
