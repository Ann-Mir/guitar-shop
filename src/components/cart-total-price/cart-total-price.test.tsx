import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockState } from '../../utils/test-utils';
import CartTotalPrice from './cart-total-price';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <CartTotalPrice />
    </Router>
  </Provider>
);

describe('Component: CartTotalPrice', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
  });

  it('should handle post order button event', () => {

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const handlePostOrderButtonClick = jest.fn();

    const postOrderButton = screen.getByTestId('post-order-button');
    postOrderButton.onclick = handlePostOrderButtonClick;

    userEvent.click(postOrderButton);

    expect(handlePostOrderButtonClick).toBeCalled();
    expect(dispatch).toBeCalledTimes(1);
  });
});
