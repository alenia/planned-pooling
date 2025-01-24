import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import ColorSequenceInfo from './ColorSequenceInfo'
import { totalColorSequenceLength } from './colorSequenceHelpers'
import { rowsTillMirrored } from './swatchHelpers'
import { StaggerType, SwatchConfig } from './types'
import './SwatchInfoPopover.scss'

function SwatchInfoPopover({swatchConfig, staggerType}  : {
  swatchConfig: SwatchConfig,
  staggerType: StaggerType,
}) {
  const [displayInfo, setDisplayInfo] = useState(false);

  const numStitches = swatchConfig.stitchesPerRow * swatchConfig.numberOfRows
  const numColorSequences = numStitches/totalColorSequenceLength(swatchConfig.colorSequence)

  return <div className="swatch-info-popover">
    { displayInfo ? (
      <div>
        <div className="info-heading">
          <span className="icon" onClick={() => setDisplayInfo(false)} >
            <FontAwesomeIcon icon={faXmark}/>
          </span>
        </div>
        <ColorSequenceInfo colorSequence={swatchConfig.colorSequence} colorShift={swatchConfig.colorShift}/>
        <p>In this swatch:</p>
        <pre>Number of stitches/clusters displayed (might be wrong with a stagger type): {numStitches}</pre>
        <pre>Number of {swatchConfig.colorSequence.length}-color color sequences displayed: {numColorSequences.toFixed(1)}</pre>
        <pre>Rows till mirrored: {rowsTillMirrored({...swatchConfig, staggerType})}</pre>
      </div>
    ) : (
      <div>
        <div className="info-heading clickable-info-heading" onClick={() => setDisplayInfo(true)} >
          <div>
            Show swatch info
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faPlus}/>
          </div>
        </div>
      </div>
    ) }
  </div>
}

export default SwatchInfoPopover;
