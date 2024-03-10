import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import App from './App'

describe('App', () => {
  it('renders the App component with a swatch in it', () => {
    render(
      <MemoryRouter >
        <App />
      </MemoryRouter>
    )
    expect(screen.getAllByTestId("swatch").length).toEqual(1)
  })
})
