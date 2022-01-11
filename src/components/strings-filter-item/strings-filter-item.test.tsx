import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import StringsFilterItem from './strings-filter-item';
import { mockState } from '../../utils/test-utils';
import * as Redux from 'react-redux';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <StringsFilterItem stringsCount={6} />
    </Router>
  </Provider>
);

describe('Component: StringsFilterItem', () => {

  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId('strings-filter-item')).toBeInTheDocument();
    expect(screen.getByLabelText('6')).toBeInTheDocument();
  });

  it('should handle user events correctly', () => {
    render(fakeApp);
    const changeHandler = jest.fn();
    const input = screen.getByTestId('strings-checkbox');
    input.onchange = changeHandler;

    userEvent.click(input);

    expect(changeHandler).toBeCalled();
  });
});
