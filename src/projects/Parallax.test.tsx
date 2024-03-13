import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Parallax from './LogoOption'

describe('Parallax', () => {
  it('renders the component with a swatch in it', () => {
    render(<Parallax />)
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
