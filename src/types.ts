export enum StitchPattern {
  unstyled = "unstyled",
  moss = "moss",
  stacked = "stacked",
  granny = "granny",
  hdc = "hdc",
  shell = "shell",
  vStitch = "v-stitch",
  jasmine = "jasmine",
  ripple = "ripple",
  vstitchCluster = "vstitchCluster",
  ablockCluster = "ablockCluster",
}

export type Color = `#${string}`;

export type ColorInSequence = {
  color: Color,
  length: number,
}

export type ColorSequenceArray = Array<ColorInSequence>

export type SwatchConfig = {
    colorSequence: ColorSequenceArray,
    stitchesPerRow: number,
    stitchPattern: StitchPattern,
    numberOfRows: number,
    colorShift: number,
    staggerLengths: boolean,
    showRowNumbers: boolean
}
