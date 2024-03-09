import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Doodle from './Doodle'

describe('Doodle', () => {
  it('renders the component with a swatch in it', () => {
    render(<Doodle />)
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
