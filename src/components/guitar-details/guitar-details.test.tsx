import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { mockGuitar } from '../../utils/test-utils';
import * as Redux from 'react-redux';
import GuitarDetails from './guitar-details';

const history = createMemoryHistory();

const fakeApp = (
  <Router history={history}>
    <GuitarDetails guitar={mockGuitar}/>
  </Router>
);

describe('Component: GuitarDetails', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
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
