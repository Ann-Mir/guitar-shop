import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { mockState } from '../../utils/test-utils';
import CartLink from './cart-link';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

describe('Component: CartLink', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history} >
          <CartLink />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('cart-link')).toBeInTheDocument();
  });
});
