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

export type ColorConfig = {
  color: Color,
  length: number,
}

export type ColorConfigArray = Array<ColorConfig>

export type SwatchConfig = {
    colorConfig: ColorConfigArray,
    crowLength: number,
    stitchPattern: StitchPattern,
    crows: number,
    colorShift: number,
    staggerLengths: boolean,
    showRowNumbers: boolean
}
