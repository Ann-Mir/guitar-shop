import { OrderOption, SortOption } from '../const';
import {Guitars} from './guitar';
import {RootState} from '../store/root-reducer';


export type TGuitarsData = {
  guitars: Guitars,
  isDataLoaded: boolean,
};

export type TSearchResults = {
  guitars: Guitars,
};

export type TSort = {
  sort: SortOption,
  order: OrderOption,
}

export type State = RootState;
