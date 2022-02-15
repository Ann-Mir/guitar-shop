import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockCartGuitars, mockState } from '../../utils/test-utils';
import CartItem from './cart-item';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);
const fakeGuitar = mockCartGuitars[0];

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <CartItem guitar={fakeGuitar} />
    </Router>
  </Provider>
);

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should delete item from cart on delete', () => {
    const handleRemoveButtonClick = jest.fn();

    render(fakeApp);
    const deleteButton = screen.getByTestId('delete-from-cart-button');
    deleteButton.onclick = handleRemoveButtonClick;

    userEvent.click(deleteButton);
    expect(handleRemoveButtonClick).toBeCalled();
  });
});
