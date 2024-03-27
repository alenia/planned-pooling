import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DoloresParkTote from './DoloresParkTote'

describe('DoloresParkTote', () => {
  it('renders the component with a swatch in it', () => {
    render(<DoloresParkTote />)
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})

