import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../../pages/main/main';
import ProductPage from '../../pages/product/product';
import Page404 from '../../pages/page-404/page-404';
import BasketPage from '../../pages/basket/basket';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Product} element={<ProductPage />}>
        <Route path=':id' element={<ProductPage />} />
      </Route>
      <Route path={AppRoute.Characteristics} element={<ProductPage />} />
      <Route path={AppRoute.Description} element={<ProductPage />} />
      <Route path={AppRoute.Basket} element={<BasketPage />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;
