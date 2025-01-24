import ColorSequenceInfo from './ColorSequenceInfo'
import { totalColorSequenceLength } from './colorSequenceHelpers'
import { StaggerType, SwatchConfig } from './types'
import './SwatchInfoPopover.scss'

function SwatchInfoPopover({swatchConfig, staggerType}  : {
  swatchConfig: SwatchConfig,
  staggerType?: StaggerType,
}) {
  const numStitches = swatchConfig.stitchesPerRow * swatchConfig.numberOfRows
  const numColorSequences = numStitches/totalColorSequenceLength(swatchConfig.colorSequence)

  return <div className="swatch-info-popover">
    <ColorSequenceInfo colorSequence={swatchConfig.colorSequence} colorShift={swatchConfig.colorShift}/>
    <p>In this swatch:</p>
    <pre>Number of stitches/clusters displayed (might be wrong with a stagger type): {numStitches}</pre>
    <pre>Number of {swatchConfig.colorSequence.length}-color color sequences displayed: {numColorSequences.toFixed(1)}</pre>
  </div>
}

export default SwatchInfoPopover;
