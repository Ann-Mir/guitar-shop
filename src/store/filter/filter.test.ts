import { setMinPrice, setMaxPrice } from '../actions';
import { filter } from './filter';


describe('Reducer: filter', () => {

  const state = {
    minPrice: 0,
    maxPrice: 0,
  };

  it('should return initial state without additional parameters', () => {

    expect(filter(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should update minPrice by setMinPrice', () => {

    const fakePrice = 20;

    expect(filter(state, setMinPrice(fakePrice)))
      .toEqual({
        ...state,
        minPrice: fakePrice,
      });
  });

  it('should update maxPrice by setMaxPrice', () => {

    const fakePrice = 20;

    expect(filter(state, setMaxPrice(fakePrice)))
      .toEqual({
        ...state,
        maxPrice: fakePrice,
      });
  });
});
