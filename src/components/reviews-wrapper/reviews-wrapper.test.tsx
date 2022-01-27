import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { mockGuitar, mockState } from '../../utils/test-utils';
import ReviewsWrapper from './reviews-wrapper';


const mockStore = configureMockStore([thunk]);

const store = mockStore(mockState);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <ReviewsWrapper guitar={mockGuitar}/>
    </Router>
  </Provider>
);

describe('Component: ReviewsWrapper', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });

  it('should handle user events correctly', () => {

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const showMoreButton = screen.getByTestId('show-more-button');
    const fakeHandler = jest.fn();

    showMoreButton.onclick = fakeHandler;

    userEvent.click(showMoreButton);
    expect(fakeHandler).toBeCalled();

    const upButton = screen.getByTestId('up-button');
    const fakeUpButtonHandler = jest.fn();

    upButton.onclick = fakeUpButtonHandler;

    userEvent.click(upButton);
    expect(fakeUpButtonHandler).toBeCalled();
    expect(dispatch).toBeCalledTimes(0);
  });
});
