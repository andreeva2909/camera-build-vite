import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeProduct, makeFakeReview, makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';
import { createMemoryHistory } from 'history';
import { testInitialState } from '../../store/products-data/products-data.slice';
import { testInitialStateBasket } from '../../store/basket-data/basket-data.slice';
import ProductPage from './product';
window.scrollTo = vi.fn().mockImplementation(() => null);
describe('Component: ProductPage', () => {

  const mockHistory = createMemoryHistory();
  const mockProduct = makeFakeProduct();
  const mockSimilarProducts = [makeFakeProduct()];
  const mockReviews = [makeFakeReview()];
  const withHistoryComponent = withHistory(<ProductPage />, mockHistory);
  const { withStoreComponent } = withStore(
    withHistoryComponent,
    makeFakeStore({
      Data: {
        ...testInitialState,
        productData: mockProduct,
        similarProducts: mockSimilarProducts,
        productReviews: mockReviews
      },
      Basket: {
        ...testInitialStateBasket
      }
    }));
  it('should render correctly', () => {
    const expectedImgAlt = mockProduct.name;
    const expectedHeaderText = mockProduct.name;
    const expectedRating = `Рейтинг: ${mockProduct.rating}`;
    const expectedReviewCount = `Всего оценок: ${mockProduct.reviewCount}`;
    const expectedPrice = `Цена: ${mockProduct.price.toLocaleString()} ₽`;
    const expectedAddToBasketButtonText = 'Добавить в корзину';
    const expectedTabCharacteristicsText = 'Характеристики';
    const expectedTabDescriptionText = 'Описание';
    const expectedVendorCode = `Артикул: ${mockProduct.vendorCode}`;
    const expectedCategory = `Категория: ${mockProduct.category}`;
    const expectedType = `Тип камеры: ${mockProduct.type}`;
    const expectedLevel = `Уровень: ${mockProduct.level}`;
    const expectedTest = 'product_card';
    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByAltText(expectedImgAlt)).toBeInTheDocument();
      expect(screen.getByAltText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByText(expectedReviewCount)).toBeInTheDocument();
      expect(screen.getByText(expectedRating)).toBeInTheDocument();
      expect(screen.getByText(expectedPrice)).toBeInTheDocument();
      expect(screen.getByText(expectedAddToBasketButtonText)).toBeInTheDocument();
      expect(screen.getByText(expectedTabCharacteristicsText)).toBeInTheDocument();
      expect(screen.getByText(expectedTabDescriptionText)).toBeInTheDocument();
      expect(screen.getByText(expectedVendorCode)).toBeInTheDocument();
      expect(screen.getByText(expectedCategory)).toBeInTheDocument();
      expect(screen.getByText(expectedType)).toBeInTheDocument();
      expect(screen.getByText(expectedLevel)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('should get similar products', () => {
    const similarProductsText = 'Похожие товары';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(similarProductsText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
  it('should get reviews', () => {
    const reviewsText = 'Отзывы';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(reviewsText))
        .toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

});
