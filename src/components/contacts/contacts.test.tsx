import { render, screen } from '@testing-library/react';
import Contacts from './contacts';

describe('Component: Contacts', () => {
  it('should render correctly', () => {
    render(<Contacts />);
    expect(screen
      .getByText(/Контакты/i))
      .toBeInTheDocument();
    expect(screen
      .getByText(/8-812-500-50-50/i))
      .toBeInTheDocument();
    expect(screen
      .getByText(/Режим работы:/i))
      .toBeInTheDocument();
  });
});
