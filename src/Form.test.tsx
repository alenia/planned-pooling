import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StitchPattern, SwatchConfig, ColorSequenceArray } from './types'
import Form from './Form'

const basicSwatchConfig = {
  colorSequence: [
    {color: '#f00', length: 3},
    {color: '#0f0', length: 2},
  ] as ColorSequenceArray,
  stitchesPerRow: 5,
  numberOfRows: 4,
  colorShift: 0,
  staggerLengths: false,
  stitchPattern: StitchPattern.moss
} as SwatchConfig

describe('Form', () => {
  it('renders the form', () => {
    render(
      <Form
        swatchData={basicSwatchConfig}
        setSwatchData={() => {}}
        staggerType='normal'
        showExperimentalFeatures={false}
      />
    )

    //TODO: I hate this assertion just want to get a test up.
    expect(screen.getAllByRole("spinbutton").length).toEqual(5)
  })
})

