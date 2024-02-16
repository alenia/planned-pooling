import Swatch from './swatch.jsx'

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
const hdcHatProps = { colorConfig, crowLength: 10, crows: 12, colorShift: 6, stitchPattern: 'hdc'}
const shellHatProps = { colorConfig, crowLength: 10, stitchPattern: 'shell'}
const rmr2Props = { colorConfig, crowLength: 10, stitchPattern: 'moss'}
const grannyPoolerProps = { colorConfig, crowLength: 10, stitchPattern: 'granny'}
const vstitchPoolerProps = { colorConfig, crowLength: 10, stitchPattern: 'v-stitch'}
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
      <h5>horizontal</h5>
      <Swatch {...basicProps} stitchPattern={stitchPattern}/>
      <h5>horizontal and staggered</h5>
      <Swatch {...basicProps} stitchPattern={stitchPattern} staggerLengths={true}/>
      <h5>vertical</h5>
      <Swatch {...basicProps} className="vertical" stitchPattern={stitchPattern}/>
      <h5>vertical and staggered</h5>
      <Swatch {...basicProps} className="vertical" stitchPattern={stitchPattern} staggerLengths={true}/>
    </div>
  )
}

export default function Preview() {
  return (
    <div>
      <h4>Testing color shift and crows</h4>
      <Swatch {...basicProps} crows={8}/>
      <Swatch {...basicProps} crows={8} colorShift={1}/>
      <StitchPatternPreview title="no stitch pattern"/>
      <StitchPatternPreview stitchPattern="moss"/>
      <StitchPatternPreview stitchPattern="hdc" notes="only working for vertical. Probably needs a rename, called hdc based on the amian hat"/>
      <StitchPatternPreview stitchPattern="granny"/>
      <StitchPatternPreview stitchPattern="shell"/>
      <StitchPatternPreview stitchPattern="v-stitch"/>
      <h4>jasmine</h4>
      <Swatch id="jasmine-pooler" {...jasminePoolerProps}/>
      <Swatch id="jasmine-pooler2" className="vertical" {...jasminePoolerProps}/>
      <h4>ripple</h4>
      <Swatch id="ripple-pooler" {...ripplePoolerProps}/>
      <Swatch id="ripple-pooler2" {...ripplePooler2Props}/>
      <Swatch id="ripple-pooler3" className="vertical" {...ripplePooler2Props}/>
      <h4>vstitch cluster</h4>
      <Swatch id="vstitch-cluster" {...vstitchClusterProps}/>
      <h4>angled block cluster</h4>
      <Swatch id="angled-block-cluster" {...angledBlockClusterProps}/>
      <Swatch id="angled-block-cluster2" className="vertical" {...angledBlockClusterProps}/>
    </div>
  )
}


