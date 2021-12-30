import {Guitars} from './guitar';
import {RootState} from '../store/root-reducer';


export type TGuitarsData = {
  guitars: Guitars,
  isDataLoaded: boolean,
};

export type TFilter = {
  minPrice: number,
  maxPrice: number,
};

export type TSearchResults = {
  guitars: Guitars,
};


export type State = RootState;
