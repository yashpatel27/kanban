import { render, screen } from '@testing-library/react';
import Layout from './Layout';

test('renders Layout', () => {
  render(<Layout />);
  const linkElement = screen.getByText(/KANBAN DB APP/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
    render(<Layout />);
    const linkElement = screen.getByText(/KANBAN DB APP/i);
    expect(linkElement).toBeInTheDocument();
  });