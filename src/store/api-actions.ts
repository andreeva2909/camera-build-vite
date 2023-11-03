import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductPromo } from '../types/product.ts';
import { APIRoute } from '../constants';
import { AppDispatch, State } from '../types/state.ts';
import { Review } from '../types/review.ts';
import { FieldValues } from 'react-hook-form';

export const fetchProductsAction = createAsyncThunk<Product[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Product[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchProductsPromoAction = createAsyncThunk<ProductPromo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProductsPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ProductPromo[]>(APIRoute.Promo);
    return data;
  },
);

export const getProductDataAction = createAsyncThunk<Product, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/getProductData',
  async (clickedProductId, { extra: api }) => {
    const { data } = await api.get<Product>(`${APIRoute.Cameras}/${clickedProductId}`);
    return data;
  },
);

export const getSimilarProductsAction = createAsyncThunk<Product[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/getSimilarProducts',
  async (clickedProductId, { extra: api }) => {
    const { data } = await api.get<Product[]>(`${APIRoute.Cameras}/${clickedProductId}${APIRoute.Similar}`);
    return data;
  },
);

export const getReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/getReviews',
  async (clickedProductId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Cameras}/${clickedProductId}${APIRoute.Reviews}`);
    return data;
  },
);

export const postNewReviewAction = createAsyncThunk<Review, FieldValues, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/postNewReview',
  async (param, { extra: api }) => {
    const response = await api.post<Review>(APIRoute.Reviews, param);
    const { data } = response;
    return data;
  },
);
