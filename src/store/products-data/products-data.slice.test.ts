import { CurrentSortingDirection, CurrentSortingType, FILTER_CATEGORY, FILTER_LEVEL, FILTER_TYPE } from '../../constants';
import { makeFakeProduct, makeFakeProductPromo, makeFakeReview } from '../../test-mocks/test-mocks';
import { fetchProductsAction, fetchProductsPromoAction, getProductDataAction, getReviewsAction, getSimilarProductsAction, postNewReviewAction } from '../api-actions';
import { deleteAllFilterLevels, deleteAllFilterTypes, deleteFilterLevel, deleteFilterType, productsData, selectProductId, setFilterCategory, setFilterLevel, setFilterType, setParamsFromURL, setPopupAddItem, setPopupAddReview, setPopupAddReviewSuccess, setPriceMax, setPriceMin, setSortingDirection, setSortingType, testInitialState } from './products-data.slice';

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

  it('Должен вернуть тип выбранной сортировки', () => {
    const expectedSortingType = CurrentSortingType.Price;
    const result = productsData.reducer(state, setSortingType(expectedSortingType));
    expect(result.sortingType).toBe(expectedSortingType);
  });

  it('Должен вернуть направление выбранной сортировки', () => {
    const expectedSortingDirection = CurrentSortingDirection.Up;
    const result = productsData.reducer(state, setSortingDirection(expectedSortingDirection));
    expect(result.sortingDirection).toBe(expectedSortingDirection);
  });

  it('Должен вернуть выбранный фильтр по категории', () => {
    const expectedFilterCategory = FILTER_CATEGORY[1].nameEng;
    const result = productsData.reducer(state, setFilterCategory(expectedFilterCategory));
    expect(result.filterCategory).toBe(expectedFilterCategory);
  });

  it('Должен вернуть выбранный фильтр по типу', () => {
    const expectedFilterType = FILTER_TYPE[1].nameEng;
    const result = productsData.reducer(state, setFilterType(expectedFilterType));
    expect(result.filterType).toStrictEqual([expectedFilterType]);
  });

  it('Должен удалить выбранный фильтр по типу', () => {
    const expectedFilterType = FILTER_TYPE[1].nameEng;
    const result = productsData.reducer(state, deleteFilterType(expectedFilterType));
    expect(result.filterType).toStrictEqual([]);
  });

  it('Должен удалить все выбранные фильтры по типу', () => {
    const result = productsData.reducer(state, deleteAllFilterTypes());
    expect(result.filterType).toStrictEqual([]);
  });

  it('Должен вернуть выбранный фильтр по уровню', () => {
    const expectedFilterLevel = FILTER_LEVEL[1].nameEng;
    const result = productsData.reducer(state, setFilterLevel(expectedFilterLevel));
    expect(result.filterLevel).toStrictEqual([expectedFilterLevel]);
  });

  it('Должен удалить выбранный фильтр по уровню', () => {
    const expectedFilterType = FILTER_LEVEL[1].nameEng;
    const result = productsData.reducer(state, deleteFilterLevel(expectedFilterType));
    expect(result.filterType).toStrictEqual([]);
  });

  it('Должен удалить все выбранные фильтры по уровню', () => {
    const result = productsData.reducer(state, deleteAllFilterLevels());
    expect(result.filterLevel).toStrictEqual([]);
  });

  it('Должен вернуть минимальную стоимость товара', () => {
    const expectedPriceMin = 1000;
    const result = productsData.reducer(state, setPriceMin(expectedPriceMin));
    expect(result.priceMin).toBe(expectedPriceMin);
  });

  it('Должен вернуть максимальную стоимость товара', () => {
    const expectedPriceMax = 5000;
    const result = productsData.reducer(state, setPriceMax(expectedPriceMax));
    expect(result.priceMax).toBe(expectedPriceMax);
  });

  it('Должен вернуть значения параметров из url', () => {
    const expectedPriceMin = 1000;
    const expectedPriceMax = 5000;
    const expectedSortingType = CurrentSortingType.Price;
    const expectedSortingDirection = CurrentSortingDirection.Up;
    const expectedFilterCategory = FILTER_CATEGORY[1].nameEng;
    const expectedFilterType = [FILTER_TYPE[1].nameEng];
    const expectedFilterLevel = [FILTER_LEVEL[1].nameEng];
    const params = {
      priceMin: expectedPriceMin,
      priceMax: expectedPriceMax,
      sortingType: expectedSortingType,
      sortingDirection: expectedSortingDirection,
      filterCategory: expectedFilterCategory,
      filterType: expectedFilterType,
      filterLevel: expectedFilterLevel
    };
    const result = productsData.reducer(initialState, setParamsFromURL(params));
    expect(result.priceMin).toEqual(expectedPriceMin);
    expect(result.priceMax).toEqual(expectedPriceMax);
    expect(result.sortingType).toEqual(expectedSortingType);
    expect(result.sortingDirection).toEqual(expectedSortingDirection);
    expect(result.filterCategory).toEqual(expectedFilterCategory);
    expect(result.filterType).toEqual(expectedFilterType);
    expect(result.filterLevel).toEqual(expectedFilterLevel);
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
