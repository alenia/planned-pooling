import { Color, ColorInSequence, ColorSequenceArray, ColorwayRecord } from './types'
import { DeepReadonly } from 'ts-essentials'
import { mod } from './numberHelpers'

export function flatColorSequenceArray(colorSequence : ColorSequenceArray) : Array<Color> {
  return colorSequence.reduce((ary : Array<Color>, conf: ColorInSequence) : Array<Color> => ary.concat(new Array(conf.length).fill(conf.color)), []);
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

export function presetPickerColors({colorSequence = [], extraColors = []} : {colorSequence? : ColorSequenceArray, extraColors?: Array<Color>}) : Array<Color> {
  const defaultColors = [
    "#d9073a",
    "#f57605",
    "#fcdc4d",
    "#a1c349",
    "#1c40b8",
    "#7b0f9a",
    "#542e0f",
    "#fdf0d5"
  ] as Array<Color>
  return [...new Set([...defaultColors, ...colorSequence.map((c) => c.color), ...extraColors])];
}

export function rowsTillMirrored({}) {
}
