import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import Experimental from './Experimental'

describe('Experimental', () => {
  it('renders the StretchLengths component with a swatch in it', () => {
    render(
      <MemoryRouter >
        <Experimental />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
