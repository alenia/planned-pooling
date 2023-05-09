export function paintStitches(pooler, colorConfig) {
  let colorSequence = colorConfig.reduce((ary, conf) => ary.concat(new Array(conf.length).fill(conf.color)), []);
  Array.from(pooler.children).forEach((child, i) => {
    child.style.backgroundColor = colorSequence[i % colorSequence.length];
  })
}
