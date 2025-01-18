import { StandardSwatchConfig, Color } from './types'
import { flatColorSequenceArray } from './colorSequenceHelpers'
import { circularSlice } from './arrayHelpers'

export function swatchMatrix({
  colorSequence,
  stitchesPerRow,
  numberOfRows,
  colorShift,
  staggerLengths,
  staggerType
} : StandardSwatchConfig & {staggerType: 'normal' | 'colorStretched' | 'colorSwallowed'}) : Array<Array<Color>>{
  const flattenedColorSequence = flatColorSequenceArray(colorSequence)
  function staggeredWithType(typeName: 'normal' | 'colorStretched' | 'colorSwallowed') {
    if (!staggerLengths) { return false }
    return staggerType === typeName
  }
  const output = [] as Array<Array<Color>>
  let startingIndex = staggeredWithType('colorSwallowed') ? colorShift - 1 : colorShift;
  for(let i = 0; i < numberOfRows; i++) {
    const stitchesInThisRow = ((staggeredWithType('normal') || staggeredWithType('colorSwallowed')) && i % 2 === 0) ? stitchesPerRow + 1 : stitchesPerRow;

    const nextSlice = circularSlice(flattenedColorSequence, startingIndex, stitchesInThisRow) as Array<Color>

    output.push(nextSlice)

    if(staggeredWithType('colorStretched') && i % 2 === 1) {
      startingIndex += stitchesInThisRow - 1
    } else {
      startingIndex += stitchesInThisRow
    }
  }
  return output
}

export function swatchMatrixWithReversedEvenRows({ //TODO: This is the version of swatchMatrix that takes logic out of CSS
  colorSequence,
  stitchesPerRow,
  numberOfRows,
  colorShift,
  staggerLengths,
  staggerType
} : StandardSwatchConfig & {staggerType: 'normal' | 'colorStretched' | 'colorSwallowed'}) : Array<Array<Color>>{
  function staggeredWithType(typeName: 'normal' | 'colorStretched' | 'colorSwallowed') {
    if (!staggerLengths) { return false }
    return staggerType === typeName
  }
  const flattenedColorSequence = flatColorSequenceArray(colorSequence)
  const output = [] as Array<Array<Color>>
  let startingIndex = colorShift;
  for(let i = 0; i < numberOfRows; i++) {
    const stitchesInThisRow = (staggeredWithType('normal') && i % 2 === 0) ? stitchesPerRow + 1 : stitchesPerRow;

    const nextSlice = circularSlice(flattenedColorSequence, startingIndex, stitchesInThisRow) as Array<Color>

    i % 2 === 0 ? output.push(nextSlice) : output.push(nextSlice.reverse())

    if(staggeredWithType('colorStretched') && i % 2 === 1) {
      startingIndex += stitchesInThisRow - 1
    } else if(staggeredWithType('colorSwallowed') && i % 2 === 0) {
      startingIndex += stitchesInThisRow + 1
    } else {
      startingIndex += stitchesInThisRow
    }
  }
  return output
}
