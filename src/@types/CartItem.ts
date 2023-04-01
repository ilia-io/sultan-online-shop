import { IProduct } from './Product';

export interface ICartItem extends IProduct {
  count: number;
}
