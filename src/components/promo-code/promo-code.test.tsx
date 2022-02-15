import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockState } from '../../utils/test-utils';
import PromoCode from './promo-code';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <PromoCode />
    </Router>
  </Provider>
);

describe('Component: PromoCode', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });

  it('should submit form', () => {

    render(fakeApp);

    const handlePostPromoButtonClick = jest.fn();

    const postPromoButton = screen.getByTestId('apply-promo-button');
    const promoInput = screen.getByTestId('promo-input');
    postPromoButton.onclick = handlePostPromoButtonClick;

    userEvent.type(promoInput, 'medium-444');
    userEvent.click(postPromoButton);

    expect(promoInput).toHaveDisplayValue('medium-444');
    expect(handlePostPromoButtonClick).toBeCalled();
  });
});
