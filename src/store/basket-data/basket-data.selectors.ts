import { SliceName } from '../../constants';
import { ProductInBasket, PromoCode } from '../../types/basket';
import { State } from '../../types/state';

export const getProductsInBasket = (state: Pick<State, SliceName.Basket>): ProductInBasket[] => state[SliceName.Basket].productsInBasket;
export const getActivePopupDeleteProductFromBasket = (state: Pick<State, SliceName.Basket>): boolean => state[SliceName.Basket].isActivePopupDeleteProduct;
export const getDeletingProductData = (state: Pick<State, SliceName.Basket>): ProductInBasket => state[SliceName.Basket].deletingProductData;
export const getPromoCode = (state: Pick<State, SliceName.Basket>): PromoCode => state[SliceName.Basket].promoCode;
export const getPromoCodeError = (state: Pick<State, SliceName.Basket>): boolean => state[SliceName.Basket].promoError;
export const getDiscount = (state: Pick<State, SliceName.Basket>): number => state[SliceName.Basket].discount;
export const getOrderError = (state: Pick<State, SliceName.Basket>): boolean => state[SliceName.Basket].orderError;
export const getActivePopupOrder = (state: Pick<State, SliceName.Basket>): boolean => state[SliceName.Basket].isActivePopupOrder;
