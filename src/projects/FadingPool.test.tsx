import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import FadingPool from './FadingPool'

describe('FadingPool', () => {
  it('renders the component with a swatch in it', () => {
    render(
      <MemoryRouter>
        <FadingPool />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toBeGreaterThan(1)
  })
})

