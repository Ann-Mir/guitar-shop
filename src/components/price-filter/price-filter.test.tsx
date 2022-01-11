import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { ActionType } from '../../types/action';
import PriceFilter from './price-filter';
import { mockState } from '../../utils/test-utils';
import * as Redux from 'react-redux';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <PriceFilter />
    </Router>
  </Provider>
);

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId('price-filter')).toBeInTheDocument();
    expect(screen.getByTestId('min-price-input')).toHaveAttribute('placeholder', '1700');
    expect(screen.getByTestId('max-price-input')).toHaveAttribute('placeholder', '35000');
  });

  it('should handle min and max price inputs correctly', () => {

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const minPriceInput = screen.getByTestId('min-price-input');
    const maxPriceInput = screen.getByTestId('max-price-input');
    const minBlurHandler = jest.fn();
    const maxBlurHandler = jest.fn();

    minPriceInput.onblur = minBlurHandler;
    maxPriceInput.onblur = maxBlurHandler;

    userEvent.type(minPriceInput, '1900');

    expect(minPriceInput).toHaveDisplayValue('1900');

    userEvent.click(maxPriceInput);
    expect(minBlurHandler).toBeCalled();
    expect(dispatch).toBeCalledTimes(1);

    expect(dispatch).nthCalledWith(1, {
      type: ActionType.ResetPagination,
    });

    userEvent.type(maxPriceInput, '30000');
    expect(maxPriceInput).toHaveDisplayValue('30000');

    userEvent.click(minPriceInput);
    expect(maxBlurHandler).toBeCalled();
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).nthCalledWith(2, {
      type: ActionType.ResetPagination,
    });
  });
});
