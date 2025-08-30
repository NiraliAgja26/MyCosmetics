import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders navbar brand', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const brandElement = screen.getByText(/Cosmetics Shop/i);
  expect(brandElement).toBeInTheDocument();
});
