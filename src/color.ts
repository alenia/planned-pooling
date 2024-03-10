import { Color, ColorConfig, ColorConfigArray } from './types'

export function nextStitchColorByIndex(i : number, colorConfig : ColorConfigArray, { colorShift } = { colorShift: 0 } ):Color {
  const flatColorSequenceArray = colorConfig.reduce((ary : Array<Color>, conf: ColorConfig) : Array<Color> => ary.concat(new Array(conf.length).fill(conf.color)), []);
  return flatColorSequenceArray[(i + colorShift) % flatColorSequenceArray.length];
}

export function isStringAColor(s: string) : boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
}

export function getRandomNotWhiteColor() : Color {
  return '#' + Math.floor(Math.random()*16777214).toString(16).padStart(6,"0")
}

export function totalColorSequenceLength(colorConfig : ColorConfigArray) : number {
  let result = 0;
  for (const i in colorConfig) {
    result += colorConfig[i].length;
  }
  return result;
}
