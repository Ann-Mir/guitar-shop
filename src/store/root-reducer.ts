import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
import { searchResults } from './search-results/search-results';

export enum NameSpace {
  data = 'DATA',
  search = 'SEARCH',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsData,
  [NameSpace.search]: searchResults,
});

export type RootState = ReturnType<typeof rootReducer>;
