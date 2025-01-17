import { describe, expect, it } from 'vitest'
import {
  flatColorSequenceArray,
  shiftedColorSequenceArray,
  totalColorSequenceLength,
  matchColorwayToColorSequence,
  presetPickerColors,
  rowsTillMirrored
} from './colorSequenceHelpers'
import { Color, ColorSequenceArray, ColorwayRecord } from './types'

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

describe('presetPickerColors', () => {
  const defaultColors = [ //explicitly duplicating this here to make sure that the colors are what I expect
    "#d9073a",
    "#f57605",
    "#fcdc4d",
    "#a1c349",
    "#1c40b8",
    "#7b0f9a",
    "#542e0f",
    "#fdf0d5"
  ] as Array<Color>
  it('includes all the default picker colors', () => {
    expect(presetPickerColors({})).toHaveLength(8)
    expect(presetPickerColors({})).toContain(defaultColors[0]) //TODO can I just go through all of these
  })
  it('allows the user to add in an array of extra colors', () => {
    expect(presetPickerColors({extraColors: ['#abcdef']})).toHaveLength(9)
    expect(presetPickerColors({extraColors: ['#abcdef']})).toContain(defaultColors[0])
    expect(presetPickerColors({extraColors: ['#abcdef']})).toContain('#abcdef')
    const twoAddedColors = presetPickerColors({extraColors: ['#abcdef', '#123456']})
    expect(twoAddedColors).toHaveLength(10)
    expect(twoAddedColors).toContain('#abcdef')
    expect(twoAddedColors).toContain('#123456')
  })
  it('dedupes extra colors from the extra color array', () => {
    const doubledExtraColors = presetPickerColors({extraColors: ['#abcdef', '#abcdef']})
    expect(doubledExtraColors).toHaveLength(9)
    expect(doubledExtraColors).toContain('#abcdef')
  })
  it('dedupes extra colors that already exist in defaults', () => {
    const duplicatedExistingColor = presetPickerColors({extraColors: ['#abcdef', defaultColors[0]]})
    expect(duplicatedExistingColor).toHaveLength(9)
    expect(duplicatedExistingColor).toContain('#abcdef')
    expect(duplicatedExistingColor).toContain(defaultColors[0])
  })
  it('allows the user to add in a color sequence', () => {
    const colorSequence = [
      {color: "#111111", length: 2},
      {color: "#222222", length: 3},
      {color: "#333333", length: 4}
    ] as ColorSequenceArray
    const pickerColors = presetPickerColors({colorSequence: colorSequence})
    expect(pickerColors).toHaveLength(11)
    expect(pickerColors).toContain('#111111')
  })
  it('dedupes color sequence colors that are in the color sequence array twice', () => {
    const colorSequence = [
      {color: "#111111", length: 2},
      {color: "#222222", length: 3},
      {color: "#111111", length: 4}
    ] as ColorSequenceArray
    const pickerColors = presetPickerColors({colorSequence: colorSequence})
    expect(pickerColors).toHaveLength(10)
    expect(pickerColors).toContain('#111111')
  })
  it('dedupes color sequence colors that already exist in defaults', () => {
    const colorSequence = [
      {color: "#111111", length: 2},
      {color: "#222222", length: 3},
      {color: defaultColors[0], length: 4}
    ] as ColorSequenceArray
    const pickerColors = presetPickerColors({colorSequence: colorSequence})
    expect(pickerColors).toHaveLength(10)
    expect(pickerColors).toContain('#111111')
    expect(pickerColors).toContain(defaultColors[0])
  })
  it('allows the user to add in both extra colors and color sequence colors', () => {
    const colorSequence = [
      {color: "#111111", length: 2},
      {color: "#222222", length: 3},
    ] as ColorSequenceArray
    const pickerColors = presetPickerColors({colorSequence: colorSequence, extraColors: ['#abcdef']})
    expect(pickerColors).toHaveLength(11)
    expect(pickerColors).toContain('#111111')
    expect(pickerColors).toContain('#abcdef')
    expect(pickerColors).toContain(defaultColors[0])
  })
  it('dedupes color sequence colors that are also passed in as extra colors', () => {
    const colorSequence = [
      {color: "#111111", length: 2},
      {color: "#abcdef", length: 3},
    ] as ColorSequenceArray
    const pickerColors = presetPickerColors({colorSequence: colorSequence, extraColors: ['#abcdef']})
    expect(pickerColors).toHaveLength(10)
    expect(pickerColors).toContain('#111111')
    expect(pickerColors).toContain('#abcdef')
    expect(pickerColors).toContain(defaultColors[0])
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
  it.skip('picks one if multiple colorways have the same colors')
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
describe('rowsTillMirrored', () => {
  it.skip("only works if your stitch pattern is mirrored or almost mirrored?")
  it.skip("works with multiple colors?")
  //Note: an ABAB color sequence is a sequence where color A is the same, color B is the same, and one of the color lengths is one extra
  describe('for an ABAB color sequence', () => {
    it("returns the number of rows until the position of the colors in the first two rows matches up with what happens in the last two rows but mirrored for an ABAB color sequence", () => {
      const colorSequence = [
        {color: '#00f', length: 2},
        {color: '#fff', length: 5},
        {color: '#00f', length: 2},
        {color: '#fff', length: 6},
      ]
      /*
     1 oo..... odd
     2 .....oo
     3 .oo.... odd
     4 ....oo.
     5 ..oo... odd
     6 ...oo..
     7 ...oo.. odd
     8 ..oo...
     9 ....oo. odd
    10 .oo....
    11 .....oo odd
    12 oo.....
       */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 7, colorShift: 0})).toEqual(12)
      /*
     1 oo.....o odd
     2 o......o
     3 o.....oo odd
       */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 8, colorShift: 0})).toEqual(3)
      /*
     1 ...oo... odd
     2 ...oo...
       */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 8, colorShift: 4})).toEqual(2)
    })
    it("works when the first color and second color are closer in length", () => {
      const colorSequence = [
        {color: '#00f', length: 5},
        {color: '#fff', length: 6},
        {color: '#00f', length: 5},
        {color: '#fff', length: 7},

      ]
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 11, colorShift: 0})).toEqual(14)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 12, colorShift: 0})).toEqual(9)
    })
    it("works when the first color is the same length as the alternating color", () => {
      const colorSequence = [
        {color: '#00f', length: 6},
        {color: '#fff', length: 6},
        {color: '#00f', length: 6},
        {color: '#fff', length: 7},

      ]
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 12, colorShift: 0})).toEqual(14)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 13, colorShift: 0})).toEqual(11)
    })
    it("works when the first color is longer than the alternating color", () => {
      const colorSequence = [
        {color: '#00f', length: 6},
        {color: '#fff', length: 3},
        {color: '#00f', length: 6},
        {color: '#fff', length: 4},

      ]
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 9, colorShift: 0})).toEqual(8)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 10, colorShift: 0})).toEqual(11)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 9, colorShift: -3})).toEqual(15)
    })
    it.skip("works with different offsets", () => {
      const colorSequence = [
        {color: '#00f', length: 2},
        {color: '#fff', length: 6},
        {color: '#00f', length: 2},
        {color: '#fff', length: 7},
      ]

      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 7, colorShift: 0})).toEqual(33) // Yikes i hate this one, don't believe in it
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 6, colorShift: 0})).toEqual(13)
    })
    it.skip("works when the first color is the alternating color")
    it.skip("works when the second alternating color is the shorter one")
  })

  it.skip("works with two colors and different offsets", () => {
    const colorSequence = [
      {color: '#00f', length: 2},
      {color: '#fff', length: 5},
    ]

    /*
     1 oo.....o odd
     2 oo.....o
     3 .....oo. odd
     4 ..oo....
     5 ...oo... odd
     6 ....oo..
     7 .oo..... odd
     8 o.....oo
     9 o.....oo odd
     */

      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 8, colorShift: 0})).toEqual(9)

    /*
     1 .....oo. odd
     2 ..oo....
     3 ...oo... odd
     4 ....oo..
     5 .oo..... odd
     */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 8, colorShift: 2})).toEqual(5)

     /*
     1 ....oo... odd
     2 .....oo..
     3 oo.....oo odd
     4 ..oo.....
     5 ...oo.... odd
     */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 9, colorShift: 3})).toEqual(5)

      /*
      1 oo.....oo odd
      2 ..oo.....
      3 ...oo.... odd
      4 o.....oo.
      5 o.....oo. odd
      6 ...oo....
      7 ..oo..... odd
      8 oo.....oo
      9 .....oo.. odd
     10 ....oo...
     11 .oo.....o odd
     12 .oo.....o
     13 ....oo... odd
     14 .....oo..
     15 oo.....oo odd
      */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 9, colorShift: 0})).toEqual(15)
  })

  it.skip("returns the number of rows until the position of the colors in the first two rows matches up with what happens in the last two rows but mirrored when alternating row lengths", () => {
    const colorSequence = [
      {color: '#00f', length: 2},
      {color: '#fff', length: 5},
    ]
    /*
     1 oo..... odd
     2  ....oo
     3 .oo.... odd
     4  ...oo.
     5 ..oo... odd
     6  ..oo..
     7 ...oo.. odd
     8  .oo...
     9 ....oo. odd
    10  oo....
    11 .....oo odd
    12  o.....
     */
    expect(rowsTillMirrored({colorSequence, stitchesPerRow: 6, colorShift: 0, staggerLengths: true, staggerType: "normal"})).toEqual(12)
    /*
     1 oo.....o odd
     2  o.....o
     3 o.....oo odd
     */
    expect(rowsTillMirrored({colorSequence, stitchesPerRow: 7, colorShift: 0, staggerLengths: true, staggerType: "normal"})).toEqual(3)//maybe 2
  })
  it.skip("works for other stagger types")
})
