import { totalColorSequenceLength, shiftedColorSequenceArray } from './colorHelpers'
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
  return <section> {/* todo: this should be a div but I need to change styling of divs in fieldsets*/}
    <pre>total color sequence length: {totalColorSequenceLength(colorSequence)}</pre>
    <pre>shifted color sequence: 
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
    </pre>
  </section>
}

export default ColorSequenceInfo
