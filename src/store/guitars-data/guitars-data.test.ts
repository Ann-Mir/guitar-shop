import { mockGuitars } from '../../utils/test-utils';
import { loadGuitars, setGuitarsCount } from '../actions';
import { guitarsData } from './guitars-data';


describe('Reducer: guitarsData', () => {
  const state = {
    guitars: [],
    isDataLoaded: false,
    guitarsCount: 0,
  };

  it('should return initial state without additional parameters', () => {

    expect(guitarsData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should update guitars by loadGuitars', () => {

    expect(guitarsData(state, loadGuitars(mockGuitars)))
      .toEqual({
        ...state,
        guitars: mockGuitars,
        isDataLoaded: true,
      });
  });

  it('should update guitarsCount by setGuitarsCount', () => {

    const fakeGuitarsCount = 25;
    expect(guitarsData(state, setGuitarsCount(fakeGuitarsCount)))
      .toEqual({
        ...state,
        guitarsCount: fakeGuitarsCount,
      });
  });
});
