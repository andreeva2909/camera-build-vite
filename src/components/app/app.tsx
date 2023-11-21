import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../../pages/main/main';
import ProductPage from '../../pages/product/product';
import Page404 from '../../pages/page-404/page-404';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Product} element={<ProductPage />}>
          <Route path=':id' element={<ProductPage />} />
        </Route>
        <Route path={AppRoute.Characteristics} element={<ProductPage />} />
        <Route path={AppRoute.Description} element={<ProductPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
