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
