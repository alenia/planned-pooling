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

export type Color = string; //`#${string}`;

export type ColorConfig = {
  color: Color,
  length: number,
}

export type ColorConfigArray = Array<ColorConfig>
