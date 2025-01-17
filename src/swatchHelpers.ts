import { StandardSwatchConfig, Color } from './types'
import { flatColorSequenceArray } from './colorSequenceHelpers'
import { circularSlice } from './arrayHelpers'

export function swatchMatrix({ colorSequence, stitchesPerRow, numberOfRows, colorShift } : StandardSwatchConfig) : Array<Array<Color>>{
  const flattenedColorSequence = flatColorSequenceArray(colorSequence)
  const output = [] as Array<Array<Color>>
  let startingIndex = colorShift;
  for(let i = 0; i < numberOfRows; i++) {
    const nextSlice = circularSlice(flattenedColorSequence, startingIndex, stitchesPerRow) as Array<Color>
    i % 2 === 0 ? output.push(nextSlice) : output.push(nextSlice.reverse())
    startingIndex += stitchesPerRow
  }
  return output
}
