import { ColorSequenceArray, StitchPattern } from '../types'
import Swatch from '../Swatch'

const purple = "#C274B3";
const teal = "#4ECDC4";
const brown = "#967527";
const orange = "#f0ab0a";

const colorSequenceNew : ColorSequenceArray = [
  { color: purple, length: 6 },
  { color: teal, length: 2 },
  { color: orange, length: 2 }, 
  { color: brown, length: 3 }, 
  { color: orange, length: 2 }, 
  { color: teal, length: 2 },
]
const colorSequenceOld : ColorSequenceArray = [
  { color: purple, length: 5 },
  { color: teal, length: 2 },
  { color: orange, length: 2 }, 
  { color: brown, length: 4 }, 
  { color: orange, length: 2 }, 
  { color: teal, length: 2 },
]


function OverlappingShawlPreview({colorSequence, colorShiftA, colorShiftB} : { colorSequence: ColorSequenceArray, colorShiftA: number, colorShiftB: number} ) {
  const clusterProps = { colorSequence, crows: 5, crowLength: 17, stitchPattern: StitchPattern.ablockCluster }
  return (
    <div className="overlapping-container">
      <Swatch {...clusterProps} colorShift={colorShiftA}/>
      <Swatch className="mirrored" {...clusterProps} colorShift={colorShiftB}/>
      <Swatch {...clusterProps} colorShift={colorShiftA}/>
      <Swatch className="mirrored" {...clusterProps} colorShift={colorShiftB}/>
      <Swatch {...clusterProps} colorShift={colorShiftA}/>
      <Swatch className="mirrored" {...clusterProps} colorShift={colorShiftB}/>
    </div>
  )
}

function OverlappingPreviewMultishift({colorSequence} : { colorSequence: ColorSequenceArray }) {
  const clusterProps = { colorSequence, crows: 5, crowLength: 17, stitchPattern: StitchPattern.ablockCluster }
  return (
    <div className="overlapping-container">
      <Swatch {...clusterProps} colorShift={11}/>
      <Swatch className="mirrored" {...clusterProps} colorShift={1}/>
      <Swatch {...clusterProps} colorShift={10}/>
      <Swatch className="mirrored" {...clusterProps} colorShift={2}/>
      <Swatch {...clusterProps} colorShift={11}/>
      <Swatch className="mirrored" {...clusterProps} colorShift={1}/>
      <Swatch {...clusterProps} colorShift={10}/>
      <Swatch className="mirrored" {...clusterProps} colorShift={2}/>
    </div>
  )
}

const newShawlConfig = { colorSequence: colorSequenceNew, colorShiftA: 10, colorShiftB: 2}
const oldShawlConfig = { colorSequence: colorSequenceOld, colorShiftA: 10, colorShiftB: 2}
const clusterProps = { colorSequence: colorSequenceNew, crows: 2, crowLength: 17, stitchPattern: StitchPattern.ablockCluster }
const oldClusterProps = { colorSequence: colorSequenceOld, crows: 2, crowLength: 17, stitchPattern: StitchPattern.ablockCluster }
export default function Sunflower() {
  return (
    <div>
      <div>
        <h4>Color Shift 10 (better)</h4>
        <Swatch {...clusterProps} colorShift={10}/>
        <h4>Color Shift 11</h4>
        <Swatch {...clusterProps} colorShift={11}/>
        <h4>Color Shift 2 (better)</h4>
        <Swatch {...clusterProps} colorShift={2}/>
        <h4>Color Shift 1</h4>
        <Swatch {...clusterProps} colorShift={1}/>
      </div>
      <OverlappingPreviewMultishift colorSequence={colorSequenceNew}/>
      <h3>new yarn</h3>
      <div>
        <Swatch {...clusterProps} colorShift={10}/>
        <br/>
        <Swatch {...clusterProps} colorShift={2}/>
      </div>
      <OverlappingShawlPreview {...newShawlConfig}/>
      <br/>
      <h3>old yarn</h3>
        <Swatch {...oldClusterProps} colorShift={10}/>
        <br/>
        <Swatch {...oldClusterProps} colorShift={2}/>
      <OverlappingShawlPreview {...oldShawlConfig}/>
    </div>
  )
}
