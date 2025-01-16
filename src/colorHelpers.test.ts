import { describe, expect, it, vi } from 'vitest'
import {
  isStringAColor,
  getRandomNotWhiteColor,
} from './colorHelpers'

describe('isStringAColor', () => {
  it('tells you whether or not a string is a hex color', () => {
    expect(isStringAColor('#fff')).toBe(true)
    expect(isStringAColor('#FFF')).toBe(true)
    expect(isStringAColor('#000')).toBe(true)
    expect(isStringAColor('#012345')).toBe(true)
    expect(isStringAColor('#ffffff')).toBe(true)
    expect(isStringAColor('#FFFFFF')).toBe(true)
    expect(isStringAColor('#gggggg')).toBe(false)
    expect(isStringAColor('ffffff')).toBe(false)
    expect(isStringAColor('#ffff')).toBe(false)
  })
})

describe('getRandomNotWhiteColor', () => {
  it('gets a random color', () => {
    const randomColor = getRandomNotWhiteColor()
    expect(isStringAColor(randomColor), `${randomColor} should match color string expectations`).toBe(true)
  })
  it('can be black', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const black = getRandomNotWhiteColor()
    expect(black).toEqual('#000000')
    expect(isStringAColor(black), `${black} should match color string expectations`).toBe(true)
    vi.spyOn(Math, 'random').mockRestore();
  })

  it('cannot be white, but can be very light', () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)
    const almostWhite = getRandomNotWhiteColor()
    expect(isStringAColor(almostWhite), `${almostWhite} should match color string expectations`).toBe(true)
    expect(almostWhite).toEqual('#fffffe')
    vi.spyOn(Math, 'random').mockRestore();
  })
})
