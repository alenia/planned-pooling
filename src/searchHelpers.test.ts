import { describe, expect, it } from 'vitest'
import { URLSearchParamsFromSwatchConfig, sanitizeSearchParamInputs } from './searchHelpers'
import { StitchPattern, SwatchConfig } from './types'

describe('URLSearchParamsFromSwatchConfig', () => {
  it('includes all the relevent info in the URL params', () => {
    const swatchConfig = {
      colorSequence: [
        {color: '#f00', length: 3},
        {color: '#0f0', length: 2},
      ],
      crowLength: 18,
      crows: 40,
      colorShift: 5,
      staggerLengths: false,
      stitchPattern: StitchPattern.moss,
      showRowNumbers: false
    } as SwatchConfig

    const searchParams = URLSearchParamsFromSwatchConfig(swatchConfig)
    expect(searchParams.get('stitchPattern')).toEqual('moss')
    expect(searchParams.get('stitchesPerRow')).toEqual("18")
    expect(searchParams.get('rows')).toEqual("40")
    expect(searchParams.get('colorShift')).toEqual("5")
    expect(searchParams.get('staggerLengths')).toEqual("false")
    expect(searchParams.get('colors')).toEqual('#f00,#0f0')
    expect(searchParams.get('colorLengths')).toEqual('3,2')
  })
})

describe('sanitizeSearchParamInputs', () => {
  it('works properly with the parameterized inputs', () => {
    const swatchConfig = {
      colorSequence: [
        {color: '#f00', length: 3},
        {color: '#0f0', length: 2},
      ],
      crowLength: 18,
      crows: 40,
      colorShift: 5,
      staggerLengths: true,
      stitchPattern: StitchPattern.moss,
      showRowNumbers: false
    } as SwatchConfig

    const searchParams = URLSearchParamsFromSwatchConfig(swatchConfig)
    expect(sanitizeSearchParamInputs.crowLength(searchParams)).toEqual(18)
    expect(sanitizeSearchParamInputs.crows(searchParams)).toEqual(40)
    expect(sanitizeSearchParamInputs.colorShift(searchParams)).toEqual(5)
    expect(sanitizeSearchParamInputs.colorSequence(searchParams)).toEqual([
      {color: '#f00', length: 3},
      {color: '#0f0', length: 2},
    ])
    expect(sanitizeSearchParamInputs.stitchPattern(searchParams)).toEqual(StitchPattern.moss)
    expect(sanitizeSearchParamInputs.staggerLengths(searchParams)).toEqual(true)
  })

  it('only returns crowLength iff it is a number', () => {
    expect(sanitizeSearchParamInputs.crowLength(new URLSearchParams('?stitchesPerRow=20'))).toEqual(20)
    expect(sanitizeSearchParamInputs.crowLength(new URLSearchParams('?stitchesPerRow=0'))).toEqual(0)
    expect(sanitizeSearchParamInputs.crowLength(new URLSearchParams('?stitchesPerRow=foo'))).toEqual(NaN)
    expect(sanitizeSearchParamInputs.crowLength(new URLSearchParams('?notHere=4'))).toEqual(NaN)
    //TODO: Don't allow negative numbers
  })
  it('only returns crows iff it is a number', () => {
    expect(sanitizeSearchParamInputs.crows(new URLSearchParams('?rows=20'))).toEqual(20)
    expect(sanitizeSearchParamInputs.crows(new URLSearchParams('?rows=0'))).toEqual(0)
    expect(sanitizeSearchParamInputs.crows(new URLSearchParams('?rows=foo'))).toEqual(NaN)
    expect(sanitizeSearchParamInputs.crows(new URLSearchParams('?notHere=4'))).toEqual(NaN)
  })
  it('only returns colorShift iff it is a number', () => {
    expect(sanitizeSearchParamInputs.colorShift(new URLSearchParams('?colorShift=20'))).toEqual(20)
    expect(sanitizeSearchParamInputs.colorShift(new URLSearchParams('?colorShift=0'))).toEqual(0)
    expect(sanitizeSearchParamInputs.colorShift(new URLSearchParams('?colorShift=foo'))).toEqual(NaN)
    expect(sanitizeSearchParamInputs.colorShift(new URLSearchParams('?notHere=4'))).toEqual(NaN)
    //TODO: Don't allow negative numbers
  })
  it('returns colorSequence iff properly formatted', () => {
    const goodParams = '?colors=%230e0e66%2C%23ff001d%2C%230e0e66%2C%238dd0f2%2C%23fcf7eb%2C%238dd0f2&colorLengths=3%2C3%2C3%2C2%2C5%2C2'
    const notEnoughLengths = '?colors=%230e0e66%2C%23ff001d%2C%230e0e66%2C%238dd0f2%2C%23fcf7eb%2C%238dd0f2&colorLengths=3%2C3%2C3%2C2%2C5'
    const notEnoughColors = '?colors=%230e0e66%2C%23ff001d%2C%230e0e66%2C%238dd0f2%2C%23fcf7eb&colorLengths=3%2C3%2C3%2C2%2C5%2C2'
    const colorsAreNotColors = '?colors=%230e0e66%2C%23ff001d%2C%230e0e66%2C%238dd0f2%2Cwhoops&colorLengths=3%2C3%2C3%2C2%2C5%2C2'
    const lengthsAreNotNumbers = '?colors=%230e0e66%2C%23ff001d%2C%230e0e66%2C%238dd0f2%2C%23fcf7eb%2C%238dd0f2&colorLengths=3%2C3%2C3%2C2%2C5%2Cfour'
    const missingColors = '?colorLengths=3%2C3%2C3%2C2%2C5'
    const missingLengths = '?colors=%230e0e66%2C%23ff001d%2C%230e0e66%2C%238dd0f2%2C%23fcf7eb%2C%238dd0f2'
    expect(sanitizeSearchParamInputs.colorSequence(new URLSearchParams(goodParams))).toEqual([
      {color: "#0e0e66", length: 3},
      {color: "#ff001d", length: 3},
      {color: "#0e0e66", length: 3},
      {color: "#8dd0f2", length: 2},
      {color: "#fcf7eb", length: 5},
      {color: "#8dd0f2", length: 2},
    ])
    expect(sanitizeSearchParamInputs.colorSequence(new URLSearchParams(missingColors))).toEqual(false)
    expect(sanitizeSearchParamInputs.colorSequence(new URLSearchParams(missingLengths))).toEqual(false)
    expect(sanitizeSearchParamInputs.colorSequence(new URLSearchParams(notEnoughLengths))).toEqual(false)
    expect(sanitizeSearchParamInputs.colorSequence(new URLSearchParams(notEnoughColors))).toEqual(false)
    expect(sanitizeSearchParamInputs.colorSequence(new URLSearchParams(colorsAreNotColors))).toEqual(false)
    expect(sanitizeSearchParamInputs.colorSequence(new URLSearchParams(lengthsAreNotNumbers))).toEqual(false)
  })
  it('returns stagger lengths iff it is true', () => {
    expect(sanitizeSearchParamInputs.staggerLengths(new URLSearchParams('?staggerLengths=true'))).toEqual(true)
    expect(sanitizeSearchParamInputs.staggerLengths(new URLSearchParams('?staggerLengths=banana'))).toEqual(false)
    expect(sanitizeSearchParamInputs.staggerLengths(new URLSearchParams('?staggerLengths=false'))).toEqual(false)
  })
  it('returns stitch patterns', () => {
    expect(sanitizeSearchParamInputs.stitchPattern(new URLSearchParams('?stitchPattern=stacked'))).toEqual(StitchPattern.stacked)
    expect(sanitizeSearchParamInputs.stitchPattern(new URLSearchParams('?stitchPattern=banana'))).toEqual(false)
  })
})
