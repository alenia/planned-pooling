import { SwatchParams, ColorConfigArray, Color } from './types'
import { isStringAColor } from './color'

export function URLSearchParamsFromSwatchParams(swatchParams : SwatchParams) : URLSearchParams {
  // renamed crows because it's an external facing API
  const flattenedParams = {
    stitchesPerRow: swatchParams.crowLength.toString(),
    rows: swatchParams.crows.toString(),
    colorShift: swatchParams.colorShift.toString(),
    staggerLengths: swatchParams.staggerLengths.toString(),
    stitchPattern: swatchParams.stitchPattern.toString(),
    colors: swatchParams.colorConfig.map(({color}) => color).toString(),
    colorLengths: swatchParams.colorConfig.map(({length}) => length).toString()
  }
  return new URLSearchParams(flattenedParams);
}

function numberParserForParam (paramName : string) : (searchParams: URLSearchParams) => (number) {
  return (searchParams) => {
    const param = searchParams.get(paramName) || ''
    return parseInt(param)
  }
}

export const sanitizeSearchParamInputs = {
  colorConfig: (searchParams : URLSearchParams) : ColorConfigArray | false => {
    const colorsString = searchParams.get('colors')
    const colorLengthsString = searchParams.get('colorLengths')
    if(!colorsString || !colorLengthsString) { return false }

    const colorsArray = colorsString.split(',')
    const colorLengths = colorLengthsString.split(',').map((l) => parseInt(l))

    if(colorsArray.length !== colorLengths.length) {
      return false
    }
    if(colorsArray.some((c) => !isStringAColor(c))) {
      return false
    }
    if(colorLengths.some((v) => isNaN(v))) {
      return false
    }

    return colorsArray.map((color, index) => ({ color: color as Color, length: colorLengths[index] }))
  },
  crowLength: numberParserForParam('stitchesPerRow'),
  crows: numberParserForParam('rows'),
  colorShift: numberParserForParam('colorShift'),
}
