import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import Entrelac from './Entrelac'

describe('Entrelac', () => {
  it('renders the Entrelac component with a swatch in it', () => {
    render(
      <MemoryRouter >
        <Entrelac />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
