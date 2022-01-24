import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import { Guitar, Guitars } from '../types/guitar';


export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitars) => ({
    payload: {
      guitars,
    },
  }),
);

export const setGuitarsCount = createAction(
  ActionType.SetGuitarsCount,
  (guitarsCount: number) => ({
    payload: {
      guitarsCount,
    },
  }),
);

export const loadSearchResults = createAction(
  ActionType.LoadSearchResults,
  (guitars: Guitars) => ({
    payload: {
      guitars,
    },
  }),
);

export const setMinPrice = createAction(
  ActionType.SetMinPrice,
  (price: number) => ({
    payload: {
      price,
    },
  }),
);

export const setMaxPrice = createAction(
  ActionType.SetMaxPrice,
  (price: number) => ({
    payload: {
      price,
    },
  }),
);

export const setIsDataLoaded = createAction(
  ActionType.SetIsDataLoaded,
  (isDataLoaded: boolean) => ({
    payload: {
      isDataLoaded: isDataLoaded,
    },
  }),
);

export const setCurrentPage = createAction(
  ActionType.SetCurrentPage,
  (currentPage: number) => ({
    payload: {
      currentPage,
    },
  }),
);

export const resetPagination = createAction(ActionType.ResetPagination);

export const loadGuitar = createAction(
  ActionType.LoadGuitar,
  (guitar: Guitar) => ({
    payload: {
      guitar,
    },
  }),
);

export const setIsGuitarLoaded = createAction(
  ActionType.SetIsGuitarLoaded,
  (isGuitarLoaded: boolean) => ({
    payload: {
      isGuitarLoaded,
    },
  }),
);
