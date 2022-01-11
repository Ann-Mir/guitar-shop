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
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const changeHandler = jest.fn();
    const input = screen.getByTestId('strings-checkbox');
    input.onchange = changeHandler;

    userEvent.click(input);

    expect(changeHandler).toBeCalled();
    // expect(dispatch).toBeCalledTimes(1);
    // expect(dispatch).nthCalledWith(1, {
    //   type: ActionType.ResetPagination,
    // });
  });

  // it('should handle Next button events correctly', () => {
  //
  //   const mockStore = configureMockStore([thunk]);
  //
  //   const paginationMockState = {
  //     DATA: {
  //       guitarsCount: 27,
  //     },
  //     PAGINATION: {
  //       currentPage: 2,
  //       limit: CARDS_PER_PAGE,
  //       start: 9,
  //     },
  //   };
  //   const store = mockStore(paginationMockState);
  //
  //   const fakeApp = (
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <Pagination />
  //       </Router>
  //     </Provider>
  //   );
  //
  //   const dispatch = jest.fn();
  //   const useDispatch = jest.spyOn(Redux, 'useDispatch');
  //   useDispatch.mockReturnValue(dispatch);
  //
  //   render(fakeApp);
  //
  //   const nextBtn = screen.getByTestId('next-button');
  //   const fakeHandler = jest.fn();
  //   nextBtn.onclick = fakeHandler;
  //
  //   userEvent.click(nextBtn);
  //
  //   expect(fakeHandler).toBeCalled();
  //   expect(dispatch).toBeCalledTimes(1);
  //   expect(dispatch).nthCalledWith(1, {
  //     type: ActionType.SetCurrentPage,
  //     payload: {
  //       currentPage: 3,
  //     },
  //   });
  // });
  //
  // it('should handle Page button events correctly', () => {
  //
  //   const mockStore = configureMockStore([thunk]);
  //
  //   const paginationMockState = {
  //     DATA: {
  //       guitarsCount: 27,
  //     },
  //     PAGINATION: {
  //       currentPage: 2,
  //       limit: CARDS_PER_PAGE,
  //       start: 9,
  //     },
  //   };
  //   const store = mockStore(paginationMockState);
  //
  //   const fakeApp = (
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <Pagination />
  //       </Router>
  //     </Provider>
  //   );
  //
  //   render(fakeApp);
  //
  //   const pageBtn = screen.getByTestId('3');
  //   const fakeHandler = jest.fn();
  //   pageBtn.onclick = fakeHandler;
  //
  //   userEvent.click(pageBtn);
  //
  //   expect(fakeHandler).toBeCalled();
  // });
  //
  // it('should not be displayed if there is only one page', () => {
  //
  //   const mockStore = configureMockStore([thunk]);
  //
  //   const paginationMockState = {
  //     DATA: {
  //       guitarsCount: 5,
  //     },
  //     PAGINATION: {
  //       currentPage: 1,
  //       limit: CARDS_PER_PAGE,
  //       start: 0,
  //     },
  //   };
  //   const store = mockStore(paginationMockState);
  //
  //   const fakeApp = (
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <Pagination />
  //       </Router>
  //     </Provider>
  //   );
  //
  //   render(fakeApp);
  //
  //   expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  // });
});
