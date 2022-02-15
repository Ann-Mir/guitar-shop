import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockCartGuitars, mockState } from '../../utils/test-utils';
import CartItemsList from './cart-items-list';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <CartItemsList />
    </Router>
  </Provider>
);

describe('Component: CartItemList', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getAllByTestId('cart-item')).toHaveLength(mockCartGuitars.length);
  });
});
