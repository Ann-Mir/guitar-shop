import { combineReducers } from 'redux';
import { cart } from './cart/cart';
import { filter } from './filter/filter';
import { guitarData } from './guitar-data/guitar-data';
import { guitarsData } from './guitars-data/guitars-data';
import { paginationReducer } from './pagination/pagination-reducer';
import { searchResults } from './search-results/search-results';

export enum NameSpace {
  data = 'DATA',
  search = 'SEARCH',
  filters = 'FILTER',
  pagination = 'PAGINATION',
  guitar = 'GUITAR',
  cartGuitars = 'CART',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsData,
  [NameSpace.search]: searchResults,
  [NameSpace.filters]: filter,
  [NameSpace.pagination]: paginationReducer,
  [NameSpace.guitar]: guitarData,
  [NameSpace.cartGuitars]: cart,
});

export type RootState = ReturnType<typeof rootReducer>;
