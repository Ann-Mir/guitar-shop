import { createReducer } from '@reduxjs/toolkit';
import { PostingStatus } from '../../const';
import { TGuitarData } from '../../types/state';
import {
  loadComments,
  loadGuitar,
  setAreCommentsLoaded,
  setIsGuitarLoaded,
  setPostingStatus
} from '../actions';

const initialState: TGuitarData = {
  guitar: null,
  isGuitarLoaded: false,
  areCommentsLoaded: false,
  postingStatus: PostingStatus.Unknown,
  comments: [],
};


const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitar, (state, action) => {
      const { guitar } = action.payload;
      state.guitar = guitar;
      state.isGuitarLoaded = true;
    })
    .addCase(setIsGuitarLoaded, (state, action) => {
      const { isGuitarLoaded } = action.payload;
      state.isGuitarLoaded = isGuitarLoaded;
    })
    .addCase(loadComments, (state, action) => {
      const { comments } = action.payload;
      state.comments = comments;
      state.areCommentsLoaded = true;
    })
    .addCase(setPostingStatus, (state, action) => {
      const { postingStatus } = action.payload;
      state.postingStatus = postingStatus;
    })
    .addCase(setAreCommentsLoaded, (state, action) => {
      const { areCommentsLoaded } = action.payload;
      state.areCommentsLoaded = areCommentsLoaded;
    });
});

export {guitarData};
