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
  const output = [] as Array<Array<Color>>
  let startingIndex = colorShift;
  for(let i = 0; i < numberOfRows; i++) {
    const stitchesInThisRow = (staggerLengths && staggerType === 'normal' && i % 2 === 0) ? stitchesPerRow + 1 : stitchesPerRow;

    const nextSlice = circularSlice(flattenedColorSequence, startingIndex, stitchesInThisRow) as Array<Color>

    i % 2 === 0 ? output.push(nextSlice) : output.push(nextSlice.reverse())

    if(staggerLengths && staggerType === 'colorStretched' && i % 2 === 1) {
      startingIndex += stitchesInThisRow - 1
    } else {
      startingIndex += stitchesInThisRow
    }
  }
  return output
}
