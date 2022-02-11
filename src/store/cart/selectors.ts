import { Guitars } from '../../types/guitar';
import {NameSpace} from '../root-reducer';
import { State } from '../../types/state';
import {createSelector} from 'reselect';


export const getGuitarsInCart = (state: State): Guitars => state[NameSpace.cartGuitars].cartGuitars;
export const getQuantityInCart = createSelector(
  getGuitarsInCart,
  (guitars) => guitars.reduce(
    (total, item) => total + Number(item.quantity), 0));
