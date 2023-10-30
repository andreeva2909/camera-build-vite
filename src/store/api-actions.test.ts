import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppThunkDispatch, extractActionTypes, makeFakeProduct, makeFakeProductPromo, makeFakeReview, makeFakeUserReview } from '../test-mocks/test-mocks';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../constants';
import { fetchProductsAction, fetchProductsPromoAction, getProductDataAction, getReviewsAction, getSimilarProductsAction, postNewReviewAction } from './api-actions';
import { State } from '../types/state';

describe('Асинхронные операции', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator =
    configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ Data: { products: [] } });
  });

  describe('fetchProductsAction', () => {
    it('Должен вернуть массив товаров при коде ответа сервера 200', async () => {
      const mockProducts = [makeFakeProduct()];
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockProducts);

      await store.dispatch(fetchProductsAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchProductsActionFulfilled = emittedActions[1] as ReturnType<typeof fetchProductsAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchProductsAction.pending.type,
        fetchProductsAction.fulfilled.type
      ]);

      expect(fetchProductsActionFulfilled.payload).toEqual(mockProducts);
    });

    it(
      'Должен вернуть fetchOffersAction.pending и fetchOffersAction.rejected при коде 400',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

        await store.dispatch(fetchProductsAction());

        const actions = extractActionTypes(store.getActions());

        expect(actions).toEqual([
          fetchProductsAction.pending.type,
          fetchProductsAction.rejected.type
        ]);
      });

  });

  describe('fetchProductsPromoAction', () => {
    it('Должен вернуть массив промо товаров при коде ответа сервера 200', async () => {
      const mockProductsPromo = [makeFakeProductPromo()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockProductsPromo);

      await store.dispatch(fetchProductsPromoAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchProductsActionPromoFulfilled = emittedActions[1] as ReturnType<typeof fetchProductsPromoAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchProductsPromoAction.pending.type,
        fetchProductsPromoAction.fulfilled.type
      ]);

      expect(fetchProductsActionPromoFulfilled.payload).toEqual(mockProductsPromo);
    });

    it(
      'Должен вернуть fetchProductsPromoAction.pending и fetchProductsPromoAction.rejected при коде 400',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

        await store.dispatch(fetchProductsPromoAction());

        const actions = extractActionTypes(store.getActions());

        expect(actions).toEqual([
          fetchProductsPromoAction.pending.type,
          fetchProductsPromoAction.rejected.type
        ]);
      });

  });

  describe('getProductDataAction', () => {
    const mockProductData = makeFakeProduct();
    it('Должен вернуть данные для страницы товара при коде ответа сервера 200', async () => {

      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}`)
        .reply(200, mockProductData);

      await store.dispatch(getProductDataAction(String(mockProductData.id)));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const getProductDataActionFulfilled = emittedActions[1] as ReturnType<typeof getProductDataAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        getProductDataAction.pending.type,
        getProductDataAction.fulfilled.type
      ]);

      expect(getProductDataActionFulfilled.payload).toEqual(mockProductData);
    });

    it('Должен вернуть getProductDataAction.pending и getProductDataAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}`).reply(400, []);

      await store.dispatch(getProductDataAction(String(mockProductData.id)));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        getProductDataAction.pending.type,
        getProductDataAction.rejected.type
      ]);
    });
  });

  describe('getSimilarProductsAction', () => {
    const mockProductData = makeFakeProduct();
    it('Должен вернуть данные по похожим товарам при коде ответа сервера 200', async () => {

      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}${APIRoute.Similar}`)
        .reply(200, mockProductData);

      await store.dispatch(getSimilarProductsAction(String(mockProductData.id)));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const getSimilarProductsActionFulfilled = emittedActions[1] as ReturnType<typeof getSimilarProductsAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        getSimilarProductsAction.pending.type,
        getSimilarProductsAction.fulfilled.type
      ]);

      expect(getSimilarProductsActionFulfilled.payload).toEqual(mockProductData);
    });

    it('Должен вернуть getSimilarProductsAction.pending и getSimilarProductsAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}${APIRoute.Similar}`).reply(400, []);

      await store.dispatch(getSimilarProductsAction(String(mockProductData.id)));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        getSimilarProductsAction.pending.type,
        getSimilarProductsAction.rejected.type
      ]);
    });
  });

  describe('getReviewsAction', () => {
    const mockProductData = makeFakeProduct();
    const mockReviews = [makeFakeReview()];
    it('Должен вернуть данные по отзывам товара при коде ответа сервера 200', async () => {

      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}${APIRoute.Reviews}`)
        .reply(200, mockReviews);

      await store.dispatch(getReviewsAction(String(mockProductData.id)));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const getReviewsActionFulfilled = emittedActions[1] as ReturnType<typeof getReviewsAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        getReviewsAction.pending.type,
        getReviewsAction.fulfilled.type
      ]);

      expect(getReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('Должен вернуть getReviewsAction.pending и getReviewsAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockProductData.id}${APIRoute.Reviews}`).reply(400, []);

      await store.dispatch(getReviewsAction(String(mockProductData.id)));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        getReviewsAction.pending.type,
        getReviewsAction.rejected.type
      ]);
    });
  });

  describe('postNewReviewAction', () => {
    const mockUserReview = makeFakeUserReview();

    it('Проверяем ответ при коде ответа сервера 200', async () => {

      mockAxiosAdapter.onPost(APIRoute.Reviews)
        .reply(200, mockUserReview);

      await store.dispatch(postNewReviewAction(mockUserReview));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const postNewReviewActionFulfilled = emittedActions[1] as ReturnType<typeof postNewReviewAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        postNewReviewAction.pending.type,
        postNewReviewAction.fulfilled.type
      ]);

      expect(postNewReviewActionFulfilled.payload).toEqual(mockUserReview);
    });

    it('Проверяем ответ при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(400, []);

      await store.dispatch(postNewReviewAction(mockUserReview));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        postNewReviewAction.pending.type,
        postNewReviewAction.rejected.type
      ]);
    });
  });
});
