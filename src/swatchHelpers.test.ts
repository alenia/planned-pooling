import { describe, it, expect } from 'vitest'
import { ColorSequenceArray } from './types'
import {
  swatchMatrix,
  swatchMatrixWithReversedEvenRows,
  clusteredSwatchMatrix,
  rowsTillMirrored
} from './swatchHelpers'

describe('swatchMatrix', () => {
  it('creates a matrix of color codes based on the color sequence', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#eee","#aaa","#bbb","#ccc"],
        ["#ddd","#eee","#aaa","#bbb"]
      ])
  })
  it("doesn't choke on zeros for stitches per row", () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 0,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        [],
        [],
        []
      ])
  })
  it("doesn't choke on zeros for number of rows", () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 3,
        numberOfRows: 0,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([])
  })
  it("doesn't choke on zero length colors", () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 0},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 3,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#ccc","#ddd"],
        ["#eee","#aaa","#ccc"],
        ["#ddd","#eee","#aaa"]
      ])
  })
  it('accounts for colors of different lengths and number of rows', () => {
    expect(swatchMatrix({
      colorSequence: [
        {color: '#000', length: 3},
        {color: '#111', length: 2},
        {color: '#222', length: 4},
      ] as ColorSequenceArray,
      stitchesPerRow: 4,
      numberOfRows: 4,
      staggerLengths: false,
      colorShift: 0,
      staggerType: 'normal'
    })).toEqual([
      ["#000","#000","#000","#111"],
      ["#111","#222","#222","#222"],
      ["#222","#000","#000","#000"],
      ["#111","#111","#222","#222"]
    ])
  })
  it('accounts for different numbers of stitches per row', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 5,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
      ])
  })
  it('accounts for color shift', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 3,
        staggerType: 'normal'
      })).toEqual([
        ["#ddd","#eee","#aaa","#bbb"],
        ["#ccc","#ddd","#eee","#aaa"],
        ["#bbb","#ccc","#ddd","#eee"]
      ])
  })
  it('makes odd rows have one extra color when staggerLengths is true and staggerType is normal', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        colorShift: 0,
        staggerLengths: true,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#eee","#aaa","#bbb","#ccc","#ddd"]
      ])
  })
  it('pretends to swallow stitches because the css removes the first stitch from odd rows', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 4,
        colorShift: 0,
        staggerLengths: true,
        staggerType: 'colorSwallowed'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#eee","#aaa","#bbb","#ccc"],
        ["#eee","#aaa","#bbb","#ccc"],
        ["#ddd","#eee","#aaa","#bbb"],
      ])
  })
  it('stretches stitches', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 5,
        colorShift: 0,
        staggerLengths: true,
        staggerType: 'colorStretched'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#eee","#aaa","#bbb","#ccc"],
        ["#ccc","#ddd","#eee","#aaa"],
        ["#bbb","#ccc","#ddd","#eee"],
        ["#eee","#aaa","#bbb","#ccc"],
      ])
  })
})

describe('swatchMatrixWithReversedEvenRows', () => { //TODO this is unused, I just put it here to put it here.
  it('creates a matrix of color codes based on the color sequence with the colors in the even rows filling in in the reverse direction', () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#ccc","#bbb","#aaa","#eee"],
        ["#ddd","#eee","#aaa","#bbb"]
      ])
  })
  it("doesn't choke on zeros for stitches per row", () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 0,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        [],
        [],
        []
      ])
  })
  it("doesn't choke on zeros for number of rows", () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 3,
        numberOfRows: 0,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([])
  })
  it("doesn't choke on zero length colors", () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 0},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 3,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#ccc","#ddd"],
        ["#ccc","#aaa","#eee"],
        ["#ddd","#eee","#aaa"]
      ])
  })
  it('accounts for colors of different lengths and number of rows', () => {
    expect(swatchMatrixWithReversedEvenRows({
      colorSequence: [
        {color: '#000', length: 3},
        {color: '#111', length: 2},
        {color: '#222', length: 4},
      ] as ColorSequenceArray,
      stitchesPerRow: 4,
      numberOfRows: 4,
      staggerLengths: false,
      colorShift: 0,
      staggerType: 'normal'
    })).toEqual([
      ["#000","#000","#000","#111"],
      ["#222","#222","#222","#111"],
      ["#222","#000","#000","#000"],
      ["#222","#222","#111","#111"]
    ])
  })
  it('accounts for different numbers of stitches per row', () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 5,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
        ["#eee","#ddd","#ccc","#bbb","#aaa"],
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
      ])
  })
  it('accounts for color shift', () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 3,
        staggerType: 'normal'
      })).toEqual([
        ["#ddd","#eee","#aaa","#bbb"],
        ["#aaa","#eee","#ddd","#ccc"],
        ["#bbb","#ccc","#ddd","#eee"]
      ])
  })
  it('makes odd rows have one extra color when staggerLengths is true and staggerType is normal', () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        colorShift: 0,
        staggerLengths: true,
        staggerType: 'normal'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
        ["#ddd","#ccc","#bbb","#aaa"],
        ["#eee","#aaa","#bbb","#ccc","#ddd"]
      ])
  })
  it('swallows stitches', () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        colorShift: 0,
        staggerLengths: true,
        staggerType: 'colorSwallowed'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#ccc","#bbb","#aaa","#eee"],
        ["#eee","#aaa","#bbb","#ccc"]
      ])
  })
  it('stretches stitches', () => {
    expect(
      swatchMatrixWithReversedEvenRows({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 5,
        colorShift: 0,
        staggerLengths: true,
        staggerType: 'colorStretched'
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#ccc","#bbb","#aaa","#eee"],
        ["#ccc","#ddd","#eee","#aaa"],
        ["#eee","#ddd","#ccc","#bbb"],
        ["#eee","#aaa","#bbb","#ccc"],
      ])
  })
})

describe("clusteredSwatchMatrix", () => {
  it('creates a matrix of color codes based on the color sequence and cluster configuration', () => {
    expect(
      clusteredSwatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 3, // Clusters per row in this case
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0,
      }, {
        stitchCount: 2,
        prepend: false,
        append: false
      })).toEqual([
        [["#aaa","#bbb"],["#ccc","#ddd"],["#eee","#aaa"]],
        [["#bbb","#ccc"],["#ddd","#eee"],["#aaa","#bbb"]],
        [["#ccc","#ddd"],["#eee","#aaa"],["#bbb","#ccc"]],
      ])
  })
  it('prepends a single-stitch cluster when prepend is selected', () => {
    expect(
      clusteredSwatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4, // Clusters per row in this case
        numberOfRows: 4,
        staggerLengths: false,
        colorShift: 0,
      }, {
        stitchCount: 3,
        prepend: true,
        append: false
      })).toEqual([
        [["#aaa"],["#bbb","#ccc","#ddd"],["#eee","#aaa","#bbb"],["#ccc","#ddd","#eee"],["#aaa","#bbb","#ccc"]],
        [["#ddd"],["#eee","#aaa","#bbb"],["#ccc","#ddd","#eee"],["#aaa","#bbb","#ccc"],["#ddd","#eee","#aaa"]],
        [["#bbb"],["#ccc","#ddd","#eee"],["#aaa","#bbb","#ccc"],["#ddd","#eee","#aaa"],["#bbb","#ccc","#ddd"]],
        [["#eee"],["#aaa","#bbb","#ccc"],["#ddd","#eee","#aaa"],["#bbb","#ccc","#ddd"],["#eee","#aaa","#bbb"]],
      ])
  })
  it('appends a single-stitch cluster when append is selected', () => {
    expect(
      clusteredSwatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 3, // Clusters per row in this case
        numberOfRows: 4,
        staggerLengths: false,
        colorShift: 0,
      }, {
        stitchCount: 2,
        prepend: false,
        append: true
      })).toEqual([
        [["#aaa","#bbb"],["#ccc","#ddd"],["#eee","#aaa"],["#bbb"]],
        [["#ccc","#ddd"],["#eee","#aaa"],["#bbb","#ccc"],["#ddd"]],
        [["#eee","#aaa"],["#bbb","#ccc"],["#ddd","#eee"],["#aaa"]],
        [["#bbb","#ccc"],["#ddd","#eee"],["#aaa","#bbb"],["#ccc"]]
      ])
  })
})

describe('rowsTillMirrored', () => {
  it.skip("only works if your stitch pattern is mirrored or almost mirrored?")
  it.skip("works with multiple colors?")
  //Note: an ABAB color sequence is a sequence where color A is the same, color B is the same, and one of the color lengths is one extra
  describe('for an ABAB color sequence', () => {
    const sharedConfig = {
        numberOfRows: 3,
        staggerLengths: false,
        staggerType: 'normal'
    }
    it("returns 2 if the first 2 rows are identical", () => {
      const colorSequence = [
        {color: '#00f', length: 2},
        {color: '#fff', length: 5},
        {color: '#00f', length: 2},
        {color: '#fff', length: 6},
      ] as ColorSequenceArray
      /*
     1 ...oo... odd
     2 ...oo...
       */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 8, colorShift: 4, ...sharedConfig})).toEqual(2)
    })
    it("returns the number of rows until the position of the colors in the first two rows matches up with what happens in the last two rows but mirrored", () => {
      const colorSequence = [
        {color: '#00f', length: 2},
        {color: '#fff', length: 5},
        {color: '#00f', length: 2},
        {color: '#fff', length: 6},
      ] as ColorSequenceArray
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
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 7, colorShift: 0, ...sharedConfig})).toEqual(12)
      /*
     1 oo.....o odd
     2 o......o
     3 o.....oo odd
       */
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 8, colorShift: 0, ...sharedConfig})).toEqual(3)
    })
    it("works when the first color and second color are closer in length", () => {
      const colorSequence = [
        {color: '#00f', length: 5},
        {color: '#fff', length: 6},
        {color: '#00f', length: 5},
        {color: '#fff', length: 7},

      ]
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 11, colorShift: 0, ...sharedConfig})).toEqual(14)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 12, colorShift: 0, ...sharedConfig})).toEqual(9)
    })
    it("works when the first color is the same length as the alternating color", () => {
      const colorSequence = [
        {color: '#00f', length: 6},
        {color: '#fff', length: 6},
        {color: '#00f', length: 6},
        {color: '#fff', length: 7},

      ]
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 12, colorShift: 0, ...sharedConfig})).toEqual(14)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 13, colorShift: 0, ...sharedConfig})).toEqual(11)
    })
    it("works when the first color is longer than the alternating color", () => {
      const colorSequence = [
        {color: '#00f', length: 6},
        {color: '#fff', length: 3},
        {color: '#00f', length: 6},
        {color: '#fff', length: 4},

      ]
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 9, colorShift: 0, ...sharedConfig})).toEqual(8)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 10, colorShift: 0, ...sharedConfig})).toEqual(11)
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 9, colorShift: -3, ...sharedConfig})).toEqual(15)
    })
    it.skip("works with different offsets", () => {
      const colorSequence = [
        {color: '#00f', length: 2},
        {color: '#fff', length: 6},
        {color: '#00f', length: 2},
        {color: '#fff', length: 7},
      ]

      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 7, colorShift: 0, ...sharedConfig})).toEqual(33) // Yikes i hate this one, don't believe in it
      expect(rowsTillMirrored({colorSequence, stitchesPerRow: 6, colorShift: 0, ...sharedConfig})).toEqual(13)
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
