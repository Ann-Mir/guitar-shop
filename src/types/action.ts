import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../types/state';


export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  SetGuitarsCount = 'data/setGuitarsCount',
  LoadSearchResults = 'search/loadSearchResults',
  SetMinPrice = 'filters/minPrice',
  SetMaxPrice = 'filter/maxPrice',
  SetCurrentPage = 'pagination/setCurrentPage',
  ResetPagination = 'pagination/resetPagination',
  SetIsDataLoaded = 'data/setIsDataLoaded',
  LoadGuitar = 'guitar/loadGuitar',
  SetIsGuitarLoaded = 'guitar/setIsGuitarLoaded',
  LoadComments = 'guitar/loadComments',
  SetAreCommentsLoaded = 'guitar/setAreCommentsLoaded',
  SetPostingStatus = 'guitar/setPostingStatus',
  AddToCart = 'cart/addToCart',
  UpdateCartGuitarQuantity = '/cart/updateCartGuitarQuantity',
  RemoveItemFromCart = '/cart/removeItemFromCart',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
