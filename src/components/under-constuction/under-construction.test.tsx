import { render, screen } from '@testing-library/react';
import UnderConstruction from './under-construction';

describe('Component: UnderConstruction', () => {
  it('should render correctly', () => {
    render(<UnderConstruction />);
    expect(screen
      .getByText('Cтраница в разработке. Перейдите на страницу каталога.'))
      .toBeInTheDocument();
  });
});
