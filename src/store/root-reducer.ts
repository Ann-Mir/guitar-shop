import { combineReducers } from 'redux';
import { filter } from './filter/filter';
import { guitarsData } from './guitars-data/guitars-data';
import { searchResults } from './search-results/search-results';

export enum NameSpace {
  data = 'DATA',
  search = 'SEARCH',
  filter = 'FILTER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsData,
  [NameSpace.search]: searchResults,
  [NameSpace.filter]: filter,
});

export type RootState = ReturnType<typeof rootReducer>;
