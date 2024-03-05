type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type ColorConfig = {
  color: Color,
  length: number,
}

export type ColorConfigArray = Array<ColorConfig>

export function nextStitchColorByIndex(i : number, colorConfig : ColorConfigArray, { colorShift } = { colorShift: 0 } ):Color {
  let flatColorSequenceArray = colorConfig.reduce((ary : Array<Color>, conf: ColorConfig) : Array<Color> => ary.concat(new Array(conf.length).fill(conf.color)), []);
  return flatColorSequenceArray[(i + colorShift) % flatColorSequenceArray.length];
}
