import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LogoOption from './LogoOption'

describe('LogoOption', () => {
  it('renders the component with a swatch in it', () => {
    render(<LogoOption />)
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
