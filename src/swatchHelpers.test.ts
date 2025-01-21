import { describe, it, expect } from 'vitest'
import { ColorSequenceArray } from './types'
import {
  swatchMatrix,
  swatchMatrixWithReversedEvenRows,
  clusteredSwatchMatrix,
} from './swatchHelpers'

describe('swatchMatrix', () => {
  it('creates a matrix of color codes based on the color sequence with the colors in the even rows filling in in the reverse direction', () => {
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
        ["#ccc","#bbb","#aaa","#eee"],
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
        ["#ccc","#aaa","#eee"],
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
      ["#222","#222","#222","#111"],
      ["#222","#000","#000","#000"],
      ["#222","#222","#111","#111"]
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
        ["#eee","#ddd","#ccc","#bbb","#aaa"],
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
        ["#aaa","#eee","#ddd","#ccc"],
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
        ["#ddd","#ccc","#bbb","#aaa"],
        ["#eee","#aaa","#bbb","#ccc","#ddd"]
      ])
  })
  it('removes a color between even and odd rows when staggered with colorSwallowed type', () => {
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
        ["#ccc","#bbb","#aaa","#eee"],
        ["#eee","#aaa","#bbb","#ccc"],
        ["#bbb","#aaa","#eee","#ddd"]
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
