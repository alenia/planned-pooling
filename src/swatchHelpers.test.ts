import { describe, it, expect } from 'vitest'
import { ColorSequenceArray } from './types'
import {
  swatchMatrix
} from './swatchHelpers'

describe('swatchMatrix', () => {
  it.skip("doesn't choke on zeros")
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
  it.skip('swallows stitches', () => { //NOTE: this is not handled in the existing code, it's just dealt with by CSS (so gross!!!)
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
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#ddd","#ccc","#bbb","#aaa"],
        ["#eee","#aaa","#bbb","#ccc"]
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
