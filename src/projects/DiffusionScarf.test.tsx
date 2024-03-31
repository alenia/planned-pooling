import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import DiffusionScarf from './DiffusionScarf'

describe('DiffusionScarf', () => {
  it('renders the component with a swatch in it', () => {
    render(
      <MemoryRouter>
        <DiffusionScarf />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toBeGreaterThan(1)
  })
})

