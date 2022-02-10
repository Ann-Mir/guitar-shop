import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockState } from '../../utils/test-utils';
import Cart from './cart';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Cart />
    </Router>
  </Provider>
);

describe('Component: Cart', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('cart')).toBeInTheDocument();
  });
});
