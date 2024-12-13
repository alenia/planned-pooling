import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import PoolFade from './PoolFade'

describe('PoolFade', () => {
  it('renders the component with a swatch in it', () => {
    render(
      <MemoryRouter>
        <PoolFade />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toBeGreaterThan(1)
  })
})

