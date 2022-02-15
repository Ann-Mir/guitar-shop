import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockState } from '../../../utils/test-utils';
import CartPage from './cart-page';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <CartPage />
    </Router>
  </Provider>
);

describe('Component: CartPage', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Корзина')).toBeInTheDocument();
    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
  });
});
