export function entrelacStitchCount(c: number) {
  return 2*c*c + c
}

export function closestEntrelacStitchCounts(gaugeStitches : number) {
  let i=4;
  const results = [];
  let numberOfRepeats;
  while((numberOfRepeats = gaugeStitches/entrelacStitchCount(i)) > .9) {
    const entrelacStitches = Math.round(numberOfRepeats) * entrelacStitchCount(i)
    if(Math.abs(entrelacStitches - gaugeStitches) < 20) {
      results.push(i)
    }
    i ++
  }
  return results
}

export function decoratedClosestEntrelacStitchCounts(gaugeStitches: number) {
  const counts = closestEntrelacStitchCounts(gaugeStitches)
  return counts.map((i) => {
    const numberOfRepeats = Math.round(gaugeStitches/entrelacStitchCount(i))
    const entrelacStitches = numberOfRepeats * entrelacStitchCount(i)
    const diff = Math.abs(gaugeStitches - entrelacStitches)
    return `${numberOfRepeats} ${i}-stitch entrelac squares use ${entrelacStitches} stitches per color, ${diff} stitches different than your gauge`
  })
}
