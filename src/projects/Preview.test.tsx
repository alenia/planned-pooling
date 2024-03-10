import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Preview from './Preview'

describe('Preview', () => {
  it('renders the component with a swatch in it', () => {
    render(<Preview />)
    expect(screen.getAllByTestId("swatch").length).toBeGreaterThan(1)
  })
})

