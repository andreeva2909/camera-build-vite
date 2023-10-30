import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';
import { makeFakeProduct } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';
import ProductCardList from './product-card-list';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockProducts = [makeFakeProduct(), makeFakeProduct(), makeFakeProduct()];
    const expectedTest = 'product_list';
    const expectedItemTest = 'product_item';
    const expectedProductsQuantity = mockProducts.length;
    const { withStoreComponent } = withStore(<ProductCardList products={mockProducts} />, {
      Data: {
        ...testInitialState,
        products: mockProducts
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getAllByTestId(expectedItemTest)).toBe(expectedProductsQuantity);
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
