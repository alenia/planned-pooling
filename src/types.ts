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

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type ColorConfig = {
  color: Color,
  length: number,
}

export type ColorConfigArray = Array<ColorConfig>
