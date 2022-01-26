import { PostingStatus } from '../../const';
import { mockGuitar } from '../../utils/test-utils';
import { loadGuitar, setIsGuitarLoaded } from '../actions';
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
});
