import {createAction} from '@reduxjs/toolkit';
import { PostingStatus } from '../const';
import {ActionType} from '../types/action';
import { Comments } from '../types/comment';
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

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comments) => ({
    payload: {
      comments,
    },
  }),
);

export const setAreCommentsLoaded = createAction(
  ActionType.SetAreCommentsLoaded,
  (areCommentsLoaded: boolean) => ({
    payload: {
      areCommentsLoaded,
    },
  }),
);

export const setPostingStatus = createAction(
  ActionType.SetPostingStatus,
  (postingStatus: PostingStatus) => ({
    payload: {
      postingStatus,
    },
  }),
);
