import PropTypes from "prop-types";
import Swatch from '../Swatch.jsx'

const yellow = "#faf619";
const red = "#fa1933";
const confetti = "#c6f5f2";
const colorConfigScarf2 = [
  {color: red, length: 6},
  {color: yellow, length: 2},
  {color: confetti, length: 8},
  {color: yellow, length: 2},
]

const colorConfig = [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#EEEEFF", length: 13},
]

const basicProps = { colorConfig, crowLength: 10}
const jasminePoolerProps = { colorConfig, crowLength: 11, stitchPattern: 'jasmine' }
const ripplePoolerProps = { colorConfig, crowLength: 3, stitchPattern: 'ripple' }
const ripplePooler2Props = { colorConfig, crowLength: 4, stitchPattern: 'ripple' }
const vstitchClusterProps = { colorConfig: colorConfigScarf2, crowLength: 12, stitchPattern: 'vstitchCluster' }
const angledBlockClusterProps = { colorConfig, crowLength: 3, stitchPattern: 'ablockCluster' }

function StitchPatternPreview({stitchPattern, notes, title}) {
  return (
    <div>
      <h4>{title || stitchPattern}</h4>
      {notes ? <p>{notes}</p> : ''}
      <Swatch className="numbered" {...basicProps} stitchPattern={stitchPattern}/>
      <h5>staggered</h5>
      <Swatch className="numbered" {...basicProps} stitchPattern={stitchPattern} staggerLengths={true}/>
    </div>
  )
}

StitchPatternPreview.propTypes = {
  stitchPattern: PropTypes.string, //TODO kinda a enum but I should move that enum into a different type file
  notes: PropTypes.string,
  title: PropTypes.string,
}

export default function Preview() {
  return (
    <div>
      <h4>Testing color shift and crows</h4>
      <Swatch {...basicProps} crows={8}/>
      <Swatch {...basicProps} crows={8} colorShift={1}/>
      <StitchPatternPreview title="no stitch pattern"/>
      <StitchPatternPreview stitchPattern="stacked"/>
      <StitchPatternPreview stitchPattern="moss"/>
      <StitchPatternPreview stitchPattern="hdc" notes="Probably needs a rename, called hdc based on the amian hat"/>
      <StitchPatternPreview stitchPattern="granny"/>
      <StitchPatternPreview stitchPattern="shell"/>
      <StitchPatternPreview stitchPattern="v-stitch"/>
      <h4>jasmine</h4>
      <Swatch className="numbered" {...jasminePoolerProps}/>
      <h4>ripple</h4>
      <Swatch {...ripplePoolerProps}/>
      <Swatch {...ripplePooler2Props}/>
      <h4>vstitch cluster</h4>
      <Swatch {...vstitchClusterProps}/>
      <h4>angled block cluster</h4>
      <Swatch {...angledBlockClusterProps}/>
    </div>
  )
}


