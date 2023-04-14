import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import DB from '../../assets/db.json';
import { RootState } from '../store';

export interface FilterState {
  categories: string[];
  activeCategory: string;
  categoryFilter: boolean;
  manufacturers: string[];
  activeManufacturers: string[];
  manufacturersFilter: boolean;
  manufacturersSearch: string;
  priceFilterMin: string;
  priceFilterMax: string;
}

const initialState: FilterState = {
  categories: DB.careTypes,
  activeCategory: '',
  categoryFilter: false,
  manufacturers: DB.manufacturers,
  activeManufacturers: [],
  manufacturersFilter: false,
  manufacturersSearch: '',
  priceFilterMin: '',
  priceFilterMax: '10000',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCaterogy: (state, action: PayloadAction<string>) => {
      if (state.activeCategory === action.payload) {
        state.categoryFilter = false;
        state.activeCategory = '';
      } else {
        state.categoryFilter = true;
        state.activeCategory = action.payload;
      }
    },
    setActiveManufacturers: (state, action: PayloadAction<string>) => {
      state.manufacturersFilter = true;
      if (state.activeManufacturers.includes(action.payload)) {
        state.activeManufacturers = state.activeManufacturers.filter(
          (item) => item !== action.payload
        );
      } else {
        state.activeManufacturers.push(action.payload);
      }

      if (state.activeManufacturers.length === 0) {
        state.manufacturersFilter = false;
      }
    },
    setManufacturersSearch: (state, action: PayloadAction<string>) => {
      state.manufacturersSearch = action.payload;
    },
    setPriceFilterMin: (state, action: PayloadAction<string>) => {
      state.priceFilterMin = action.payload;
    },
    setPriceFilterMax: (state, action: PayloadAction<string>) => {
      state.priceFilterMax = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const {
  setActiveCaterogy,
  setActiveManufacturers,
  setManufacturersSearch,
  setPriceFilterMin,
  setPriceFilterMax,
} = filterSlice.actions;

export default filterSlice.reducer;
