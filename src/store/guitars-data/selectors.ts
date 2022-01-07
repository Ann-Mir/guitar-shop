import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Guitars} from '../../types/guitar';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getGuitarsCount = (state: State): number => state[NameSpace.data].guitarsCount;
