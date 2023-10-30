import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeReview } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../constants';
import ReviewItem from './review-item';
import dayjs from 'dayjs';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const DATE_FORMAT = 'DD MMMM';
    const mockReview = makeFakeReview();
    const expectedUserName = mockReview.userName;
    const expectedDate = dayjs(mockReview.createAt).locale('ru').format(DATE_FORMAT);
    const expectedRating = `Оценка: ${mockReview.rating}`;
    const expectedAdvantage = mockReview.advantage;
    const expectedDisadvantage = mockReview.disadvantage;
    const expectedReview = mockReview.review;
    const expectedTest = 'review_item';
    const { withStoreComponent } = withStore(<ReviewItem review={mockReview}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByText(expectedUserName)).toBeInTheDocument();
      expect(screen.getByText(expectedDate)).toBeInTheDocument();
      expect(screen.getByText(expectedRating)).toBeInTheDocument();
      expect(screen.getByText(expectedAdvantage)).toBeInTheDocument();
      expect(screen.getByText(expectedDisadvantage)).toBeInTheDocument();
      expect(screen.getByText(expectedReview)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
