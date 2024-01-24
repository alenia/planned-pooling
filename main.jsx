import './style.scss'
import Swatch, { buildSwatch } from './swatch.jsx'
import { createRoot } from 'react-dom/client';

const orange = "#fcd67c";
const cream = "#fcf7eb";
const blue = "#cff7fc";
const colorConfigHatSC = [
  {color: orange, length: 5},
  {color: cream, length: 4},
  {color: orange, length: 5},
  {color: blue, length: 5},
  {color: cream, length: 4},
  {color: blue, length: 5},
]
const colorConfigHatHDC = [
  {color: orange, length: 4},
  {color: cream, length: 3},
  {color: orange, length: 4},
  {color: blue, length: 3},
  {color: cream, length: 3},
  {color: blue, length: 3},
]
const colorConfigHatShell = [
  {color: orange, length: 1},
  {color: cream, length: 1},
  {color: orange, length: 1},
  {color: blue, length: 1},
  {color: cream, length: 1},
  {color: blue, length: 1},
]


const yellow = "#faf619";
const red = "#fa1933";
const confetti = "#c6f5f2";
const colorConfigScarf1 = [
  {color: yellow, length: 2},
  {color: red, length: 6},
  {color: yellow, length: 2},
  {color: confetti, length: 7},
]
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
  {color: "#EEEEEE", length: 13},
]

const hdcHat3Props = { colorConfig: colorConfigHatHDC, crowLength: 39, crows: 12, colorShift: 8, staggerLengths: true, stitchPattern: 'hdc'}
const hdcHat4Props = { colorConfig: colorConfigHatHDC, crowLength: 39, crows: 12, colorShift: 18, staggerLengths: true, stitchPattern: 'hdc'}
const shellHatProps = { colorConfig: colorConfigHatShell, crowLength: 11, stitchPattern: 'shell'}
const shellHat2Props = { colorConfig: colorConfigHatShell, crowLength: 11, stitchPattern: 'shell'}
const rmr1Props = { colorConfig: colorConfigScarf1, crowLength: 25, crows: 36, stitchPattern: 'moss'}
const rmr2Props = { colorConfig: colorConfigScarf2, crowLength: 18, stitchPattern: 'moss'}
const grannyPoolerProps = { colorConfig, crowLength: 10, stitchPattern: 'granny'}
const grannyPooler2Props = { colorConfig, crowLength: 10, stitchPattern: 'granny'}
const vstitchPoolerProps = { colorConfig, crowLength: 10, stitchPattern: 'v-stitch'}
const vstitchPooler2Props = { colorConfig, crowLength: 10, stitchPattern: 'v-stitch'}
const jasminePoolerProps = { colorConfig, crowLength: 11, stitchPattern: 'jasmine' }
const jasminePooler2Props = { colorConfig, crowLength: 11, stitchPattern: 'jasmine' }
const ripplePoolerProps = { colorConfig, crowLength: 3, stitchPattern: 'ripple' }
const ripplePooler2Props = { colorConfig, crowLength: 4, stitchPattern: 'ripple' }
const ripplePooler3Props = { colorConfig, crowLength: 4, stitchPattern: 'ripple' }
const vstitchClusterProps = { colorConfig: colorConfigScarf2, crowLength: 12, stitchPattern: 'vstitchCluster' }
const angledBlockClusterProps = { colorConfig, crowLength: 3, stitchPattern: 'ablockCluster' }
const angledBlockCluster2Props = { colorConfig, crowLength: 3, stitchPattern: 'ablockCluster' }

const root = createRoot(document.getElementById('app'));
root.render(
  <div>
  <p>Hello Adjust the variables in order to preview what your planned pooling pattern could look like with different row lengths</p>
  <Swatch id="hdc-hat" className="vertical" colorConfig={colorConfigHatSC} crowLength={29} stitchPattern='stacked'/>
  <Swatch id="hdc-hat2" className="vertical" colorConfig={colorConfigHatHDC} crowLength={39} crows={12} colorShift={6} staggerLengths={true} stitchPattern='hdc'/>
  <Swatch id="hdc-hat3" className="vertical" {...hdcHat3Props}/>
  <Swatch id="hdc-hat4" className="vertical" {...hdcHat4Props}/>
  <Swatch id="shell-hat" {...shellHatProps}/>
  <Swatch id="shell-hat2" className="vertical" {...shellHat2Props}/>
  <Swatch id="rmr1" {...rmr1Props}/>
  <Swatch id="rmr2" className="vertical" {...rmr2Props}/>
  <Swatch id="vstitch-pooler" {...vstitchPoolerProps}/>
  <Swatch id="vstitch-pooler2" className="vertical" {...vstitchPooler2Props}/>
  <Swatch id="granny-pooler" {...grannyPoolerProps}/>
  <Swatch id="granny-pooler2" className="vertical" {...grannyPooler2Props}/>
  <Swatch id="jasmine-pooler" {...jasminePoolerProps}/>
  <Swatch id="jasmine-pooler2" className="vertical" {...jasminePooler2Props}/>
  <Swatch id="ripple-pooler" {...ripplePoolerProps}/>
  <Swatch id="ripple-pooler2" {...ripplePooler2Props}/>
  <Swatch id="ripple-pooler3" className="vertical" {...ripplePooler3Props}/>
  <Swatch id="vstitch-cluster" {...vstitchClusterProps}/>
  <Swatch id="angled-block-cluster" {...angledBlockClusterProps}/>
  <Swatch id="angled-block-cluster2" className="vertical" {...angledBlockCluster2Props}/>
</div>)

