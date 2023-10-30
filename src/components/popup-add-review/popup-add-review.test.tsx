import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeStore, makeFakeUserReview } from '../../test-mocks/test-mocks';
import { APIRoute, TIME_TO_RENDER_PAGE } from '../../constants';
import PopupAddReview from './popup-add-review';
import userEvent from '@testing-library/user-event';

describe('Component: PopupAddReview', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Оставить отзыв';
    const expectedRatingText = 'Рейтинг';
    const expectedEnterName = 'Ваше имя';
    const expectedEnterAdvantages = 'Достоинства';
    const expectedEnterDisadvantages = 'Недостатки';
    const expectedEnterReview = 'Комментарий';
    const expectedButtonText = 'Отправить отзыв';
    const expectedTest = 'popup_add_review';
    const withHistoryComponent = withHistory(<PopupAddReview />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({}));
    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getByAltText(expectedHeaderText)).toBeInTheDocument();
      expect(screen.getByText(expectedRatingText)).toBeInTheDocument();
      expect(screen.getByText(expectedEnterName)).toBeInTheDocument();
      expect(screen.getByText(expectedEnterAdvantages)).toBeInTheDocument();
      expect(screen.getByText(expectedEnterDisadvantages)).toBeInTheDocument();
      expect(screen.getByText(expectedEnterReview)).toBeInTheDocument();
      expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('imitate user actions when entering data correctly', async () => {
    const mockReview = makeFakeUserReview();
    const expectedRatingValue = String(mockReview.rating);
    const expectedUserName = mockReview.userName;
    const expectedAdvantagesValue = mockReview.advantage;
    const expectedDisadvantagesValue = mockReview.disadvantage;
    const expectedReviewValue = mockReview.review;
    const ratingElementTestId = `rating_${mockReview.rating}_value`;
    const userNameElementTestId = 'username_value';
    const advantageElementTestId = 'advantage_value';
    const disadvantageElementTestId = 'disadvantage_value';
    const reviewElementTestId = 'review_value';
    const expectedTest = 'popup_add_review';
    const withHistoryComponent = withHistory(<PopupAddReview />);
    const { withStoreComponent, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      makeFakeStore({}));
    mockAxiosAdapter.onPost(APIRoute.Reviews)
      .reply(200, mockReview);

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(ratingElementTestId), expectedRatingValue
    );
    await userEvent.type(
      screen.getByTestId(userNameElementTestId), expectedUserName
    );
    await userEvent.type(
      screen.getByTestId(advantageElementTestId), expectedAdvantagesValue
    );
    await userEvent.type(
      screen.getByTestId(disadvantageElementTestId), expectedDisadvantagesValue
    );
    await userEvent.type(
      screen.getByTestId(reviewElementTestId), expectedReviewValue
    );

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(expectedTest)).toBeInTheDocument();
      expect(screen.getAllByDisplayValue(expectedRatingValue)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedUserName)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedAdvantagesValue)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedDisadvantagesValue)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

});
