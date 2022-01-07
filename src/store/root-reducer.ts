import { combineReducers } from 'redux';
import { filter } from './filter/filter';
import { guitarsData } from './guitars-data/guitars-data';
import { paginationReducer } from './pagination/pagination-reducer';
import { searchResults } from './search-results/search-results';

export enum NameSpace {
  data = 'DATA',
  search = 'SEARCH',
  filters = 'FILTER',
  pagination = 'PAGINATION',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsData,
  [NameSpace.search]: searchResults,
  [NameSpace.filters]: filter,
  [NameSpace.pagination]: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
