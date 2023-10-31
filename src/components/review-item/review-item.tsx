import { Review } from '../../types/review';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ru';
import { RATINGS } from '../../constants';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const DATE_FORMAT = 'DD MMMM';
  dayjs.extend(duration);
  return (
    <li className="review-card" data-testid='review_item'>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={review.createAt.split('T')[0]}>
          {dayjs(review.createAt).locale('ru').format(DATE_FORMAT)}
        </time>
      </div>
      <div className="rate review-card__rate">
        {RATINGS.map((rating) => (
          <svg width={17} height={16} aria-hidden="true" key={rating}>
            <use xlinkHref={`#icon${review.rating >= rating ? '-full-star' : '-star'}`} />
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {review.advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review.review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
