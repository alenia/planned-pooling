import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import StretchLengths from './StretchLengths'

describe('StretchLengths', () => {
  it('renders the StretchLengths component with a swatch in it', () => {
    render(
      <MemoryRouter >
        <StretchLengths />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
