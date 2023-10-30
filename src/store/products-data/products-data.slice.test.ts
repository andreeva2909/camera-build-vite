import { makeFakeProduct, makeFakeProductPromo, makeFakeReview } from '../../test-mocks/test-mocks';
import { fetchProductsAction, fetchProductsPromoAction, getProductDataAction, getReviewsAction, getSimilarProductsAction, postNewReviewAction } from '../api-actions';
import { productsData, selectProductId, setPopupAddItem, setPopupAddReview, setPopupAddReviewSuccess, testInitialState } from './products-data.slice';

describe('ProductData Slice', () => {
  const state = {
    ...testInitialState,
    products: [makeFakeProduct()],
    productsPromo: [makeFakeProductPromo()],
    selectedProductId: '34',
    selectedProductData: makeFakeProduct(),
    productData: makeFakeProduct(),
    similarProducts: [makeFakeProduct()],
    productReviews: [makeFakeReview()],
  };

  const initialState = {
    ...testInitialState
  };

  it('Должен вернуть начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialState
    };
    const result = productsData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть дефолтное начальное состояние при неизвестном состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialState
    };
    const result = productsData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть состояние попапа "Добавить товар в корзину"', () => {
    const expectedStatusPopupAddItem = true;
    const result = productsData.reducer(state, setPopupAddItem(expectedStatusPopupAddItem));
    expect(result.isActivePopupAddItem).toBe(expectedStatusPopupAddItem);
  });

  it('Должен вернуть состояние попапа "Оставить отзыв"', () => {
    const expectedStatusPopupAddReview = true;
    const result = productsData.reducer(state, setPopupAddReview(expectedStatusPopupAddReview));
    expect(result.isActivePopupAddReview).toBe(expectedStatusPopupAddReview);
  });

  it('Должен вернуть состояние попапа "Отзыв оставлен успешно"', () => {
    const expectedStatusPopupAddReviewSuccess = true;
    const result = productsData.reducer(state, setPopupAddReviewSuccess(expectedStatusPopupAddReviewSuccess));
    expect(result.isActivePopupAddReviewSuccess).toBe(expectedStatusPopupAddReviewSuccess);
  });


  it('Должен вернуть состояние выбранного id товара и информацию по нему', () => {
    const productData = makeFakeProduct();
    const expectedSelectedProductId = '4';
    const expectedState = {
      ...testInitialState,
      selectedProductId: '4',
      selectedProductData: productData
    };
    const result = productsData.reducer(expectedState, selectProductId(expectedSelectedProductId));
    expect(result.selectedProductId).toBe(expectedSelectedProductId);
    expect(result.selectedProductData).toBe(productData);
  });

  it('Должен вернуть статус загрузки информации по товарам true и статус ошибки false', () => {
    const expectedState = {
      ...testInitialState,
      isProductsDataLoading: true,
      errorProductData: false,
    };

    const result = productsData.reducer(initialState, fetchProductsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус загрузки информации по товарам false, статус ошибки false и информацию по товарам', () => {
    const products = [makeFakeProduct()];
    const expectedState = {
      ...testInitialState,
      isProductsDataLoading: false,
      errorProductData: false,
      products: products
    };

    const result = productsData.reducer(initialState, fetchProductsAction.fulfilled(products, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус загрузки информации по товарам false и статус ошибки true', () => {
    const expectedState = {
      ...testInitialState,
      isProductsDataLoading: false,
      errorProductData: true
    };

    const result = productsData.reducer(initialState, fetchProductsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус загрузки информации по товарам false, статус ошибки false и информацию по товарам', () => {
    const productsPromo = [makeFakeProductPromo()];
    const expectedState = {
      ...testInitialState,
      isProductsDataLoading: false,
      errorProductData: false,
      productsPromo: productsPromo
    };

    const result = productsData.reducer(initialState, fetchProductsPromoAction.fulfilled(productsPromo, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус загрузки информации по товарам true и статус ошибки false', () => {
    const expectedState = {
      ...testInitialState,
      isProductsDataLoading: true,
      errorProductData: false,
    };

    const result = productsData.reducer(initialState, getProductDataAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус загрузки информации по товарам false, статус ошибки false и информацию по промо товарам', () => {
    const productData = makeFakeProduct();
    const expectedState = {
      ...testInitialState,
      isProductsDataLoading: false,
      errorProductData: false,
      productData: productData
    };

    const result = productsData.reducer(initialState, getProductDataAction.fulfilled(productData, '', String(productData.id)));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус загрузки информации по товарам false и статус ошибки true', () => {
    const expectedState = {
      ...testInitialState,
      isProductsDataLoading: false,
      errorProductData: true
    };

    const result = productsData.reducer(initialState, getProductDataAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть информацию по похожим товарам', () => {
    const similarProducts = [makeFakeProduct()];
    const expectedState = {
      ...testInitialState,
      similarProducts: similarProducts
    };

    const result = productsData.reducer(initialState, getSimilarProductsAction.fulfilled(similarProducts, '', '4'));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть информацию по отзывам о товаре', () => {
    const productReviews = [makeFakeReview()];
    const expectedState = {
      ...testInitialState,
      productReviews: productReviews
    };

    const result = productsData.reducer(initialState, getReviewsAction.fulfilled(productReviews, '', '4'));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус ошибки добавления нового отзыва false', () => {
    const expectedState = {
      ...testInitialState,
      errorAddReview: false,
    };

    const result = productsData.reducer(initialState, postNewReviewAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус ошибки добавления нового отзыва false и информацию по отзывам о товаре', () => {
    const productReview = makeFakeReview();

    const expectedState = {
      ...testInitialState,
      errorAddReview: false,
      productReviews: [productReview]
    };

    const result = productsData.reducer(initialState, postNewReviewAction.fulfilled(productReview, '', productReview));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус ошибки добавления нового отзыва true', () => {
    const expectedState = {
      ...testInitialState,
      errorAddReview: true
    };

    const result = productsData.reducer(initialState, postNewReviewAction.rejected);
    expect(result).toEqual(expectedState);
  });

});
