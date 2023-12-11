import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SliceName } from '../../constants';
import { BasketData } from '../../types/state';
import { Product } from '../../types/product';
import { getDiscount, getProductsInBasket, getPromoCode } from '../../utils';
import { ProductInBasket, PromoCode } from '../../types/basket';
import { postCouponAction, postOrderAction } from '../api-actions';

const {productsFromLS} = getProductsInBasket();
const {promoCode} = getPromoCode();
const {discount} = getDiscount();

const initialState: BasketData = {
  productsInBasket: productsFromLS,
  deletingProductData: {} as ProductInBasket,
  isActivePopupDeleteProduct: false,
  promoCode: promoCode,
  promoError: false,
  discount: discount,
  isValidPromoCode: false,
  orderError: false,
  isActivePopupOrder: false
};

export const basketData = createSlice({
  name: SliceName.Basket,
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<Product>) => {
      if (!state.productsInBasket.some((product) => product.id === action.payload.id)) {
        state.productsInBasket.push({ ...action.payload, count: 1 });
      } else {
        state.productsInBasket = state.productsInBasket.map((product) =>
          product.id === action.payload.id ? { ...product, count: product.count + 1 } : product
        );
      }
      localStorage.setItem('products', JSON.stringify(state.productsInBasket));
    },
    increaseCountProduct: (state, action: PayloadAction<number>) => {
      state.productsInBasket = state.productsInBasket.map((product) =>
        product.id === action.payload ? { ...product, count: product.count + 1 } : product
      );
      localStorage.setItem('products', JSON.stringify(state.productsInBasket));
    },
    decreaseCountProduct: (state, action: PayloadAction<number>) => {
      state.productsInBasket = state.productsInBasket.map((product) =>
        product.id === action.payload ? { ...product, count: product.count - 1 } : product
      );
      localStorage.setItem('products', JSON.stringify(state.productsInBasket));
    },
    setDeletingProduct: (state, action: PayloadAction<number>) => {
      state.productsInBasket.map((product) => {
        if (product.id === Number(action.payload)) {
          state.deletingProductData = product;
        }
      });
    },
    setActivePopupDeleteProduct: (state, action: PayloadAction<boolean>) => {
      state.isActivePopupDeleteProduct = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productsInBasket = state.productsInBasket.filter((product) => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.productsInBasket));
    },
    setCountProduct: (state, action: PayloadAction<{ id: number; count: number }>) => {
      state.productsInBasket = state.productsInBasket.map((product) =>
        product.id === action.payload.id ? { ...product, count: action.payload.count } : product
      );
      localStorage.setItem('products', JSON.stringify(state.productsInBasket));
    },
    setPromoCode: (state, action: PayloadAction<PromoCode>) => {
      state.promoCode = action.payload;
    },
    setActivePopupOrder: (state, action: PayloadAction<boolean>) => {
      state.isActivePopupOrder = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.pending, (state) => {
        state.promoError = false;
        state.isValidPromoCode = false;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.promoError = false;
        state.isValidPromoCode = true;
        localStorage.setItem('promocode', JSON.stringify(state.promoCode));
        localStorage.setItem('discount', JSON.stringify(state.discount));
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.promoError = true;
        state.isValidPromoCode = false;
        state.discount = 0;
        localStorage.removeItem('promocode');
        localStorage.removeItem('discount');
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderError = false;
        state.promoError = false;
        state.isValidPromoCode = false;
        state.promoCode = '';
        state.discount = 0;
        state.productsInBasket = [];
        state.isActivePopupOrder = false;
        localStorage.removeItem('products');
        localStorage.removeItem('promocode');
        localStorage.removeItem('discount');
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.orderError = true;
      });
  },
});

export const { addProductToBasket, increaseCountProduct, decreaseCountProduct, setDeletingProduct, setActivePopupDeleteProduct, deleteProduct, setCountProduct, setPromoCode, setActivePopupOrder } = basketData.actions;
export { initialState as testInitialStateBasket };
