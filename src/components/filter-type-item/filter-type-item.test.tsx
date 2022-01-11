import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { ActionType } from '../../types/action';
import FilterTypeItem from './filter-type-item';
import { mockState } from '../../utils/test-utils';
import * as Redux from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <FilterTypeItem type={'acoustic'} name={'Акустическая'} disabled={false}/>
    </Router>
  </Provider>
);

describe('Component: FilterTypeItem', () => {
  it('should render correctly', () => {
    render(fakeApp);
    const checkbox = screen.getByTestId('type-checkbox');
    expect(screen.getByText('Акустическая')).toBeInTheDocument();
    expect(checkbox).not.toHaveAttribute('disabled');
  });
  it('should handle user events correctly', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const checkbox = screen.getByTestId('type-checkbox');
    const fakeHandler = jest.fn();
    checkbox.onchange = fakeHandler;

    userEvent.click(checkbox);

    expect(fakeHandler).toBeCalled();
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.ResetPagination,
    });
  });
});
