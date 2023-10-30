import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeProduct, makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';
import PopupAddItem from './popup-add-item';
import { createMemoryHistory } from 'history';
import { testInitialState } from '../../store/products-data/products-data.slice';

describe('Component: PopupAddItem', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const mockProduct = makeFakeProduct();
    const expectedHeaderText = 'Добавить товар в корзину';
    const expectedImgAlt = mockProduct.name;
    const expectedName = mockProduct.name;
    const expectedVendorCode = `Артикул: ${mockProduct.vendorCode}`;
    const expectedType = `${mockProduct.type} фотокамера`;
    const expectedLevel = `${mockProduct.level} фотокамера`;
    const expectedPrice = `Цена: ${mockProduct.price.toLocaleString()} ₽`;
    const expectedAddToBasketText = 'Добавить в корзину';
    const expectedTest = 'popup_add_item';
    const withHistoryComponent = withHistory(<PopupAddItem />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        Data: {
          ...testInitialState,
          selectedProductId: String(mockProduct.id),
          selectedProductData: mockProduct,
        }
      }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByAltText(expectedImgAlt)).toBeInTheDocument();
      expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByText(expectedName)).toBeInTheDocument();
      expect(screen.getByText(expectedPrice)).toBeInTheDocument();
      expect(screen.getByText(expectedVendorCode)).toBeInTheDocument();
      expect(screen.getByText(expectedType)).toBeInTheDocument();
      expect(screen.getByText(expectedLevel)).toBeInTheDocument();
      expect(screen.getByText(expectedAddToBasketText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

});
