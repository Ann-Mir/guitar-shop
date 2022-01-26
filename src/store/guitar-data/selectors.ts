import { PostingStatus } from '../../const';
import { Comments } from '../../types/comment';
import { Guitar } from '../../types/guitar';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getGuitar = (state: State): Guitar | null => state[NameSpace.guitar].guitar;
export const getIsGuitarLoaded = (state: State): boolean => state[NameSpace.guitar].isGuitarLoaded;
export const getComments = (state: State): Comments => state[NameSpace.guitar].comments;
export const getAreCommentsLoaded = (state: State): boolean => state[NameSpace.guitar].areCommentsLoaded;
export const getPostingStatus = (state: State): PostingStatus => state[NameSpace.guitar].postingStatus;


