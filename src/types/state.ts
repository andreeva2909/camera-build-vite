import { Product, ProductPromo } from './product';
import { store } from '../store/index';
import { Review } from './review';

export type ProductsData = {
  products: Product[];
  isProductsDataLoading: boolean;
  productsPromo: ProductPromo[];
  isActivePopupAddItem: boolean;
  isActivePopupAddReview: boolean;
  isActivePopupAddReviewSuccess: boolean;
  selectedProductId: string;
  selectedProductData: Product;
  productData: Product;
  similarProducts: Product[];
  productReviews: Review[];
  errorProductData: boolean;
  errorAddReview: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
