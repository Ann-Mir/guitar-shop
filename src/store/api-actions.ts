import { toast } from 'react-toastify';
import {
  APIRoute,
  EmbedOption,
  OrderOption,
  PostingStatus,
  QueryParams,
  SortOption
} from '../const';
import { ThunkActionResult } from '../types/action';
import { CommentPost, Comments, Comment } from '../types/comment';
import { Guitar } from '../types/guitar';
import {
  loadComments,
  loadGuitar,
  loadGuitars,
  loadSearchResults,
  setAreCommentsLoaded,
  setGuitarsCount,
  setIsDataLoaded,
  setIsGuitarLoaded,
  setMaxPrice,
  setMinPrice,
  setPostingStatus
} from './actions';


export const enum ErrorMessage {
  FetchGuitars = 'Не удалось загрузить данные из каталога',
  FetchPrice = 'Не удалось загрузить данные о ценах',
  FetchComments = 'Не удалось загрузить комментарии',
  PostComment = 'Не удалось отправить комментарий',
}

const TOTAL_COUNT = 'x-total-count';

export const fetchGuitarsAction =
  (searchParams: string): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {
      dispatch(setIsDataLoaded(false));
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
        dispatch(setIsDataLoaded(true));
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


export const fetchGuitarAction =
  (id: string): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {
      dispatch(setIsGuitarLoaded(false));
      try {
        const response = await api
          .get<Guitar>(
            `${APIRoute.Guitars}/${id}`);
        const { data } = response;
        dispatch(loadGuitar(data));
      } catch {
        toast.error(ErrorMessage.FetchGuitars);
        dispatch(setIsGuitarLoaded(true));
      }
    };

export const fetchCommentsAction =
  (id: string): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {
      dispatch(setAreCommentsLoaded(false));
      try {
        const response = await api
          .get<Comments>(
            `${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
        const { data } = response;
        dispatch(loadComments(data));
      } catch {
        toast.error(ErrorMessage.FetchComments);
        dispatch(setAreCommentsLoaded(true));
      }
    };


export const postCommentAction =
  (commentPost: CommentPost): ThunkActionResult =>
    async (
      dispatch,
      _getState,
      api,
    ): Promise<void> => {
      dispatch(setAreCommentsLoaded(false));
      try {
        const response = await api
          .post<Comment>(`${APIRoute.Comments}`, commentPost);

        const { data } = response;

        const comments = _getState().GUITAR.comments;
        dispatch(loadComments([data, ...comments]));
        dispatch(setPostingStatus(PostingStatus.Success));
      } catch {
        toast.error(ErrorMessage.PostComment);
        dispatch(setAreCommentsLoaded(true));
        dispatch(setPostingStatus(PostingStatus.Error));
      }
    };
