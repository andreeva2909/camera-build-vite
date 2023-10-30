import { SliceName } from '../../constants';
import { makeFakeProduct, makeFakeProductPromo, makeFakeReview } from '../../test-mocks/test-mocks';
import { getActivePopupAddItem, getActivePopupAddReview, getActivePopupAddReviewSuccess, getAllProducts, getAllProductsPromo, getErrorAddReview, getErrorProductData, getProductData, getProductReviews, getSelectedProductData, getSelectedProductId, getSimilarProducts, getStatusLoadingProductData } from './products-data.selectors';
import { testInitialState } from './products-data.slice';

describe('Селекторы ProductsData', () => {
  const state = {
    [SliceName.Data]: {
      ...testInitialState,
      products: [makeFakeProduct()],
      productsPromo: [makeFakeProductPromo()],
      selectedProductId: '34',
      selectedProductData: makeFakeProduct(),
      productData: makeFakeProduct(),
      similarProducts: [makeFakeProduct()],
      productReviews: [makeFakeReview()],
    }
  };

  it('Должен получить список всех товаров', () => {
    const { products } = state[SliceName.Data];
    const result = getAllProducts(state);
    expect(result).toEqual(products);
  });

  it('Должен получить список промо товаров', () => {
    const { productsPromo } = state[SliceName.Data];
    const result = getAllProductsPromo(state);
    expect(result).toEqual(productsPromo);
  });

  it('Должен получить статус попапа "Добавить товар в корзину"', () => {
    const { isActivePopupAddItem } = state[SliceName.Data];
    const result = getActivePopupAddItem(state);
    expect(result).toBe(isActivePopupAddItem);
  });

  it('Должен получить статус попапа "Оставить отзыв"', () => {
    const { isActivePopupAddReview } = state[SliceName.Data];
    const result = getActivePopupAddReview(state);
    expect(result).toBe(isActivePopupAddReview);
  });

  it('Должен получить статус попапа "Отзыв оставлен успешно"', () => {
    const { isActivePopupAddReviewSuccess } = state[SliceName.Data];
    const result = getActivePopupAddReviewSuccess(state);
    expect(result).toBe(isActivePopupAddReviewSuccess);
  });

  it('Должен получить id выбранного товара', () => {
    const { selectedProductId } = state[SliceName.Data];
    const result = getSelectedProductId(state);
    expect(result).toBe(selectedProductId);
  });

  it('Должен получить информацию о выбранном товаре', () => {
    const { selectedProductData } = state[SliceName.Data];
    const result = getSelectedProductData(state);
    expect(result).toEqual(selectedProductData);
  });

  it('Должен получить информацию о товаре с сервера', () => {
    const { productData } = state[SliceName.Data];
    const result = getProductData(state);
    expect(result).toEqual(productData);
  });

  it('Должен получить информацию о статуса загрузки данных по товарам с сервера', () => {
    const { isProductsDataLoading } = state[SliceName.Data];
    const result = getStatusLoadingProductData(state);
    expect(result).toBe(isProductsDataLoading);
  });

  it('Должен получить информацию о похожих товарах', () => {
    const { similarProducts } = state[SliceName.Data];
    const result = getSimilarProducts(state);
    expect(result).toEqual(similarProducts);
  });

  it('Должен получить информацию об отзывах по товару', () => {
    const { productReviews } = state[SliceName.Data];
    const result = getProductReviews(state);
    expect(result).toEqual(productReviews);
  });

  it('Должен получить информацию об ошибке запроса данных о товаре с сервера', () => {
    const { errorProductData } = state[SliceName.Data];
    const result = getErrorProductData(state);
    expect(result).toBe(errorProductData);
  });

  it('Должен получить информацию об ошибке добавления отзыва о товаре', () => {
    const { errorAddReview } = state[SliceName.Data];
    const result = getErrorAddReview(state);
    expect(result).toBe(errorAddReview);
  });

});
