import { render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from './footer';

const history = createBrowserHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>);
    expect(screen
      .getByTestId('footer'))
      .toBeInTheDocument();
  });
});
