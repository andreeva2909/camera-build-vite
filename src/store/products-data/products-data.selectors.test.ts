import { SliceName } from '../../constants';
import { makeFakeProduct, makeFakeProductPromo, makeFakeReview } from '../../test-mocks/test-mocks';
import { filterProductsByCategory, filterProductsByLevel, filterProductsByPrice, filterProductsByType, getMaximumPriceProduct, getMinumimumPriceProduct, sortProducts } from '../../utils';
import { getActivePopupAddItem, getActivePopupAddReview, getActivePopupAddReviewSuccess, getAllProducts, getAllProductsPromo, getCurrentFilterCategory, getCurrentFilterLevel, getCurrentFilterType, getCurrentPriceMax, getCurrentPriceMin, getCurrentSortingDirection, getCurrentSortingType, getErrorAddReview, getErrorProductData, getFilteredProductsByCategory, getFilteredProductsByPrice, getFilteredProductsByType, getMaxPriceProduct, getMinPriceProduct, getProductData, getProductReviews, getSelectedProductData, getSelectedProductId, getSimilarProducts, getSortedProducts, getStatusLoadingProductData } from './products-data.selectors';
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

  it('Должен получить информацию о статусе загрузки данных по товарам с сервера', () => {
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

  it('Должен получить информацию о выбранном типе сортировки', () => {
    const { sortingType } = state[SliceName.Data];
    const result = getCurrentSortingType(state);
    expect(result).toBe(sortingType);
  });

  it('Должен получить информацию о выбранном направлении сортировки', () => {
    const { sortingDirection } = state[SliceName.Data];
    const result = getCurrentSortingDirection(state);
    expect(result).toBe(sortingDirection);
  });

  it('Должен получить список отсортированных товаров', () => {
    const { products, sortingType, sortingDirection } = state[SliceName.Data];
    const result = getSortedProducts(state);
    expect(result).toEqual(sortProducts(products, sortingType, sortingDirection));
  });

  it('Должен получить информацию о выбранном фильтре по категории', () => {
    const { filterCategory } = state[SliceName.Data];
    const result = getCurrentFilterCategory(state);
    expect(result).toBe(filterCategory);
  });

  it('Должен получить информацию о выбранном фильтре по типу', () => {
    const { filterType } = state[SliceName.Data];
    const result = getCurrentFilterType(state);
    expect(result).toBe(filterType);
  });

  it('Должен получить информацию о выбранном фильтре по уровню', () => {
    const { filterLevel } = state[SliceName.Data];
    const result = getCurrentFilterLevel(state);
    expect(result).toBe(filterLevel);
  });

  it('Должен получить информацию о введенной пользователем минимальной стоимости товара', () => {
    const { priceMin } = state[SliceName.Data];
    const result = getCurrentPriceMin(state);
    expect(result).toBe(priceMin);
  });

  it('Должен получить информацию о введенной пользователем максимальной стоимости товара', () => {
    const { priceMax } = state[SliceName.Data];
    const result = getCurrentPriceMax(state);
    expect(result).toBe(priceMax);
  });

  it('Должен получить список отфильтрованныx товаров по категории', () => {
    const { products, filterCategory } = state[SliceName.Data];
    const result = getFilteredProductsByCategory(state);
    expect(result).toEqual(products.slice().filter((product) => filterProductsByCategory(product, filterCategory)));
  });

  it('Должен получить список отфильтрованныx товаров по типу', () => {
    const { products, filterType } = state[SliceName.Data];
    const result = getFilteredProductsByType(state);
    expect(result).toEqual(filterProductsByType(products, filterType));
  });

  it('Должен получить список отфильтрованныx товаров по уровню', () => {
    const { products, filterLevel } = state[SliceName.Data];
    const result = getFilteredProductsByType(state);
    expect(result).toEqual(filterProductsByLevel(products, filterLevel));
  });

  it('Должен получить минимальную стоимость товара', () => {
    const { products } = state[SliceName.Data];
    const result = getMinPriceProduct(state);
    expect(result).toEqual(getMinumimumPriceProduct(products));
  });

  it('Должен получить максимальную стоимость товара', () => {
    const { products } = state[SliceName.Data];
    const result = getMaxPriceProduct(state);
    expect(result).toEqual(getMaximumPriceProduct(products));
  });

  it('Должен получить список отфильтрованныx товаров по стоимости', () => {
    const { products, priceMin, priceMax } = state[SliceName.Data];
    const result = getFilteredProductsByPrice(state);
    expect(result).toEqual(products?.slice().filter((product) => filterProductsByPrice(product, priceMin, priceMax, 5000)));
  });
});
