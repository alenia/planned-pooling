import Swatch, { buildSwatch } from './swatch.jsx'

const purple = "#C274B3";
const teal = "#4ECDC4";
const brown = "#967527";
const orange = "#f0ab0a";

const colorConfigNew = [
  { color: purple, length: 6 },
  { color: teal, length: 2 },
  { color: orange, length: 2 }, 
  { color: brown, length: 3 }, 
  { color: orange, length: 2 }, 
  { color: teal, length: 2 },
]
const colorConfigOld = [
  { color: purple, length: 5 },
  { color: teal, length: 2 },
  { color: orange, length: 2 }, 
  { color: brown, length: 5 }, 
  { color: orange, length: 1 }, 
  { color: teal, length: 2 },
]


function OverlappingShawlPreview({colorConfig, colorShiftA, colorShiftB}) {
  const clusterProps = { colorConfig, crows: 5, crowLength: 17, stitchPattern: 'ablockCluster' }
  return (
    <div className="overlapping-container">
      <Swatch className="vertical" {...clusterProps} colorShift={colorShiftA}/>
      <Swatch className="vertical mirrored" {...clusterProps} colorShift={colorShiftB}/>
      <Swatch className="vertical" {...clusterProps} colorShift={colorShiftA}/>
      <Swatch className="vertical mirrored" {...clusterProps} colorShift={colorShiftB}/>
      <Swatch className="vertical" {...clusterProps} colorShift={colorShiftA}/>
      <Swatch className="vertical mirrored" {...clusterProps} colorShift={colorShiftB}/>
    </div>
  )
}
function ShawlChart({colorConfig, colorShiftA, colorShiftB}) {
  const clusterProps = { colorConfig, crows: 2, crowLength: 17, stitchPattern: 'ablockCluster' }
  return (
    <div>
      <h4>Color Shift A</h4>
      <Swatch className="vertical" {...clusterProps} colorShift={colorShiftA}/>
      <h4>Color Shift B</h4>
      <Swatch className="vertical" {...clusterProps} colorShift={colorShiftB}/>
    </div>
  )
}

const newShawlConfig = { colorConfig: colorConfigNew, colorShiftA: 10, colorShiftB: 2}
const oldShawlConfig = { colorConfig: colorConfigOld, colorShiftA: 10, colorShiftB: 2}
export default () => (
  <div>
    <ShawlChart {...newShawlConfig}/>
    <h3>new</h3>
    <OverlappingShawlPreview {...newShawlConfig}/>
    <h3>old</h3>
    <OverlappingShawlPreview {...oldShawlConfig}/>
  </div>
)
