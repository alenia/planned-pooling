import { describe, expect, it, vi } from 'vitest'
import {
  flatColorSequenceArray,
  shiftedColorSequenceArray,
  nextStitchColorByIndex,
  isStringAColor,
  getRandomNotWhiteColor,
  totalColorSequenceLength,
  matchColorwayToColorSequence,
} from './colorHelpers'
import { ColorSequenceArray, ColorwayRecord } from './types'

describe('flatColorSequenceArray', () => {
  it('returns the flattened color sequence array without zero length colors', () => {
    const colorSequence = [
      {color: "#aaa", length: 2},
      {color: "#bbb", length: 0},
      {color: "#ccc", length: 4},
      {color: "#aaa", length: 3},
      {color: "#ddd", length: 1}
    ] as ColorSequenceArray

    expect(flatColorSequenceArray(colorSequence)).toEqual([
      '#aaa', '#aaa',
      '#ccc', '#ccc', '#ccc', '#ccc',
      '#aaa', '#aaa', '#aaa',
      '#ddd',
    ])
  })
})

describe('shiftedColorSequenceArray', () => {
  it('returns a shifted color sequence array with no zero lenght colors, depending on the shift', () => {
    const colorSequence = [
      {color: "#aaa", length: 2},
      {color: "#bbb", length: 0},
      {color: "#ccc", length: 4},
      {color: "#aaa", length: 3},
      {color: "#ddd", length: 1}
    ] as ColorSequenceArray

    expect(shiftedColorSequenceArray(colorSequence, 0)).toEqual([
      {color: "#aaa", length: 2},
      {color: "#ccc", length: 4},
      {color: "#aaa", length: 3},
      {color: "#ddd", length: 1},
    ])

    expect(shiftedColorSequenceArray(colorSequence, 3)).toEqual([
      {color: "#ccc", length: 3},
      {color: "#aaa", length: 3},
      {color: "#ddd", length: 1},
      {color: "#aaa", length: 2},
      {color: "#ccc", length: 1},
    ])
  })

  it('does not change color sequence', () => {
    const colorSequence = [
      {color: "#aaa", length: 2},
      {color: "#bbb", length: 0},
      {color: "#ccc", length: 4},
    ] as ColorSequenceArray

    expect(shiftedColorSequenceArray(colorSequence, 2)).toEqual([
      {color: "#ccc", length: 4},
      {color: "#aaa", length: 2},
    ])

    expect(colorSequence).toEqual([
      {color: "#aaa", length: 2},
      {color: "#bbb", length: 0},
      {color: "#ccc", length: 4},
    ])
  })

  it('works for negative or large numbers', () => {
    const colorSequence = [
      {color: "#aaa", length: 2},
      {color: "#bbb", length: 3},
    ] as ColorSequenceArray

    expect(shiftedColorSequenceArray(colorSequence, -1)).toEqual([
      {color: "#bbb", length: 1},
      {color: "#aaa", length: 2},
      {color: "#bbb", length: 2},
    ])

    expect(shiftedColorSequenceArray(colorSequence, 6)).toEqual([
      {color: "#aaa", length: 1},
      {color: "#bbb", length: 3},
      {color: "#aaa", length: 1},
    ])
  })
})

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
  it('works with negative colorShift', () => {
    const config = [
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
      {color: "#00f", length: 4}
    ] as ColorSequenceArray

    expect(nextStitchColorByIndex(0, config, {colorShift: -3})).toBe("#00f")
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


describe('matchColorwayToSequence', () => {
  const colorwayList : ColorwayRecord = {
    'test1': {
      yarnName: 'My Yarn',
      colorway: 'test1 is cool',
      colorSequence: [
        {color: "#f00", length: 2},
        {color: "#0f0", length: 3},
        {color: "#00f", length: 4}
      ]
    }
  }

  it('returns the colorway id of a colorway which works if the colors values and order match', () => {
    expect(matchColorwayToColorSequence(colorwayList, [
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
      {color: "#00f", length: 4}
    ])).toEqual('test1')
  })
  it('returns the colorway id of a colorway which works if the colors values and order match but the lengths are different', () => {
    expect(matchColorwayToColorSequence(colorwayList, [
      {color: "#f00", length: 4},
      {color: "#0f0", length: 3},
      {color: "#00f", length: 4}
    ])).toEqual('test1')
  })
  it.skip('picks one if multiple colorways have the same colors', () => {})
  it('returns custom if one of the colors is different', () => {
    expect(matchColorwayToColorSequence(colorwayList, [
      {color: "#f00", length: 2},
      {color: "#0ff", length: 3},
      {color: "#00f", length: 4}
    ])).toEqual('custom')
  })
  it('returns custom if the order does not match', () => {
    expect(matchColorwayToColorSequence(colorwayList, [
      {color: "#00f", length: 4},
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
    ])).toEqual('custom')
  })
  it('returns custom if the colorway to match has more colors than the one in the colorways object', () => {
    expect(matchColorwayToColorSequence(colorwayList, [
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
      {color: "#00f", length: 4},
      {color: "#0ff", length: 5}
    ])).toEqual('custom')
  })
  it('returns custom if the colorway to match has fewer colors than the one in the colorways object', () => {
    expect(matchColorwayToColorSequence(colorwayList, [
      {color: "#f00", length: 2},
      {color: "#0f0", length: 3},
    ])).toEqual('custom')
  })
})
