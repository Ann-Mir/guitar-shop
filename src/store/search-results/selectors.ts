import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Guitars } from '../../types/guitar';

export const getSearchResults = (state: State): Guitars =>
  state[NameSpace.search].guitars;
