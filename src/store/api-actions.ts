import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitar } from '../types/guitar';
import { TQueryParams } from '../types/query';
import { loadGuitars, loadSearchResults } from './action';


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
