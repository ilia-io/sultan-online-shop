import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import DB from '../../assets/db.json';
import { IProduct } from '../../@types/Product';
import { RootState } from '../store';
import { getProductsFromLocalStorage } from '../../components/Catalog';

export interface ProductState {
  items: IProduct[];
  currentItem: IProduct;
  localItems: IProduct[];
}

const initialState: ProductState = {
  items: DB.products,
  currentItem: DB.products[0],
  localItems: getProductsFromLocalStorage() || DB.products,
};

// export const emptyProduct: IProduct = {
//   imageURL: '',
//   name: '',
//   type: '',
//   size: 0,
//   barcode: 0,
//   manufacturer: '',
//   brand: '',
//   description: '',
//   price: 0,
//   careType: [''],
// };

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getCurrentItem: (state, action: PayloadAction<number>) => {
      state.currentItem = state.localItems.find(
        (item) => item.barcode === action.payload
      ) as IProduct;
    },
    setLocalItems: (state, action: PayloadAction<IProduct[]>) => {
      state.localItems = action.payload;
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      state.localItems = state.localItems.filter(
        (item) => item.barcode !== action.payload.barcode
      );
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.localItems.unshift(action.payload);
    },
    editProduct: (state, action: PayloadAction<IProduct>) => {
      state.localItems = state.localItems.map((item) =>
        item.barcode === action.payload.barcode ? (item = action.payload) : item
      );
    },
  },
});

export const productsSelector = (state: RootState) => state.product.items;
export const currentItemSelector = (state: RootState) =>
  state.product.currentItem;
export const localItemsSelector = (state: RootState) =>
  state.product.localItems;

export const {
  getCurrentItem,
  setLocalItems,
  removeProduct,
  addProduct,
  editProduct,
} = productSlice.actions;

export default productSlice.reducer;
