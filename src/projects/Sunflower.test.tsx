import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Sunflower from './Sunflower'

describe('Sunflower', () => {
  it('renders the component with a swatch in it', () => {
    render(<Sunflower />)
    expect(screen.getAllByTestId("swatch").length).toBeGreaterThan(1)
  })
})

