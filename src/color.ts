import { Color, ColorInSequence, ColorSequenceArray, ColorwayRecord } from './types'
import { DeepReadonly } from 'ts-essentials'
import { mod } from './numberHelpers'

export function flatColorSequenceArray(colorSequence : ColorSequenceArray) : Array<Color> {
  return colorSequence.reduce((ary : Array<Color>, conf: ColorInSequence) : Array<Color> => ary.concat(new Array(conf.length).fill(conf.color)), []);
}

export function nextStitchColorByIndex(i : number, colorSequence : ColorSequenceArray, { colorShift } = { colorShift: 0 } ):Color {
  const flattened = flatColorSequenceArray(colorSequence)
  return flattened[mod((i + colorShift), flattened.length)];
}

export function shiftedColorSequenceArray(colorSequence : ColorSequenceArray, colorShift: number) : ColorSequenceArray {
  const flattened = flatColorSequenceArray(colorSequence)
  const shift = mod(colorShift, totalColorSequenceLength(colorSequence))
  flattened.push(...flattened.splice(0, shift))
  const shiftedColorSequence = flattened.reduce((newArray: ColorSequenceArray, color : Color) => {
    const last = newArray.slice(-1)[0]
    if(last && last.color === color) {
      last.length += 1
    } else {
      newArray.push({color: color, length: 1})
    }
    return newArray
  }, [])
  return shiftedColorSequence
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
