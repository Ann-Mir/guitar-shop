import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import ModalSuccessAdd from './modal-success-add';

const history = createBrowserHistory();
const onClose = jest.fn();

const fakeApp = (
  <Router history={history}>
    <ModalSuccessAdd onClose={onClose} />
  </Router>
);

describe('Component: ModalSuccessAdd', () => {
  it('should render correctly', () => {

    render(fakeApp);
    expect(screen
      .getByText('Товар успешно добавлен в корзину'))
      .toBeInTheDocument();
  });

  it('should close upon close button click', () => {

    render(fakeApp);
    const closeButton = screen.getByTestId('modal-success-add-close');
    userEvent.click(closeButton);
    expect(onClose).toBeCalled();
  });

  it('should handle redirect to Cart button click', () => {

    render(fakeApp);

    const handleToCartClick = jest.fn();
    const toCartButton = screen.getByTestId('modal-success-add-to-cart');
    toCartButton.onclick = handleToCartClick;
    userEvent.click(toCartButton);
    expect(handleToCartClick).toBeCalled();
    expect(onClose).toBeCalled();
  });
});
