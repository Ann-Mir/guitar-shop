import {Guitars} from './guitar';
import {RootState} from '../store/root-reducer';


export type TGuitarsData = {
  guitars: Guitars,
  isDataLoaded: boolean,
  guitarsCount: number,
};

export type TFilter = {
  minPrice: number,
  maxPrice: number,
};

export type TSearchResults = {
  guitars: Guitars,
};

export type TPagination = {
  currentPage: number,
  start: number,
  limit: number,
};

export type State = RootState;
