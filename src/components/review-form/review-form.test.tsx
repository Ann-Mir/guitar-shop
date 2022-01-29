import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { PostingStatus } from '../../const';
import { ActionType } from '../../types/action';
import { mockState } from '../../utils/test-utils';
import { mockGuitar } from '../../utils/test-utils';
import ReviewForm from './review-form';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);
const fakeGuitar = mockGuitar;
const fakeOnClose = jest.fn();

describe('Component: ReviewForm', () => {

  it('should render correctly', () => {

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm id={fakeGuitar.id} name={fakeGuitar.name} onClose={fakeOnClose} />
        </Router>
      </Provider>
    );

    render(fakeApp);
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.getByText('Недостатки')).toBeInTheDocument();
  });

  it('should render handle user input correctly', () => {

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm id={fakeGuitar.id} name={fakeGuitar.name} onClose={fakeOnClose} />
        </Router>
      </Provider>
    );

    render(fakeApp);
    const fakeName = 'Иван';
    const fakePros = 'Цена';
    const fakeDisadvantage = 'Струны';
    const fakeComment = 'Можно брать';

    const nameInput = screen.getByTestId('input-username');
    const prosInput = screen.getByTestId('input-pros');
    const disadvantagedInput = screen.getByTestId('input-disadv');
    const commentInput = screen.getByTestId('input-comment');

    userEvent.type(nameInput, fakeName);
    userEvent.type(prosInput, fakePros);
    userEvent.type(disadvantagedInput, fakeDisadvantage);
    userEvent.type(commentInput, fakeComment);

    expect(nameInput).toHaveDisplayValue(fakeName);
    expect(prosInput).toHaveDisplayValue(fakePros);
    expect(disadvantagedInput).toHaveDisplayValue(fakeDisadvantage);
    expect(commentInput).toHaveDisplayValue(fakeComment);
  });

  it('should render handle user events correctly', () => {

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm id={fakeGuitar.id} name={fakeGuitar.name} onClose={fakeOnClose} />
        </Router>
      </Provider>
    );

    render(fakeApp);
    const fakeName = 'Иван';
    const fakePros = 'Цена';
    const fakeDisadvantage = 'Струны';
    const fakeComment = 'Можно брать';

    const nameInput = screen.getByTestId('input-username');
    const startsInput = screen.getByTestId('comment-rating-input');
    const prosInput = screen.getByTestId('input-pros');
    const disadvantagedInput = screen.getByTestId('input-disadv');
    const commentInput = screen.getByTestId('input-comment');
    const submitButton = screen.getByTestId('send-review-button');

    userEvent.type(nameInput, fakeName);
    userEvent.type(prosInput, fakePros);
    userEvent.click(startsInput);
    userEvent.type(disadvantagedInput, fakeDisadvantage);
    userEvent.type(commentInput, fakeComment);
    userEvent.click(submitButton);

    expect(dispatch).toBeCalledTimes(2);

    expect(dispatch).nthCalledWith(1, {
      type: ActionType.SetPostingStatus,
      payload: {postingStatus: PostingStatus.Posting},
    });
  });
});
