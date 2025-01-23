import { StandardSwatchConfig, Color, ClusterConfiguration } from './types'
import { flatColorSequenceArray, totalColorSequenceLength } from './colorSequenceHelpers'
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
  let startingIndex = colorShift;
  for(let i = 0; i < numberOfRows; i++) {
    const stitchesInThisRow = (staggeredWithType('normal') && i % 2 === 0) ? stitchesPerRow + 1 : stitchesPerRow;

    const nextSlice = circularSlice(flattenedColorSequence, startingIndex, stitchesInThisRow) as Array<Color>

    output.push(nextSlice)

    if(staggeredWithType('colorStretched') && i % 2 === 1) {
      startingIndex += stitchesInThisRow - 1
    } else if(staggeredWithType('colorSwallowed') && i % 2 === 1) {
      startingIndex += stitchesInThisRow + 1
    } else {
      startingIndex += stitchesInThisRow
    }
  }
  return output
}

export function swatchMatrixWithReversedEvenRows({ //TODO: This is the (unused) version of swatchMatrix that takes logic out of CSS
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
    } else if(staggeredWithType('colorSwallowed') && i % 2 === 1) {
      startingIndex += stitchesInThisRow + 1
    } else {
      startingIndex += stitchesInThisRow
    }
  }
  return output
}

export function clusteredSwatchMatrix({
  colorSequence,
  stitchesPerRow,
  numberOfRows,
  colorShift,
  //staggerLengths, clusters don't support staggering yet
  //staggerType, clusters don't support stagger types yet
} : StandardSwatchConfig, clusterConfig : ClusterConfiguration) : Array<Array<Array<Color>>>{
  //Variable renames, deal with this later
  const clustersPerRow = stitchesPerRow;
  const stitchesPerCluster = clusterConfig.stitchCount;

  const flattenedColorSequence = flatColorSequenceArray(colorSequence)

  const wholeOutput = [] as Array<Array<Array<Color>>>
  let startingIndex = colorShift;
  for(let i = 0; i < numberOfRows; i++) {
    const clustersInThisRow = clustersPerRow;
    const rowOutput = [] as Array<Array<Color>>;
    if(clusterConfig.prepend){
      const nextSlice = circularSlice(flattenedColorSequence, startingIndex, 1) as Array<Color>
      startingIndex += 1
      rowOutput.push(nextSlice)
    }
    for (let j = 0; j < clustersInThisRow; j++) {
      const nextSlice = circularSlice(flattenedColorSequence, startingIndex, stitchesPerCluster) as Array<Color>
      startingIndex += stitchesPerCluster
      rowOutput.push(nextSlice)
    }
    if(clusterConfig.append){
      const nextSlice = circularSlice(flattenedColorSequence, startingIndex, 1) as Array<Color>
      startingIndex += 1
      rowOutput.push(nextSlice)
    }

    wholeOutput.push(rowOutput)
  }
  return wholeOutput
}

export function rowsTillMirrored({
  colorSequence,
  stitchesPerRow,
  numberOfRows, //note this shouldn't be needed
  colorShift,
  staggerLengths,
  staggerType
} : StandardSwatchConfig & {staggerType: 'normal' | 'colorStretched' | 'colorSwallowed'}) : number {
  const maxRows = totalColorSequenceLength(colorSequence) * 4
  const matrix = swatchMatrixWithReversedEvenRows({
  //const matrix = swatchMatrix({
    colorSequence,
    stitchesPerRow,
    numberOfRows: maxRows,
    colorShift,
    staggerLengths,
    staggerType
  })
  function compareRows(ref: Array<unknown>, target: Array<unknown>) {
    return ref.every((v,i)=> v === target[i])
  }

  const reversed0 = matrix[0].toReversed()
  const reversed1 = matrix[1].toReversed()
  const reversed2 = matrix[2].toReversed()

  var i = 2
  while(i < maxRows) {
    if(compareRows(matrix[i - 2], reversed2) && compareRows(matrix[i - 1], reversed1) && compareRows(matrix[i], reversed0)) {
      if(false) {
        console.log(
          matrix.map(
            (ary) => (ary.map((v) => (v === "#fff" ? '.' : 'o')).join(''))))
        console.log(i, matrix[i], reversed1, compareRows(matrix[i], reversed1))
        console.log(i, matrix[i+1], reversed0, compareRows(matrix[i+1], reversed0))
      }
      return i + 1
    }
    if(compareRows(matrix[i - 2], matrix[2]) && compareRows(matrix[i - 1], matrix[1]) && compareRows(matrix[i], matrix[0])) {
      if(false) {
        console.log(
          matrix.map(
            (ary) => (ary.map((v) => (v === "#fff" ? '.' : 'o')).join(''))))
        console.log(i, matrix[i], matrix[1], compareRows(matrix[i], matrix[1]))
        console.log(i, matrix[i+1], matrix[0], compareRows(matrix[i+1], matrix[0]))
      }
      return i + 1
    }
    i += 1
  }
  return 0
}
