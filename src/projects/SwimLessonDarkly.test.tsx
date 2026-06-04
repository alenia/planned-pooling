import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import SwimLessonDarkly from './SwimLessonDarkly'

describe('SwimLessonDarkly', () => {
  it('renders the component with a swatch in it', () => {
    render(
      <MemoryRouter>
        <SwimLessonDarkly />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toBeGreaterThan(1)
  })
})

