import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';


export const getCurrentPage = (state: State): number => state[NameSpace.pagination].currentPage;
export const getStart = (state: State): number => state[NameSpace.pagination].start;
