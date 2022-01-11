import { render, screen } from '@testing-library/react';
import UnderConstructionPage from './under-construction-page';

describe('Component: UnderConstructionPage', () => {
  it('should render correctly', () => {
    render(<UnderConstructionPage />);
    expect(screen
      .getByText('Cтраница в разработке. Перейдите на страницу каталога.'))
      .toBeInTheDocument();
  });
});

