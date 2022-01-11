import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import CartLink from './cart-link';

const history = createMemoryHistory();

describe('Component: CartLink', () => {

  it('should render correctly', () => {
    render(
      <Router history={history} >
        <CartLink />
      </Router>,
    );

    expect(screen.getByTestId('cart-link')).toBeInTheDocument();
  });
});
