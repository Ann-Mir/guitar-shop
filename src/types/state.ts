import {Guitars} from './guitar';
import {RootState} from '../store/root-reducer';


export type GuitarsData = {
  guitars: Guitars,
  isDataLoaded: boolean,
};

export type SearchResults = {
  guitars: Guitars,
};

export type State = RootState;
