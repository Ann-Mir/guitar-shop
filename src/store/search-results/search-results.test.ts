import { mockGuitars } from '../../utils/test-utils';
import { loadSearchResults } from '../actions';
import { searchResults } from './search-results';


describe('Reducer: searchResults', () => {

  const state = {
    guitars: [],
  };

  it('should return initial state without additional parameters', () => {

    expect(searchResults(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should update guitars by loadSearchResults', () => {

    expect(searchResults(state, loadSearchResults(mockGuitars)))
      .toEqual({
        ...state,
        guitars: mockGuitars,
      });
  });
});
