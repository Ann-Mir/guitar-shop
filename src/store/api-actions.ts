import { APIRoute, OrderOption, SortOption } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitar } from '../types/guitar';
import { TQueryParams } from '../types/query';
import { loadGuitars, loadSearchResults, setMaxPrice, setMinPrice } from './actions';


export const fetchGuitarsAction =
  (searchParams: string): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}${searchParams}`);
      dispatch(loadGuitars(data));
    };

export const searchGuitarsWithParams =
  (queryParams: TQueryParams): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const { data } = await api.get<Guitar[]>(APIRoute.Guitars, {
        params: queryParams,
      });
      dispatch(loadSearchResults(data));
    };

export const fetchGuitarsWithParamsAction =
  (queryParams: TQueryParams): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const { data } = await api.get<Guitar[]>(APIRoute.Guitars, {
        params: queryParams,
      });
      dispatch(loadGuitars(data));
    };

export const fetchMinPriceAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {

      const queryParams = new URLSearchParams();
      queryParams.set('_order', OrderOption.ASC);
      queryParams.set('_sort', SortOption.PRICE);
      queryParams.set('_limit', '1');
      queryParams.set('_start', '0');
      queryParams.delete('price_gte');
      queryParams.delete('price_lte');

      const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?${queryParams.toString()}`);
      dispatch(setMinPrice(data[0].price));
    };

export const fetchMaxPriceAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const queryParams = new URLSearchParams();
      queryParams.set('_order', OrderOption.DESC);
      queryParams.set('_sort', SortOption.PRICE);
      queryParams.set('_start', '0');
      queryParams.set('_limit', '1');
      queryParams.delete('price_gte');
      queryParams.delete('price_lte');

      const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?${queryParams.toString()}`);
      dispatch(setMaxPrice(data[0].price));
    };
