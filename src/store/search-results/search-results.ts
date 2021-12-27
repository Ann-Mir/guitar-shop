import { createReducer } from '@reduxjs/toolkit';
import { SearchResults } from '../../types/state';
import { loadSearchResults } from '../action';

const initialState: SearchResults = {
  guitars: [],
};

const searchResults = createReducer(initialState, (builder) => {
  builder.addCase(loadSearchResults, (state, action) => {
    const { guitars } = action.payload;
    state.guitars = guitars;
  });
});

export { searchResults };
