import { describe, it, expect } from 'vitest'
import { ColorSequenceArray } from './types'
import {
  swatchMatrix,
  swatchMatrixWithReversedEvenRows,
} from './swatchHelpers'

describe('swatchMatrix', () => {
  it.skip("doesn't choke on zeros")
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
        numberOfRows: 3,
        colorShift: 0,
        staggerLengths: true,
        staggerType: 'colorSwallowed'
      })).toEqual([
        ["#eee","#aaa","#bbb","#ccc","#ddd"],
               ["#eee","#aaa","#bbb","#ccc"],
        ["#ddd","#eee","#aaa","#bbb","#ccc"]
      ])
  })
  it.skip('swallows stitches') //Note, this also is in CSS rather than in the code
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
  it.skip("doesn't choke on zeros")
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
        ["#ddd","#ccc","#bbb","#aaa"],
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
