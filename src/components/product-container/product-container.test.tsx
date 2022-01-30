import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockGuitar, mockState } from '../../utils/test-utils';
import * as Redux from 'react-redux';
import ProductContainer from './product-container';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <ProductContainer guitar={mockGuitar} />
    </Router>
  </Provider>
);

describe('Component: ProductContainer', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(mockGuitar.name)).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('should handle user events correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const characteristicsLink = screen.getByTestId('characteristics-link');
    const descriptionLink = screen.getByTestId('description-link');
    const fakeHandler = jest.fn();

    descriptionLink.onclick = fakeHandler;
    characteristicsLink.onclick = fakeHandler;

    userEvent.click(descriptionLink);
    expect(fakeHandler).toBeCalled();

    userEvent.click(characteristicsLink);

    expect(fakeHandler).toBeCalled();
  });
});
