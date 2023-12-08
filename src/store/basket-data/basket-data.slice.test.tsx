import { makeFakeProductInBasket } from '../../test-mocks/test-mocks';
import { Order, PromoCode } from '../../types/basket';
import { postCouponAction, postOrderAction } from '../api-actions';
import { addProductToBasket, basketData, decreaseCountProduct, deleteProduct, increaseCountProduct, setActivePopupDeleteProduct, setActivePopupOrder, setCountProduct, setDeletingProduct, setPromoCode, testInitialStateBasket } from './basket-data.slice';

describe('Basket Slice', () => {
  const productInBasket = makeFakeProductInBasket();
  const deleteProductData = productInBasket;

  const state = {
    ...testInitialStateBasket,
    productsInBasket: [productInBasket],
    isActivePopupDeleteProduct: false,
    promoError: false,
    isValidPromoCode: false,
    orderError: false,
    isActivePopupOrder: false,
    discount: 25,
    promoCode: 'camera-555' as PromoCode
  };

  const initialState = {
    ...testInitialStateBasket
  };

  it('Должен вернуть начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialStateBasket
    };
    const result = basketData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть дефолтное начальное состояние при неизвестном состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialStateBasket
    };
    const result = basketData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен добавить товар в массив товаров', () => {
    const expectedProductInBasket = productInBasket;
    const expectedProductsInBasket = [expectedProductInBasket];
    const result = basketData.reducer(state, addProductToBasket(expectedProductInBasket));
    expectedProductInBasket.count = 2;
    expect(result.productsInBasket).toEqual(expectedProductsInBasket);
  });

  it('Должен увеличить количество товара на одну единицу', () => {
    const expectedProductInBasket = productInBasket;
    const expectedProductsInBasket = [expectedProductInBasket];
    const result = basketData.reducer(state, increaseCountProduct(expectedProductInBasket.id));
    expectedProductInBasket.count = 3;
    expect(result.productsInBasket).toEqual(expectedProductsInBasket);
  });

  it('Должен уменьшить количество товара на одну единицу', () => {
    const expectedProductInBasket = productInBasket;
    const expectedProductsInBasket = [expectedProductInBasket];
    const result = basketData.reducer(state, decreaseCountProduct(expectedProductInBasket.id));
    expectedProductInBasket.count = 2;
    expect(result.productsInBasket).toEqual(expectedProductsInBasket);
  });

  it('Должен заполнить данные по удаляемому товару', () => {
    const expectedDeletingProduct = deleteProductData;
    const result = basketData.reducer(state, setDeletingProduct(expectedDeletingProduct.id));
    expect(result.deletingProductData).toEqual(expectedDeletingProduct);
  });

  it('Должен вернуть статус видимости попапа удаления товара из корзины', () => {
    const result = basketData.reducer(state, setActivePopupDeleteProduct(false));
    expect(result.isActivePopupDeleteProduct).toBe(false);
  });

  it('Должен удалить товар', () => {
    const expectedDeletingProduct = deleteProductData;
    const result = basketData.reducer(state, deleteProduct(expectedDeletingProduct.id));
    expect(result.productsInBasket).toEqual([]);
  });

  it('Должен установить количество товара равное 15', () => {
    const expectedProductInBasket = productInBasket;
    const result = basketData.reducer(state, setCountProduct({id: expectedProductInBasket.id, count: 15}));
    expect(result.productsInBasket[0].count).toBe(15);
  });

  it('Должен установить значение промокода camera-555', () => {
    const result = basketData.reducer(state, setPromoCode('camera-555'));
    expect(result.promoCode).toBe('camera-555');
  });

  it('Должен вернуть статус видимости попапа успешного оформления заказа', () => {
    const result = basketData.reducer(state, setActivePopupOrder(false));
    expect(result.isActivePopupOrder).toBe(false);
  });

  it('Должен вернуть статус ошибки добавления промокода false', () => {
    const expectedState = {
      ...testInitialStateBasket,
      promoError: false,
      isValidPromoCode: false
    };

    const result = basketData.reducer(initialState, postCouponAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть информацию о скидке', () => {
    const promocode = 'camera-555';

    const expectedState = {
      ...testInitialStateBasket,
      discount: 35,
      promoError: false,
      isValidPromoCode: true
    };

    const result = basketData.reducer(initialState, postCouponAction.fulfilled(35, '', promocode));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть информацию об ошибке применения промокода', () => {
    const expectedState = {
      ...testInitialStateBasket,
      discount: 0,
      promoError: true,
      isValidPromoCode: false
    };

    const result = basketData.reducer(initialState, postCouponAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен очистить все данные после оформления заказа', () => {
    const mockOrder = {
      camerasIds: [1],
      coupon: 'camera-444'
    } as Order;

    const expectedState = {
      ...testInitialStateBasket,
      orderError: false,
      isValidPromoCode: false,
      promoCode: '',
      discount: 0,
      productsInBasket: [],
      isActivePopupOrder: false
    };

    const result = basketData.reducer(initialState, postOrderAction.fulfilled(1, '', mockOrder));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть информацию об ошибке оформления заказа', () => {
    const expectedState = {
      ...testInitialStateBasket,
      orderError: true
    };

    const result = basketData.reducer(initialState, postOrderAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
