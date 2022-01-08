import { APIRoute, OrderOption, QueryParams, SortOption } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitar } from '../types/guitar';
import { TQueryParams } from '../types/query';
import { loadGuitars, loadSearchResults, setGuitarsCount, setMaxPrice, setMinPrice } from './actions';

const TOTAL_COUNT = 'x-total-count';

export const fetchGuitarsAction =
  (searchParams: string): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const response = await api.get<Guitar[]>(`${APIRoute.Guitars}?${searchParams}`);
      const { data } = response;
      const totalCount = response.headers[TOTAL_COUNT] as string;
      const guitarsCount = totalCount ? Number(totalCount) : data.length;
      dispatch(loadGuitars(data));
      dispatch(setGuitarsCount(guitarsCount));
    };

export const searchGuitarsWithParams =
  (queryParams: TQueryParams): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const { data } = await api.get<Guitar[]>(APIRoute.Guitars, {
        params: queryParams,
      });
      dispatch(loadSearchResults(data));
    };


export const fetchMinPriceAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {

      const queryParams = new URLSearchParams();
      queryParams.set(QueryParams.Order, OrderOption.Asc);
      queryParams.set(QueryParams.Sort, SortOption.Price);
      queryParams.set(QueryParams.Limit, '1');
      queryParams.set(QueryParams.Start, '0');
      queryParams.delete(QueryParams.PriceGte);
      queryParams.delete(QueryParams.PriceLte);

      const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?${queryParams.toString()}`);
      dispatch(setMinPrice(data[0].price));
    };

export const fetchMaxPriceAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const queryParams = new URLSearchParams();
      queryParams.set(QueryParams.Order, OrderOption.Desc);
      queryParams.set(QueryParams.Sort, SortOption.Price);
      queryParams.set(QueryParams.Start, '0');
      queryParams.set(QueryParams.Limit, '1');
      queryParams.delete(QueryParams.PriceGte);
      queryParams.delete(QueryParams.PriceLte);

      const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?${queryParams.toString()}`);
      dispatch(setMaxPrice(data[0].price));
    };
