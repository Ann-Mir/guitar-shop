import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { ActionType } from '../../types/action';
import { mockCartGuitars, mockState } from '../../utils/test-utils';
import ModalAddToCart from './modal-add-to-cart';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);
const fakeGuitar = mockCartGuitars[0];
const onSuccess = jest.fn();
const onClose = jest.fn();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <ModalAddToCart guitar={fakeGuitar} onClose={onClose} onSuccess={onSuccess} />
    </Router>
  </Provider>
);

describe('Component: ModalAddToCart', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('should close modal by close button click', () => {
    render(fakeApp);
    const closeButton = screen.getByTestId('modal-add-to-cart-close');
    userEvent.click(closeButton);
    expect(onClose).toBeCalled();
  });

  it('should handle add to cart', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const handleAddToCartClick = jest.fn();

    render(fakeApp);
    const addToCartButton = screen.getByTestId('modal-add-to-cart-button');
    addToCartButton.onclick = handleAddToCartClick;

    userEvent.click(addToCartButton);
    expect(handleAddToCartClick).toBeCalled();
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.AddToCart,
      payload: {
        guitar: fakeGuitar,
      },
    });
    expect(onSuccess).toBeCalled();
  });
});
