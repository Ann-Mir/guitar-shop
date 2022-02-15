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
import ModalCartDelete from './modal-cart-delete';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);
const fakeGuitar = mockCartGuitars[0];
const onClose = jest.fn();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <ModalCartDelete onClose={onClose} guitar={fakeGuitar} />
    </Router>
  </Provider>
);

describe('Component: ModalCartDelete', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });

  it('should close modal by close button click', () => {
    render(fakeApp);
    const closeButton = screen.getByTestId('modal-cart-delete-close');
    userEvent.click(closeButton);
    expect(onClose).toBeCalled();
  });

  it('should handle remove from cart', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const handleRemoveFromCartClick = jest.fn();

    render(fakeApp);
    const removeFromCartButton = screen.getByTestId('modal-remove-from-cart-button');
    removeFromCartButton.onclick = handleRemoveFromCartClick;

    userEvent.click(removeFromCartButton);
    expect(handleRemoveFromCartClick).toBeCalled();
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.RemoveItemFromCart,
      payload: {
        guitar: fakeGuitar,
      },
    });
    expect(onClose).toBeCalled();
  });
});
