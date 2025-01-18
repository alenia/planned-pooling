import { describe, it, expect } from 'vitest'
import { ColorSequenceArray } from './types'
import {
  swatchMatrix,
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
