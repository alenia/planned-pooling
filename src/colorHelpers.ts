import { Color } from './types'

export function isStringAColor(s: string) : boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
}

export function getRandomNotWhiteColor() : Color {
  return '#' + Math.floor(Math.random()*16777214).toString(16).padStart(6,"0") as Color
}

export const defaultPickerColors = [
  "#d9073a",
  "#f57605",
  "#fcdc4d",
  "#a1c349",
  "#1c40b8",
  "#7b0f9a",
  "#542e0f",
  "#fdf0d5"
]
