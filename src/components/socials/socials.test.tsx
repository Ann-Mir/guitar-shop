import { render, screen } from '@testing-library/react';
import Socials from './socials';

describe('Component: About', () => {
  it('should render correctly', () => {
    render(<Socials />);
    expect(screen
      .getByTestId('socials'))
      .toBeInTheDocument();
  });
});
