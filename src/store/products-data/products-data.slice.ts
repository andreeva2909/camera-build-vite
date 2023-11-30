import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../constants';
import { ProductsData } from '../../types/state';
import { fetchProductsAction, fetchProductsPromoAction, getProductDataAction, getReviewsAction, getSimilarProductsAction, postNewReviewAction } from '../api-actions';
import { Product } from '../../types/product';
import { SortingDirection, SortingType } from '../../types/sorting';
import { NameCategoryEng } from '../../types/filter';
import { ParamsFromURL } from '../../types/params';

const initialState: ProductsData = {
  products: [],
  isProductsDataLoading: false,
  productsPromo: [],
  isActivePopupAddItem: false,
  isActivePopupAddReview: false,
  isActivePopupAddReviewSuccess: false,
  isActivePopupAddProductToBasketSuccess: false,
  selectedProductId: '',
  selectedProductData: {} as Product,
  productData: {} as Product,
  similarProducts: [],
  productReviews: [],
  errorProductData: false,
  errorAddReview: false,
  sortingType: null,
  sortingDirection: null,
  filterCategory: null,
  filterType: [],
  filterLevel : [],
  priceMin: 0,
  priceMax: 0,
  productsInBasket: []
};

export const productsData = createSlice({
  name: SliceName.Data,
  initialState,
  reducers: {
    setPopupAddItem: (state, action: PayloadAction<boolean>) => {
      state.isActivePopupAddItem = action.payload;
    },
    setPopupAddReview: (state, action: PayloadAction<boolean>) => {
      state.isActivePopupAddReview = action.payload;
    },
    setPopupAddReviewSuccess: (state, action: PayloadAction<boolean>) => {
      state.isActivePopupAddReviewSuccess = action.payload;
    },
    setPopupAddProductToBasketSuccess: (state, action: PayloadAction<boolean>) => {
      state.isActivePopupAddProductToBasketSuccess = action.payload;
    },
    selectProductId: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
      state.products.map((product) => {
        if (product.id === Number(action.payload)) {
          state.selectedProductData = product;
        }
      });
    },
    setSortingType: (state, action: PayloadAction<SortingType>) => {
      state.sortingType = action.payload;
    },
    setSortingDirection: (state, action: PayloadAction<SortingDirection>) => {
      state.sortingDirection = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<NameCategoryEng | null>) => {
      state.filterCategory = action.payload;
    },
    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType.push(action.payload);
    },
    deleteFilterType: (state, action: PayloadAction<string>) => {
      state.filterType.splice(state.filterType.indexOf(action.payload), 1);
    },
    deleteAllFilterTypes: (state) => {
      state.filterType = [];
    },
    setFilterLevel: (state, action: PayloadAction<string>) => {
      state.filterLevel.push(action.payload);
    },
    deleteFilterLevel: (state, action: PayloadAction<string>) => {
      state.filterLevel.splice(state.filterLevel.indexOf(action.payload), 1);
    },
    deleteAllFilterLevels: (state) => {
      state.filterLevel = [];
    },
    setPriceMin: (state, action: PayloadAction<number>) => {
      state.priceMin = action.payload;
    },
    setPriceMax: (state, action: PayloadAction<number>) => {
      state.priceMax = action.payload;
    },
    setParamsFromURL: (state, action: PayloadAction<ParamsFromURL>) => {
      const {priceMin, priceMax, sortingType, sortingDirection, filterCategory, filterType, filterLevel} = action.payload;
      state.priceMin = priceMin;
      state.priceMax = priceMax;
      state.sortingType = sortingType;
      state.sortingDirection = sortingDirection;
      state.filterCategory = filterCategory;
      state.filterType = filterType;
      state.filterLevel = filterLevel;
    },
    addProductToBasket: (state, action: PayloadAction<string>) => {
      state.products.map((product) => {
        if (product.id === Number(action.payload)) {
          state.productsInBasket.push(product);
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
        state.errorProductData = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.isProductsDataLoading = false;
        state.products = action.payload;
        state.errorProductData = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.errorProductData = true;
      })
      .addCase(fetchProductsPromoAction.fulfilled, (state, action) => {
        state.productsPromo = action.payload;
      })
      .addCase(getProductDataAction.pending, (state) => {
        state.isProductsDataLoading = true;
        state.errorProductData = false;
      })
      .addCase(getProductDataAction.fulfilled, (state, action) => {
        state.isProductsDataLoading = false;
        state.productData = action.payload;
        state.errorProductData = false;
      })
      .addCase(getProductDataAction.rejected, (state) => {
        state.isProductsDataLoading = false;
        state.errorProductData = true;
      })
      .addCase(getSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(getReviewsAction.fulfilled, (state, action) => {
        state.productReviews = action.payload;
      })
      .addCase(postNewReviewAction.pending, (state) => {
        state.errorAddReview = false;
      })
      .addCase(postNewReviewAction.fulfilled, (state, action) => {
        state.errorAddReview = false;
        state.productReviews.push(action.payload);
        state.products.map((product) => {
          if (product.id === action.payload.cameraId) {
            product.reviewCount++;
          }
        });
      })
      .addCase(postNewReviewAction.rejected, (state) => {
        state.errorAddReview = true;
      });
  }
});

export const { setPopupAddItem, setPopupAddReview, selectProductId, setPopupAddReviewSuccess, setSortingType, setSortingDirection, setFilterCategory, setFilterType, setFilterLevel, deleteFilterType, deleteFilterLevel, setPriceMin, setPriceMax, setParamsFromURL, deleteAllFilterTypes, deleteAllFilterLevels, setPopupAddProductToBasketSuccess, addProductToBasket } = productsData.actions;
export { initialState as testInitialState };
