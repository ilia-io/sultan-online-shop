import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../app/reducers/productSlice'
import cartSlice from './reducers/cartSlice';
import filterSlice from './reducers/filterSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartSlice,
    filter:filterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
