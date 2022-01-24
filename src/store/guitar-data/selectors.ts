import { Guitar } from '../../types/guitar';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getGuitar = (state: State): Guitar | null => state[NameSpace.guitar].guitar;
export const getIsGuitarLoaded = (state: State): boolean => state[NameSpace.guitar].isGuitarLoaded;
