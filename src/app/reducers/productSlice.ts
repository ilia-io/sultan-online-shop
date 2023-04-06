import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DB from '../../assets/db.json';
import { IProduct } from '../../@types/Product';
import { RootState } from '../store';

export interface ProductState {
  items: IProduct[];
  currentItem: IProduct;
  localItems: IProduct[];
}

const initialState: ProductState = {
  items: DB.products,
  currentItem: DB.products[0],
  localItems: [],
};

// const fetchProducts = createAsyncThunk(
//   'product/fetch',
//   async (_, thunkAPI) => {
//     try {

//       const response = await axios.get<IUser[]>(API_URL!);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
//     }
//   }
// );

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
    removeSelected: (state, action: PayloadAction<IProduct>) => {
      state.localItems = state.localItems.filter(
        (item) => item.barcode !== action.payload.barcode
      );
      state.currentItem = state.localItems[0];
    },
    addNew: (state) => {
      state.localItems.unshift({
        imageURL: '',
        name: '',
        type: '',
        size: 0,
        barcode: 0,
        manufacturer: '',
        brand: '',
        description: '',
        price: 0,
        careType: [''],
      });
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
});

export const productsSelector = (state: RootState) => state.product.items;
export const currentItemSelector = (state: RootState) =>
  state.product.currentItem;
export const localItemsSelector = (state: RootState) =>
  state.product.localItems;

export const { getCurrentItem, setLocalItems, removeSelected, addNew } =
  productSlice.actions;

export default productSlice.reducer;