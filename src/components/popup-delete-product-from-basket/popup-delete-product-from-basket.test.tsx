import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeProductInBasket, makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';
import { createMemoryHistory } from 'history';
import { testInitialState } from '../../store/products-data/products-data.slice';
import { testInitialStateBasket } from '../../store/basket-data/basket-data.slice';
import PopupDeleteProductFromBasket from './popup-delete-product-from-basket';

describe('Component: PopupDeleteProductFromBasket', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const mockProduct = makeFakeProductInBasket();
    const expectedHeaderText = 'Удалить этот товар?';
    const expectedTest = 'popup_delete_product_from_basket';
    const expectedImgAlt = mockProduct.name;
    const expectedName = mockProduct.name;
    const expectedVendorCode = `Артикул: ${mockProduct.vendorCode}`;
    const expectedType = `${mockProduct.type} фотокамера`;
    const expectedLevel = `${mockProduct.level} уровень`;
    const withHistoryComponent = withHistory(<PopupDeleteProductFromBasket />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        Data: {
          ...testInitialState,
        },
        Basket: {
          ...testInitialStateBasket
        }
      }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByAltText(expectedImgAlt)).toBeInTheDocument();
      expect(screen.getByText(expectedName)).toBeInTheDocument();
      expect(screen.getByText(expectedVendorCode)).toBeInTheDocument();
      expect(screen.getByText(expectedType)).toBeInTheDocument();
      expect(screen.getByText(expectedLevel)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

});
