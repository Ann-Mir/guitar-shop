import { GuitarTypes } from './types/guitar';

export enum AppRoute {
  Root = '/',
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Shops = '/shops',
  About = '/about',
  UnderConstruction = '/under-construction',
  Cart = '/cart',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
}

export enum SortOption {
  Price = 'price',
  Rating = 'rating',
}

export enum OrderOption {
  Desc = 'desc',
  Asc = 'asc',
}

export enum EmbedOption {
  Comments = 'comments',
}

export const STRINGS: ReadonlyArray<number> = [4, 6, 7, 12];
export const FILTER_GUITAR_TYPES: ReadonlyArray<string> = [
  'acoustic', 'electric', 'ukulele'];

export interface GuitarsStrings {
  [key: string]: number[]
}

export const STRINGS_BY_TYPE: GuitarsStrings = {
  acoustic: [6, 7, 12],
  electric: [6, 6, 7],
  ukulele: [4],
};

export const CARDS_PER_PAGE = 9;

export const ESCAPE_KEY_CODE = 'Escape';

export enum QueryParams {
  Sort = '_sort',
  Order = '_order',
  Start = '_start',
  Limit = '_limit',
  PriceGte = 'price_gte',
  PriceLte = 'price_lte',
  NameLike = 'name_like',
  Embed = '_embed',
  Type = 'type',
  StringCount = 'stringCount',
}

export const DEFAULT_PAGE = 1;

export const ENTER_KEY_CODE = 'Enter';

export enum PostingStatus {
  Unknown = 'unknown',
  Posting = 'posting',
  Success = 'success',
  Error = 'error',
}

export enum PageTitles {
  Main = 'Главная',
  Catalogue = 'Каталог',
  Cart = 'Корзина',
}

export const BREADCRUMBS_LINKS = {
  main: {title: PageTitles.Main, route: AppRoute.Root},
  catalogue: {title: PageTitles.Catalogue, route: AppRoute.Guitars},
  cart: {title: PageTitles.Cart, route: AppRoute.Cart},
};

export const GUITAR_TYPES: GuitarTypes = {
  electric: 'Электрогитара',
  acoustic: 'Акустическая гитара',
  ukulele: 'Укулеле',
};

export const NOT_FOUND_INDEX = -1;

export enum PromoCode {
  Light = 'light-333',
  Medium = 'medium-444',
  High = 'height-555',
}

export enum PromoCodeStatus {
  Unknown = 'unknown',
  Posting = 'posting',
  Success = 'success',
  Error = 'error',
}
