import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the App component with a swatch in it', () => {
    const { container } = render(<App />)
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
