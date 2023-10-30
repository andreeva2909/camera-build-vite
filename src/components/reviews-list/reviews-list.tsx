import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductReviews } from '../../store/products-data/products-data.selectors';
import { setPopupAddReview } from '../../store/products-data/products-data.slice';
import { sortReviews } from '../../utils';
import ReviewItem from '../review-item/review-item';
import { useState, MouseEventHandler } from 'react';

function ReviewsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const productReviews = useAppSelector(getProductReviews);
  const sortedReviews = productReviews.slice().sort(sortReviews);
  const [countReviews, setCountReviews] = useState(3);

  const handleMoreReviewsButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setCountReviews(countReviews + 3);
  };

  const handleAddReviewButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddReview(true));
  };

  return (
    <div className="page-content__section" data-testid="reviews_list">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={handleAddReviewButton}>
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {sortedReviews.slice(0, countReviews).map((review) => (
              <ReviewItem key={review.id} review={review} data-testid='review_item'/>
            ))}
          </ul>
          {!(countReviews >= sortedReviews.length) &&
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button" onClick={handleMoreReviewsButton}>
              Показать больше отзывов
            </button>
          </div>}
        </div>
      </section>
    </div>
  );
}

export default ReviewsList;
