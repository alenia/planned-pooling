import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import SwimLesson from './SwimLesson'

describe('SwimLesson', () => {
  it('renders the component with a swatch in it', () => {
    render(
      <MemoryRouter>
        <SwimLesson />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})

