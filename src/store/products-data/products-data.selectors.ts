import { SliceName } from '../../constants';
import { Product, ProductPromo } from '../../types/product';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getAllProducts = (state: Pick<State, SliceName.Data>): Product[] => state[SliceName.Data].products;
export const getAllProductsPromo = (state: Pick<State, SliceName.Data>): ProductPromo[] => state[SliceName.Data].productsPromo;
export const getActivePopupAddItem = (state: Pick<State, SliceName.Data>): boolean => state[SliceName.Data].isActivePopupAddItem;
export const getActivePopupAddReview = (state: Pick<State, SliceName.Data>): boolean => state[SliceName.Data].isActivePopupAddReview;
export const getActivePopupAddReviewSuccess = (state: Pick<State, SliceName.Data>): boolean => state[SliceName.Data].isActivePopupAddReviewSuccess;
export const getSelectedProductId = (state: Pick<State, SliceName.Data>): string => state[SliceName.Data].selectedProductId;
export const getSelectedProductData = (state: Pick<State, SliceName.Data>): Product => state[SliceName.Data].selectedProductData;
export const getProductData = (state: Pick<State, SliceName.Data>): Product => state[SliceName.Data].productData;
export const getStatusLoadingProductData = (state: Pick<State, SliceName.Data>): boolean => state[SliceName.Data].isProductsDataLoading;
export const getSimilarProducts = (state: Pick<State, SliceName.Data>): Product[] => state[SliceName.Data].similarProducts;
export const getProductReviews = (state: Pick<State, SliceName.Data>): Review[] => state[SliceName.Data].productReviews;
export const getErrorProductData = (state: Pick<State, SliceName.Data>): boolean => state[SliceName.Data].errorProductData;
export const getErrorAddReview = (state: Pick<State, SliceName.Data>): boolean => state[SliceName.Data].errorAddReview;
