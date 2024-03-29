import { Color, ColorInSequence, ColorSequenceArray, ColorwayRecord } from './types'
import { DeepReadonly } from 'ts-essentials'

export function nextStitchColorByIndex(i : number, colorSequence : ColorSequenceArray, { colorShift } = { colorShift: 0 } ):Color {
  const flatColorSequenceArray = colorSequence.reduce((ary : Array<Color>, conf: ColorInSequence) : Array<Color> => ary.concat(new Array(conf.length).fill(conf.color)), []);
  return flatColorSequenceArray[(i + colorShift) % flatColorSequenceArray.length];
}

export function isStringAColor(s: string) : boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
}

export function getRandomNotWhiteColor() : Color {
  return '#' + Math.floor(Math.random()*16777214).toString(16).padStart(6,"0") as Color
}

export function totalColorSequenceLength(colorSequence : ColorSequenceArray) : number {
  let result = 0;
  for (const i in colorSequence) {
    result += colorSequence[i].length;
  }
  return result;
}

export function duplicateColorSequenceArray(colorSequence : DeepReadonly<ColorSequenceArray> | ColorSequenceArray) : ColorSequenceArray {
  return colorSequence.map((c) => ({...c}))
}

export function matchColorwayToColorSequence(colorwayList: ColorwayRecord, colorSequence: ColorSequenceArray) : string {
  const colorwayIds = Object.keys(colorwayList)
  const matchedColorwayId = colorwayIds.find((colorwayId) => {
    const colorway = colorwayList[colorwayId]
    if(colorway.colorSequence.length !== colorSequence.length ) { return false }
    return colorway.colorSequence.every(({color}, index) => color === colorSequence[index].color)
  })
  return matchedColorwayId || 'custom'
}
