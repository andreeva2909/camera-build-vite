import { Product, ProductPromo } from './product';
import { store } from '../store/index';
import { Review } from './review';
import { SortingDirection, SortingType } from './sorting';
import { NameCategoryEng } from './filter';
import { ProductInBasket, PromoCode } from './basket';

export type ProductsData = {
  products: Product[];
  isProductsDataLoading: boolean;
  productsPromo: ProductPromo[];
  isActivePopupAddItem: boolean;
  isActivePopupAddReview: boolean;
  isActivePopupAddReviewSuccess: boolean;
  isActivePopupAddProductToBasketSuccess: boolean;
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

export type BasketData = {
  productsInBasket: ProductInBasket[];
  deletingProductData: ProductInBasket;
  isActivePopupDeleteProduct: boolean;
  promoCode: PromoCode;
  promoError: boolean;
  isValidPromoCode: boolean;
  discount: number;
  orderError: boolean;
  isActivePopupOrder: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
