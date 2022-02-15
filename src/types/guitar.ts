import { Comments } from './comment';

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  comments?: Comments;
  quantity?: number;
};

export type Guitars = Guitar[];

export interface GuitarTypes {
  [key: string]: string;
}

