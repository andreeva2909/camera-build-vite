import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../../pages/main/main';
import { useEffect } from 'react';
import { fetchProductsAction, fetchProductsPromoAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ProductPage from '../../pages/product/product';
import Loader from '../loader/loader';
import { getStatusLoadingProductData } from '../../store/products-data/products-data.selectors';
import Page404 from '../../pages/page-404/page-404';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isProductDataLoading = useAppSelector(getStatusLoadingProductData);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchProductsPromoAction());
  }, [dispatch]);

  if (isProductDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Product} element={<ProductPage />}>
        <Route path=':id' element={<ProductPage />} />
      </Route>
      <Route path={AppRoute.Characteristics} element={<ProductPage />} />
      <Route path={AppRoute.Description} element={<ProductPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;
