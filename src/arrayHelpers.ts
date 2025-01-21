import { mod } from './numberHelpers'

export function circularSlice(ary: Array<unknown>, index: number, size: number) {
  const start = mod(index, ary.length)
  let end = start + size
  let output = ary.slice(start, end)
  while(end > ary.length) {
    end = end - ary.length
    output = output.concat(ary.slice(0, end))
  }
  return output
}
