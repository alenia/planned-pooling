import { DeepReadonly } from 'ts-essentials'

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
  compactMoss = "compact-moss",
}

export type Color = `#${string}`;

export type ColorInSequence = {
  color: Color,
  length: number,
}

export type ColorSequenceArray = Array<ColorInSequence>

  // Naming note: I really don't /love/ this name. The difference is stitchPattern is a lookup key but is primarily a view concern?
  // I don't really want my swatchMatrix to know about stitchPattern since if I have to pass that in it'll be a distraction in the tests.
  // I think later ClusteredSwatchConfig will include clustersPerRow and all the other cluster stuff that comes from the stitchPattern lookup
export type StandardSwatchConfig = {
  colorSequence: ColorSequenceArray,
  stitchesPerRow: number,
  numberOfRows: number,
  colorShift: number,
  staggerLengths: boolean
}

export type SwatchConfig = StandardSwatchConfig & { stitchPattern: StitchPattern }

export type Colorway = {
  yarnName: string,
  colorway: string,
  colorSequence: Array<ColorInSequence>
}

export type ColorwayRecord = Record<string, DeepReadonly<Colorway>>
