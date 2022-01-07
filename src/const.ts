export enum AppRoute {
  Root = '/',
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  UnderConstruction = '/under-construction',
}

export enum APIRoute {
  Guitars = '/guitars',
}

export enum SortOption {
  PRICE = 'price',
  RATING = 'rating',
}

export enum OrderOption {
  DESC = 'desc',
  ASC = 'asc',
}

export const STRINGS = [4, 6, 7, 12];

export interface GuitarsStrings {
  [key: string]: number[]
}

export const STRINGS_BY_TYPE: GuitarsStrings = {
  acoustic: [6, 7, 12],
  electric: [6, 6, 7],
  ukulele: [4],
};

export const CARDS_PER_PAGE = 9;
