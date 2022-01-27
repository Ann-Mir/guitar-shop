import { PostingStatus } from '../../const';
import { fakeComments, mockGuitar } from '../../utils/test-utils';
import { loadComments, loadGuitar, setAreCommentsLoaded, setIsGuitarLoaded, setPostingStatus } from '../actions';
import { guitarData } from './guitar-data';


describe('Reducer: guitarData', () => {
  const state = {
    guitar: null,
    isGuitarLoaded: false,
    comments: [],
    areCommentsLoaded: false,
    postingStatus: PostingStatus.Unknown,
  };

  it('should return initial state without additional parameters', () => {

    expect(guitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should update guitar by loadGuitar', () => {

    expect(guitarData(state, loadGuitar(mockGuitar)))
      .toEqual({
        ...state,
        guitar: mockGuitar,
        isGuitarLoaded: true,
      });
  });

  it('should update isGuitarLoaded by setIsGuitarLoaded', () => {

    expect(guitarData(state, setIsGuitarLoaded(true)))
      .toEqual({
        ...state,
        isGuitarLoaded: true,
      });
  });

  it('should update comments by loadComments', () => {

    expect(guitarData(state, loadComments(fakeComments)))
      .toEqual({
        ...state,
        comments: fakeComments,
        areCommentsLoaded: true,
      });
  });

  it('should update postingStatus by setPostingStatus', () => {

    expect(guitarData(state, setPostingStatus(PostingStatus.Success)))
      .toEqual({
        ...state,
        postingStatus: PostingStatus.Success,
      });
  });

  it('should update areCommentsLoaded by setAreCommentsLoaded', () => {

    expect(guitarData(state, setAreCommentsLoaded(true)))
      .toEqual({
        ...state,
        areCommentsLoaded: true,
      });
  });
});
