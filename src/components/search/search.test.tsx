import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { ActionType } from '../../types/action';
import Search from './search';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const mockState = {
  SEARCH: {
    guitars: [],
  },
};
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Search />
    </Router>
  </Provider>
);

render(fakeApp);

describe('Component: Search', () => {
  it('should render correctly', () => {
    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });

  it('should handle user input', () => {

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'a');
    expect(searchInput).toHaveDisplayValue('a');

    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.LoadSearchResults,
      payload: {
        guitars: [],
      },
    });
  });
});
