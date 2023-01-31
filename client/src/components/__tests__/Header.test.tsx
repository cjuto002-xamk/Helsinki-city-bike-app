import { render, screen } from '@testing-library/react'
import Header from '../Header'
import { MemoryRouter } from 'react-router-dom'

test('Header component renders correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    
    const headerText = screen.getByText(/Helsinki bike journeys app/i)
    const homeButton = screen.getByText(/Home/i)
    const journeysButton = screen.getByRole('button', { name: /Journeys/i })
    const stationsButton = screen.getByText(/Stations/i)
  
    expect(headerText).toBeDefined()
    expect(homeButton).toBeDefined()
    expect(journeysButton).toBeDefined()
    expect(stationsButton).toBeDefined()
  })