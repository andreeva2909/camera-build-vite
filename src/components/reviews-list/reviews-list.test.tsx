import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { testInitialState } from '../../store/products-data/products-data.slice';
import ReviewsList from './reviews-list';
import { makeFakeReview } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
    const expectedHeaderText = 'Отзывы';
    const expectedTest = 'reviews_list';
    const expectedItemTest = 'reviews_item';
    const expectedReviewsQuantity = mockReviews.length;
    const { withStoreComponent } = withStore(<ReviewsList />, {
      Data: {
        ...testInitialState,
        productReviews: mockReviews
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getAllByTestId(expectedItemTest)).toBe(expectedReviewsQuantity);
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
