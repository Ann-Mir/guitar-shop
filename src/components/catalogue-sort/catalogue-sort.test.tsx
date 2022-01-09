import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import CatalogueSort from './catalogue-sort';
import { mockState } from '../../test-utils';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <CatalogueSort />
    </Router>
  </Provider>
);

describe('Component: CatalogueSort', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
  it('should handle user events correctly', () => {

    render(fakeApp);
    const priceSortBtn = screen.getByTestId('price-sort');
    const ratingSortBtn = screen.getByTestId('rating-sort');
    const orderUpBtn = screen.getByTestId('order-up');
    const orderDownBtn = screen.getByTestId('order-down');

    const fakeHandler = jest.fn();
    priceSortBtn.onclick = fakeHandler;
    ratingSortBtn.onclick = fakeHandler;
    orderUpBtn.onclick = fakeHandler;
    priceSortBtn.onclick = fakeHandler;

    userEvent.click(priceSortBtn);
    expect(priceSortBtn).toHaveClass('catalog-sort__type-button--active');
    expect(ratingSortBtn).not.toHaveClass('catalog-sort__type-button--active');
    expect(fakeHandler).toBeCalled();

    userEvent.click(ratingSortBtn);
    expect(ratingSortBtn).toHaveClass('catalog-sort__type-button--active');
    expect(priceSortBtn).not.toHaveClass('catalog-sort__type-button--active');
    expect(fakeHandler).toBeCalled();

    userEvent.click(orderUpBtn);
    expect(orderUpBtn).toHaveClass('catalog-sort__order-button--active');
    expect(orderDownBtn).not.toHaveClass('catalog-sort__order-button--active');
    expect(fakeHandler).toBeCalled();

    userEvent.click(orderDownBtn);
    expect(orderDownBtn).toHaveClass('catalog-sort__order-button--active');
    expect(orderUpBtn).not.toHaveClass('catalog-sort__order-button--active');
    expect(fakeHandler).toBeCalled();
  });
});
