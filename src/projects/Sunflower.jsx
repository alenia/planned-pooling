import PropTypes from "prop-types"
import ExtraPropTypes from "../extraPropTypes.js"
import Swatch from '../Swatch.jsx'

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
  { color: brown, length: 4 }, 
  { color: orange, length: 2 }, 
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

OverlappingShawlPreview.propTypes = {
  colorConfig: ExtraPropTypes.colorConfig,
  colorShiftA: PropTypes.number,
  colorShiftB: PropTypes.number,
}

function OverlappingPreviewMultishift({colorConfig}) {
  const clusterProps = { colorConfig, crows: 5, crowLength: 17, stitchPattern: 'ablockCluster' }
  return (
    <div className="overlapping-container">
      <Swatch className="vertical" {...clusterProps} colorShift={11}/>
      <Swatch className="vertical mirrored" {...clusterProps} colorShift={1}/>
      <Swatch className="vertical" {...clusterProps} colorShift={10}/>
      <Swatch className="vertical mirrored" {...clusterProps} colorShift={2}/>
      <Swatch className="vertical" {...clusterProps} colorShift={11}/>
      <Swatch className="vertical mirrored" {...clusterProps} colorShift={1}/>
      <Swatch className="vertical" {...clusterProps} colorShift={10}/>
      <Swatch className="vertical mirrored" {...clusterProps} colorShift={2}/>
    </div>
  )
}

OverlappingPreviewMultishift.propTypes = {
  colorConfig: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    length: PropTypes.number
  })),
}

const newShawlConfig = { colorConfig: colorConfigNew, colorShiftA: 10, colorShiftB: 2}
const oldShawlConfig = { colorConfig: colorConfigOld, colorShiftA: 10, colorShiftB: 2}
const clusterProps = { colorConfig: colorConfigNew, crows: 2, crowLength: 17, stitchPattern: 'ablockCluster' }
const oldClusterProps = { colorConfig: colorConfigOld, crows: 2, crowLength: 17, stitchPattern: 'ablockCluster' }
export default function Sunflower() {
  return (
    <div>
      <div>
        <h4>Color Shift 10 (better)</h4>
        <Swatch className="vertical" {...clusterProps} colorShift={10}/>
        <h4>Color Shift 11</h4>
        <Swatch className="vertical" {...clusterProps} colorShift={11}/>
        <h4>Color Shift 2 (better)</h4>
        <Swatch className="vertical" {...clusterProps} colorShift={2}/>
        <h4>Color Shift 1</h4>
        <Swatch className="vertical" {...clusterProps} colorShift={1}/>
      </div>
      <OverlappingPreviewMultishift colorConfig={colorConfigNew}/>
      <h3>new yarn</h3>
      <div>
        <Swatch className="vertical" {...clusterProps} colorShift={10}/>
        <br/>
        <Swatch className="vertical" {...clusterProps} colorShift={2}/>
      </div>
      <OverlappingShawlPreview {...newShawlConfig}/>
      <br/>
      <h3>old yarn</h3>
        <Swatch className="vertical" {...oldClusterProps} colorShift={10}/>
        <br/>
        <Swatch className="vertical" {...oldClusterProps} colorShift={2}/>
      <OverlappingShawlPreview {...oldShawlConfig}/>
    </div>
  )
}
