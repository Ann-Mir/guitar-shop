import { render, screen } from '@testing-library/react';
import About from './about';

describe('Component: About', () => {
  it('should render correctly', () => {
    render(<About />);
    expect(screen
      .getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i))
      .toBeInTheDocument();
  });
});
