import { SliceName } from '../../constants';
import { makeFakeProductInBasket } from '../../test-mocks/test-mocks';
import { PromoCode } from '../../types/basket';
import { getActivePopupDeleteProductFromBasket, getDeletingProductData, getProductsInBasket, getPromoCodeError, getPromoCode, getDiscount, getOrderError, getActivePopupOrder } from './basket-data.selectors';
import { testInitialStateBasket } from './basket-data.slice';

describe('Селекторы BasketData', () => {
  const state = {
    [SliceName.Basket]: {
      ...testInitialStateBasket,
      productsInBasket: [makeFakeProductInBasket()],
      deletingProductData: makeFakeProductInBasket(),
      isActivePopupDeleteProduct: false,
      promoError: false,
      isValidPromoCode: false,
      orderError: false,
      isActivePopupOrder: false,
      discount: 25,
      promoCode: 'camera-555' as PromoCode
    }
  };

  it('Должен получить все товары в корзине', () => {
    const { productsInBasket } = state[SliceName.Basket];
    const result = getProductsInBasket(state);
    expect(result).toEqual(productsInBasket);
  });

  it('Должен получить состоние попапа удаления товара из корзины', () => {
    const { isActivePopupDeleteProduct } = state[SliceName.Basket];
    const result = getActivePopupDeleteProductFromBasket(state);
    expect(result).toBe(isActivePopupDeleteProduct);
  });

  it('Должен получить информацию об удаляемом товаре из корзины', () => {
    const { deletingProductData } = state[SliceName.Basket];
    const result = getDeletingProductData(state);
    expect(result).toEqual(deletingProductData);
  });

  it('Должен получить информацию о промокоде', () => {
    const { promoCode } = state[SliceName.Basket];
    const result = getPromoCode(state);
    expect(result).toEqual(promoCode);
  });

  it('Должен получить информацию об ошибке получения промокода', () => {
    const { promoError } = state[SliceName.Basket];
    const result = getPromoCodeError(state);
    expect(result).toBe(promoError);
  });

  it('Должен получить информацию о скидке', () => {
    const { discount } = state[SliceName.Basket];
    const result = getDiscount(state);
    expect(result).toBe(discount);
  });

  it('Должен получить информацию об ошибке оформления заказа', () => {
    const { orderError } = state[SliceName.Basket];
    const result = getOrderError(state);
    expect(result).toBe(orderError);
  });
  it('Должен получить состояние попапа успешного оформления заказа', () => {
    const { isActivePopupOrder } = state[SliceName.Basket];
    const result = getActivePopupOrder(state);
    expect(result).toBe(isActivePopupOrder);
  });

});
