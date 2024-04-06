import { Fragment } from 'react'
import { totalColorSequenceLength, shiftedColorSequenceArray } from './color'
import { ColorSequenceArray } from './types'
import fontColorContrast from 'font-color-contrast';

function ColorSequenceInfo(
  { colorSequence, colorShift = 0}
  : {
    colorSequence: ColorSequenceArray,
    colorShift?: number,
  }
) {
  const shiftedColorSequence = shiftedColorSequenceArray(colorSequence, colorShift)
  return <Fragment>
    <div className="info-group">
      <div>
        <em>Shifted color sequence</em>:
      </div>
      <div>
        {shiftedColorSequence.map(({color, length}, index) => (
          <span
            key={`color${index}`}
            className='color-preview'
            style={ {
              background: color,
                color: fontColorContrast(color),
            }}
          >
            {length}
          </span>
        ))}
      </div>
    </div>
    <div className="info-group">
      <div><em>Total stitches in color sequence</em>:</div>
      <div>{totalColorSequenceLength(colorSequence)}</div>
    </div>
  </Fragment>
}

export default ColorSequenceInfo
