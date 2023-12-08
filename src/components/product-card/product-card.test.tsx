import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeProduct, makeFakeStore } from '../../test-mocks/test-mocks';
import { AppRoute, TIME_TO_RENDER_PAGE, Tab } from '../../constants';
import ProductCard from './product-card';
import { createMemoryHistory } from 'history';
import { testInitialState } from '../../store/products-data/products-data.slice';
import { testInitialStateBasket } from '../../store/basket-data/basket-data.slice';

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const mockProduct = makeFakeProduct();
    const expectedImgAlt = mockProduct.name;
    const expectedRating = `Рейтинг: ${mockProduct.rating}`;
    const expectedReviewCount = `Всего оценок: ${mockProduct.reviewCount}`;
    const expectedPrice = `Цена: ${mockProduct.price.toLocaleString()} ₽`;
    const expectedBuyButtonText = 'Купить';
    const expectedMoreDetailsButtonText = 'Подробнее';
    const expectedTest = 'product_card';
    const withHistoryComponent =
      withHistory(<ProductCard product={mockProduct} />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        Data: {
          ...testInitialState
        },
        Basket: {
          ...testInitialStateBasket
        }
      }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByAltText(expectedImgAlt)).toBeInTheDocument();
      expect(screen.getByText(expectedReviewCount)).toBeInTheDocument();
      expect(screen.getByText(expectedRating)).toBeInTheDocument();
      expect(screen.getByText(expectedPrice)).toBeInTheDocument();
      expect(screen.getByText(expectedBuyButtonText)).toBeInTheDocument();
      expect(screen.getByText(expectedMoreDetailsButtonText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('should go to product page', () => {
    const mockHistory = createMemoryHistory();
    const mockProductData = makeFakeProduct();
    const withHistoryComponent =
      withHistory(<ProductCard product={mockProductData} />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        Data: {
          ...testInitialState,
          productData: mockProductData,
        },
        Basket: {
          ...testInitialStateBasket
        }
      }));
    mockHistory.push(`${AppRoute.Product}/${mockProductData.id}/${Tab.Characteristics}`);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(mockProductData.name)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

});
