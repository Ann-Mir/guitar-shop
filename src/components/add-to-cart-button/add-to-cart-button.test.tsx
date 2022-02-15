import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockCartGuitars, mockState } from '../../utils/test-utils';
import AddToCartButton from './add-to-cart-button';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);
const fakeGuitar = mockCartGuitars[0];
const fakeOnSuccess = jest.fn();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <AddToCartButton guitar={fakeGuitar} onSuccess={fakeOnSuccess}>
        Добавить
      </AddToCartButton>
    </Router>
  </Provider>
);

describe('Component: AddToCartButton', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument();
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  it('should handle add to cart click', () => {
    const handleAddToCardClick = jest.fn();

    render(fakeApp);
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    addToCartButton.onclick = handleAddToCardClick;

    userEvent.click(addToCartButton);
    expect(handleAddToCardClick).toBeCalled();
  });
});
