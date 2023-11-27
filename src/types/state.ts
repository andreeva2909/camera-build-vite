import { Product, ProductPromo } from './product';
import { store } from '../store/index';
import { Review } from './review';
import { SortingDirection, SortingType } from './sorting';
import { NameCategoryEng } from './filter';

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
  sortingType: SortingType | null;
  sortingDirection: SortingDirection | null;
  filterCategory: NameCategoryEng | null;
  filterType: string[];
  filterLevel : string[];
  priceMin: number;
  priceMax: number;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
