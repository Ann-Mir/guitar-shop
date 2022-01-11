import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import { CARDS_PER_PAGE } from '../../const';
import { ActionType } from '../../types/action';
import Pagination from './pagination';
import { mockState } from '../../utils/test-utils';
import * as Redux from 'react-redux';

const history = createMemoryHistory();


describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore([thunk]);

    const store = mockStore(mockState);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>
    );
    render(fakeApp);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('1')).toHaveClass('pagination__page--active');
  });

  it('should handle Back button events correctly', () => {

    const mockStore = configureMockStore([thunk]);

    const paginationMockState = {
      DATA: {
        guitarsCount: 27,
      },
      PAGINATION: {
        currentPage: 2,
        limit: CARDS_PER_PAGE,
        start: 9,
      },
    };
    const store = mockStore(paginationMockState);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>
    );

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const backBtn = screen.getByTestId('back-button');
    const fakeHandler = jest.fn();
    backBtn.onclick = fakeHandler;

    userEvent.click(backBtn);

    expect(fakeHandler).toBeCalled();
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.SetCurrentPage,
      payload: {
        currentPage: 1,
      },
    });
  });

  it('should handle Next button events correctly', () => {

    const mockStore = configureMockStore([thunk]);

    const paginationMockState = {
      DATA: {
        guitarsCount: 27,
      },
      PAGINATION: {
        currentPage: 2,
        limit: CARDS_PER_PAGE,
        start: 9,
      },
    };
    const store = mockStore(paginationMockState);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>
    );

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeApp);

    const nextBtn = screen.getByTestId('next-button');
    const fakeHandler = jest.fn();
    nextBtn.onclick = fakeHandler;

    userEvent.click(nextBtn);

    expect(fakeHandler).toBeCalled();
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.SetCurrentPage,
      payload: {
        currentPage: 3,
      },
    });
  });

  it('should handle Page button events correctly', () => {

    const mockStore = configureMockStore([thunk]);

    const paginationMockState = {
      DATA: {
        guitarsCount: 27,
      },
      PAGINATION: {
        currentPage: 2,
        limit: CARDS_PER_PAGE,
        start: 9,
      },
    };
    const store = mockStore(paginationMockState);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>
    );

    render(fakeApp);

    const pageBtn = screen.getByTestId('3');
    const fakeHandler = jest.fn();
    pageBtn.onclick = fakeHandler;

    userEvent.click(pageBtn);

    expect(fakeHandler).toBeCalled();
  });

  it('should not be displayed if there is only one page', () => {

    const mockStore = configureMockStore([thunk]);

    const paginationMockState = {
      DATA: {
        guitarsCount: 5,
      },
      PAGINATION: {
        currentPage: 1,
        limit: CARDS_PER_PAGE,
        start: 0,
      },
    };
    const store = mockStore(paginationMockState);

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>
    );

    render(fakeApp);

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});
