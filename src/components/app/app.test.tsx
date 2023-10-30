import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeProduct, makeFakeStore } from '../../test-mocks/test-mocks';
import { AppRoute, TIME_TO_RENDER_PAGE } from '../../constants';
import { render, screen } from '@testing-library/react';
import App from './app';
import { testInitialState } from '../../store/products-data/products-data.slice';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('should render "Page404" when user navigate to unknown route', () => {
    const expectedHeaderText = '404 page not found';
    const expectedLinkText = 'Вернуться на главную страницу';
    const unknownRoute = '/unknown-route';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('should render "ProductPage" when user navigate to unknown route', () => {
    const productData = makeFakeProduct();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        Data: {
          ...testInitialState,
          productData: productData,
        }
      }));
    mockHistory.push(AppRoute.Characteristics);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(productData.name)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
