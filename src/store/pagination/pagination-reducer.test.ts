import { setCurrentPage, resetPagination } from '../actions';
import { paginationReducer } from './pagination-reducer';


describe('Reducer: paginationReducer', () => {
  const fakeInitialPage = 1;
  const fakeLimit = 9;

  const state = {
    currentPage: fakeInitialPage,
    limit: fakeLimit,
    start: 0,
  };

  it('should return initial state without additional parameters', () => {

    expect(paginationReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should update currentPage and start by setCurrentPage', () => {

    const fakePage = 2;

    expect(paginationReducer(state, setCurrentPage(fakePage)))
      .toEqual({
        ...state,
        currentPage: fakePage,
        start: (fakePage - 1) * fakeLimit,
      });
  });

  it('should update reset initial state by resetPagination', () => {

    expect(paginationReducer(state, resetPagination()))
      .toEqual({
        ...state,
        currentPage: fakeInitialPage,
        start: 0,
      });
  });
});
