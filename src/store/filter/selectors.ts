import {NameSpace} from '../root-reducer';
import { State } from '../../types/state';

export const getMinPrice = (state: State): number => state[NameSpace.filter].minPrice;
export const getMaxPrice = (state: State): number => state[NameSpace.filter].maxPrice;
