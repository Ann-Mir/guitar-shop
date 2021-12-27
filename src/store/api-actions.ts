import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitar } from '../types/guitar';
import { loadGuitars, loadSearchResults } from './action';


type SearchParams = {
  'name_like': string;
};

export const fetchGuitarsAction =
  (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const { data } = await api.get<Guitar[]>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
    };

export const searchGuitarsWithParams =
  (queryParams: SearchParams): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const { data } = await api.get<Guitar[]>(APIRoute.Guitars, {
        params: queryParams,
      });
      dispatch(loadSearchResults(data));
    };
