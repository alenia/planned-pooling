import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import DoloresParkTote from './DoloresParkTote'

describe('DoloresParkTote', () => {
  it('renders the component with a swatch in it', () => {
    render(
      <MemoryRouter>
        <DoloresParkTote />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})

