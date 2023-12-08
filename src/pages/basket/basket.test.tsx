import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeProductInBasket, makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';
import { createMemoryHistory } from 'history';
import { testInitialState } from '../../store/products-data/products-data.slice';
import { testInitialStateBasket } from '../../store/basket-data/basket-data.slice';
import BasketPage from './basket';
window.scrollTo = vi.fn().mockImplementation(() => null);
describe('Component: ProductPage', () => {

  const mockHistory = createMemoryHistory();
  const mockProductInBasket = [makeFakeProductInBasket()];
  const withHistoryComponent = withHistory(<BasketPage />, mockHistory);
  const { withStoreComponent } = withStore(
    withHistoryComponent,
    makeFakeStore({
      Data: {
        ...testInitialState
      },
      Basket: {
        ...testInitialStateBasket,
        productsInBasket: mockProductInBasket
      }
    }));
  it('should render correctly', () => {
    const expectedHeaderText = 'Корзина';
    const expectedPrice = `Цена: ${mockProductInBasket[0].price.toLocaleString()} ₽`;
    const expectedAddToBasketButtonText = 'Оформить заказ';
    const expectedVendorCode = `Артикул: ${mockProductInBasket[0].vendorCode}`;
    const expectedType = `${mockProductInBasket[0].type}`;
    const expectedLevel = `${mockProductInBasket[0].level} уровень`;
    const expectedTest = 'basket_page';
    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByAltText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByText(expectedPrice)).toBeInTheDocument();
      expect(screen.getByText(expectedAddToBasketButtonText)).toBeInTheDocument();
      expect(screen.getByText(expectedVendorCode)).toBeInTheDocument();
      expect(screen.getByText(expectedType)).toBeInTheDocument();
      expect(screen.getByText(expectedLevel)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
