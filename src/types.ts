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

export type SwatchConfig = {
    colorSequence: ColorSequenceArray,
    stitchesPerRow: number,
    stitchPattern: StitchPattern,
    numberOfRows: number,
    colorShift: number,
    staggerLengths: boolean
}

export type Colorway = {
  yarnName: string,
  colorway: string,
  colorSequence: Array<ColorInSequence>
}

export type ColorwayRecord = Record<string, DeepReadonly<Colorway>>
