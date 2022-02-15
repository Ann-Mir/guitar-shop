import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { PromoCode, PromoCodeStatus } from '../const';

import { createApi } from '../services/api';
import { State } from '../types/state';
import { mockGuitars } from '../utils/test-utils';
import {
  loadGuitars,
  loadSearchResults, setCoupon, setDiscount,
  setGuitarsCount, setIsDataLoaded,
  setMaxPrice,
  setMinPrice,
  setPromoCodeStatus
} from './actions';
import {
  fetchGuitarsAction,
  fetchMaxPriceAction,
  fetchMinPriceAction, postPromoCodeAction,
  searchGuitarsWithParams
} from './api-actions';


describe('Async actions', () => {

  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadGuitars and setGuitarsCount when GET /guitars?_embed=comments:params',
    async () => {
      const store = mockStore();
      const fakeParams = '_start=0&_limit=3';
      mockAPI
        .onGet(`/guitars?_embed=comments&${fakeParams}`)
        .reply(200, mockGuitars, {'x-total-count' : mockGuitars.length});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchGuitarsAction(fakeParams));

      expect(store.getActions()).toEqual([
        setIsDataLoaded(false),
        loadGuitars(mockGuitars),
        setGuitarsCount(mockGuitars.length),
      ]);
    });

  it('should dispatch setMinPrice when GET /guitars?_order=asc&_sort=price&_limit=1&_start=0',
    async () => {
      const store = mockStore();
      mockAPI
        .onGet('/guitars?_order=asc&_sort=price&_limit=1&_start=0')
        .reply(200, [mockGuitars[0]]);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchMinPriceAction());

      expect(store.getActions()).toEqual([
        setMinPrice(mockGuitars[0].price),
      ]);
    });

  it('should dispatch setMaxPrice when GET /guitars?_order=desc&_sort=price&_limit=1&_start=0',
    async () => {
      const store = mockStore();
      mockAPI
        .onGet('/guitars?_order=desc&_sort=price&_start=0&_limit=1')
        .reply(200, [mockGuitars[0]]);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchMaxPriceAction());

      expect(store.getActions()).toEqual([
        setMaxPrice(mockGuitars[0].price),
      ]);
    });

  it('should dispatch loadSearchResults when GET /guitars?name_like=Name',
    async () => {
      const store = mockStore();
      const fakeName = 'electric';
      mockAPI
        .onGet(`/guitars?name_like=${fakeName}`)
        .reply(200, mockGuitars);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(searchGuitarsWithParams(fakeName));

      expect(store.getActions()).toEqual([
        loadSearchResults(mockGuitars),
      ]);
    });

  it('should dispatch setPromoCodeStatus, setCoupon, setDiscount, setPromoCodeStatus when POST /coupons',
    async () => {
      const store = mockStore();
      const fakeCoupon = {coupon: PromoCode.Medium};
      const fakeDiscount = 25;
      mockAPI
        .onPost('/coupons', fakeCoupon)
        .reply(200, fakeDiscount);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(postPromoCodeAction(fakeCoupon));

      expect(store.getActions()).toEqual([
        setPromoCodeStatus(PromoCodeStatus.Posting),
        setCoupon(PromoCode.Medium),
        setDiscount(fakeDiscount),
        setPromoCodeStatus(PromoCodeStatus.Success),
      ]);
    });
});
