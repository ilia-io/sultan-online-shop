import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../@types/Product';
import { ICartItem } from '../../@types/CartItem';
import { RootState } from '../store';

export interface CartState {
  items: ICartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IProduct>) => {
      const findItem = state.items.find(
        (product) => product.barcode === action.payload.barcode
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.barcode !== action.payload
      );
      state.totalPrice = state.items.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find(
        (product) => product.barcode === action.payload
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter(
          (item) => item.barcode !== action.payload
        );
      }
      state.totalPrice = state.items.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const { addItemToCart, removeItemFromCart, clearCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
