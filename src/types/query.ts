import { OrderOption, SortOption } from '../const';


export type TQueryParams = {
  _sort?: SortOption,
  _order?: OrderOption,
  _start?: number,
  _end?: number,
  price_gte?: number,
  price_lte?: number,
  name_like?: string,
  _embed?: string,
  type?: string,
}
