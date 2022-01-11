import { toast } from 'react-toastify';
import { APIRoute, EmbedOption, OrderOption, QueryParams, SortOption } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitar } from '../types/guitar';
import { loadGuitars, loadSearchResults, setGuitarsCount, setMaxPrice, setMinPrice } from './actions';


const enum ErrorMessage {
  FetchGuitars = 'Не удалось загрузить данные из каталога',
  FetchPrice = 'Не удалось загрузить данные о ценах',
}

const TOTAL_COUNT = 'x-total-count';

export const fetchGuitarsAction =
  (searchParams: string): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {
      try {
        const response = await api
          .get<Guitar[]>(
            `${APIRoute.Guitars}?${QueryParams.Embed}=${EmbedOption.Comments}&${searchParams}`);
        const { data } = response;
        const totalCount = response.headers[TOTAL_COUNT] as string;
        const guitarsCount = totalCount ? Number(totalCount) : data.length;
        dispatch(loadGuitars(data));
        dispatch(setGuitarsCount(guitarsCount));
      } catch {
        toast.error(ErrorMessage.FetchGuitars);
      }
    };

export const searchGuitarsWithParams =
  (searchParams: string): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {
      try {
        const { data } = await api
          .get<Guitar[]>(`${APIRoute.Guitars}?${QueryParams.NameLike}=${searchParams}`);
        dispatch(loadSearchResults(data));
      } catch {
        toast.warn(ErrorMessage.FetchGuitars);
      }
    };


export const fetchMinPriceAction =
  (): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {

      const queryParams = new URLSearchParams();
      queryParams.set(QueryParams.Order, OrderOption.Asc);
      queryParams.set(QueryParams.Sort, SortOption.Price);
      queryParams.set(QueryParams.Limit, '1');
      queryParams.set(QueryParams.Start, '0');
      queryParams.delete(QueryParams.PriceGte);
      queryParams.delete(QueryParams.PriceLte);
      try {
        const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?${queryParams.toString()}`);
        dispatch(setMinPrice(data[0].price));
      } catch {
        toast.warn(ErrorMessage.FetchPrice);
      }
    };

export const fetchMaxPriceAction =
  (): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {
      const queryParams = new URLSearchParams();
      queryParams.set(QueryParams.Order, OrderOption.Desc);
      queryParams.set(QueryParams.Sort, SortOption.Price);
      queryParams.set(QueryParams.Start, '0');
      queryParams.set(QueryParams.Limit, '1');
      queryParams.delete(QueryParams.PriceGte);
      queryParams.delete(QueryParams.PriceLte);
      try {
        const { data } = await api.get<Guitar[]>(`${APIRoute.Guitars}?${queryParams.toString()}`);
        dispatch(setMaxPrice(data[0].price));
      } catch {
        toast.warn(ErrorMessage.FetchPrice);
      }
    };
