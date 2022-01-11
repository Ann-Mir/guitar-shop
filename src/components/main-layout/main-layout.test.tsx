import { render, screen } from '@testing-library/react';
import MainLayout from './main-layout';

describe('Component: MainLayout', () => {
  it('should render correctly', () => {
    render(
      <MainLayout>
        <p>test</p>
      </MainLayout>,
    );
    expect(screen
      .getByText(/test/i))
      .toBeInTheDocument();
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });
});
