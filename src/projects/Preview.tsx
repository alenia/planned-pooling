import Swatch from '../Swatch'
import { StitchPattern, ColorSequenceArray, Color, StaggerType } from '../types'

const yellow : Color = "#faf619";
const red : Color = "#fa1933";
const confetti : Color= "#c6f5f2";
const colorSequenceScarf2 : ColorSequenceArray = [
  {color: red, length: 6},
  {color: yellow, length: 2},
  {color: confetti, length: 8},
  {color: yellow, length: 2},
]

const colorSequence : ColorSequenceArray = [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#EEEEFF", length: 13},
] 

const basicProps = { colorSequence, stitchesPerRow: 10}
const jasminePoolerProps = { colorSequence, stitchesPerRow: 11, stitchPattern: StitchPattern.jasmine }
const ripplePoolerProps = { colorSequence, stitchesPerRow: 3, stitchPattern: StitchPattern.ripple }
const ripplePooler2Props = { colorSequence, stitchesPerRow: 4, stitchPattern: StitchPattern.ripple }
const vstitchClusterProps = { colorSequence: colorSequenceScarf2, stitchesPerRow: 12, stitchPattern: StitchPattern.vstitchCluster }
const angledBlockClusterProps = { colorSequence, stitchesPerRow: 3, stitchPattern: StitchPattern.ablockCluster }

function StitchPatternPreview({stitchPattern, notes, title} : { stitchPattern: StitchPattern, notes?: string, title?: string }) {
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

export default function Preview() {
  return (
    <div>
      <h4>Testing color shift</h4>
      <Swatch {...basicProps} stitchPattern={StitchPattern.unstyled} numberOfRows={8}/>
      <Swatch {...basicProps} stitchPattern={StitchPattern.unstyled} numberOfRows={8} colorShift={1}/>
      <h4>Testing color stretching and swallowing</h4>
      <h5>unstyled normal, swallowed, stretched</h5>
      <Swatch {...basicProps} stitchPattern={StitchPattern.unstyled} staggerLengths={true} numberOfRows={8}/>
      <Swatch {...basicProps} stitchPattern={StitchPattern.unstyled} staggerLengths={true} staggerType={StaggerType.colorSwallowed} numberOfRows={8}/>
      <Swatch {...basicProps} stitchPattern={StitchPattern.unstyled} staggerLengths={true} staggerType={StaggerType.colorStretched} numberOfRows={8}/>
      <h5>moss normal, swallowed, stretched</h5>
      <Swatch {...basicProps} stitchPattern={StitchPattern.moss} staggerLengths={true} numberOfRows={8}/>
      <Swatch {...basicProps} stitchPattern={StitchPattern.moss} staggerLengths={true} staggerType={StaggerType.colorSwallowed} numberOfRows={8}/>
      <Swatch {...basicProps} stitchPattern={StitchPattern.moss} staggerLengths={true} staggerType={StaggerType.colorStretched} numberOfRows={8}/>

      <StitchPatternPreview stitchPattern={StitchPattern.unstyled} title="unstyled stitch pattern"/>
      <StitchPatternPreview stitchPattern={StitchPattern.stacked}/>
      <StitchPatternPreview stitchPattern={StitchPattern.moss}/>
      <StitchPatternPreview stitchPattern={StitchPattern.compactMoss}/>
      <StitchPatternPreview stitchPattern={StitchPattern.hdc} notes="Probably needs a rename, called hdc based on the amian hat"/>
      <StitchPatternPreview stitchPattern={StitchPattern.granny}/>
      <StitchPatternPreview stitchPattern={StitchPattern.shell} />
      <StitchPatternPreview stitchPattern={StitchPattern.vStitch} />
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


