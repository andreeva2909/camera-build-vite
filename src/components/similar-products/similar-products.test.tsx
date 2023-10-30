import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';
import SimilarProducts from './similar-products';
import { TIME_TO_RENDER_PAGE } from '../../constants';

describe('Component: SimilarProducts', () => {
  it('should render correctly', () => {
    const expectedHeader = 'Похожие товары';
    const expectedTest = 'similar_products';
    const { withStoreComponent } = withStore(<SimilarProducts />, {
      Data: {
        ...testInitialState
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByText(expectedHeader)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
