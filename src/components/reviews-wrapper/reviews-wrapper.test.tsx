import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { mockGuitar } from '../../utils/test-utils';
import ReviewsWrapper from './reviews-wrapper';

const history = createMemoryHistory();

const fakeApp = (
  <Router history={history}>
    <ReviewsWrapper guitar={mockGuitar}/>
  </Router>
);

describe('Component: ReviewsWrapper', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });

  it('should handle user events correctly', () => {

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
  });
});
