import {createReducer} from '@reduxjs/toolkit';
import { CARDS_PER_PAGE } from '../../const';
import { TPagination } from '../../types/state';
import { resetPagination, setCurrentPage } from '../actions';


const initialState: TPagination = {
  currentPage: 1,
  limit: CARDS_PER_PAGE,
  start: 0,
};

const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentPage, (state, action) => {
      const {currentPage} = action.payload;
      state.currentPage = currentPage;
      state.start = (currentPage - 1) * state.limit;
    })
    .addCase(resetPagination, (state) => {
      state.currentPage = 1;
      state.start = 0;
    });
});

export {paginationReducer};
