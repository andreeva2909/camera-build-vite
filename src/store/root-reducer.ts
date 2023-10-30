import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../constants';
import { productsData } from './products-data/products-data.slice';

export const rootReducer = combineReducers({
  [SliceName.Data]: productsData.reducer,
});
