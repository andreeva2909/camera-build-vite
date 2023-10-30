import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import PopupAddReviewSuccess from './popup-add-review-success';

describe('Component: PopupAddReviewSuccess', () => {
  it('should render correctly', () => {
    const expectedText = 'Спасибо за отзыв';
    const expectedLinkText = 'Вернуться к покупкам';
    const { withStoreComponent } = withStore(<PopupAddReviewSuccess />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
