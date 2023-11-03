import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPopupAddReview, setPopupAddReviewSuccess } from '../../store/products-data/products-data.slice';
import { getErrorAddReview, getProductData } from '../../store/products-data/products-data.selectors';
import { MAX_VALUE_RATING, MIN_VALUE_RATING, ReviewTextFieldLengthLimit } from '../../constants';
import { postNewReviewAction } from '../../store/api-actions';
import useScroll from '../../hooks/use-scroll';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

function PopupAddReview(): JSX.Element {
  const dispatch = useAppDispatch();
  const { showScroll, hideScroll } = useScroll();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const productData = useAppSelector(getProductData);
  const errorAddReview = useAppSelector(getErrorAddReview);
  hideScroll();
  const ratingData = [
    { value: 5, title: 'Отлично' },
    { value: 4, title: 'Хорошо' },
    { value: 3, title: 'Нормально' },
    { value: 2, title: 'Плохо' },
    { value: 1, title: 'Ужасно' }
  ];
  const [userRating, setUserRating] = useState(0);

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddReview(false));
    showScroll();
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setPopupAddReview(false));
      showScroll();
    }
  };

  const handleRatingChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);
    setUserRating(value);
  };


  const handleReviewFormSubmit: SubmitHandler<FieldValues> = (data) => {
    const { rating } = data;
    const convertedRating = Number(rating);
    data.rating = convertedRating;
    data.cameraId = productData.id;
    dispatch(postNewReviewAction(data));
    if (!errorAddReview) {
      dispatch(setPopupAddReview(false));
      dispatch(setPopupAddReviewSuccess(true));
    }
  };

  return (
    <div className="modal is-active" onKeyDown={handleKeyButton} data-testid='popup_add_review'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton} />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post"
              onSubmit={(event) =>
                void handleSubmit(handleReviewFormSubmit)(event)}
            >
              <div className="form-review__rate">
                <fieldset className="rate form-review__item is-invalid">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {ratingData.map((rating) => (
                        <React.Fragment key={rating.title}>
                          <input
                            className="visually-hidden"
                            id={`star-${rating.value}`}
                            type="radio"
                            defaultValue={rating.value}
                            data-testid={`rating_${rating.value}_value`}
                            {...register('rating', {
                              required: true,
                              minLength: MIN_VALUE_RATING,
                              maxLength: MAX_VALUE_RATING,
                            })}
                            onChange={handleRatingChange}
                            aria-invalid={errors.rate ? 'true' : 'false'}
                          />
                          <label
                            className="rate__label"
                            htmlFor={`star-${rating.value}`}
                            title={rating.title}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{userRating}</span> <span>/</span>{' '}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {(errors.rating && userRating === 0) &&
                    <p className="rate__message">Нужно оценить товар</p>}
                </fieldset>
                <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Введите ваше имя"
                      autoFocus
                      data-testid='username_value'
                      {...register('userName', {
                        required: true,
                        minLength: ReviewTextFieldLengthLimit.Minimum,
                        maxLength: ReviewTextFieldLengthLimit.Maximum,
                      })}
                      aria-invalid={errors.userName ? 'true' : 'false'}
                    />
                  </label>
                  {errors.userName?.type === 'required' &&
                    <><br /><p className="custom-input__error">Нужно указать имя</p></>}
                  {errors.userName?.type === 'minLength' &&
                    <><br /><p className="custom-input__error">Миниальное количество символов {ReviewTextFieldLengthLimit.Minimum}</p></>}
                  {errors.userName?.type === 'maxLength' &&
                    <><br /><p className="custom-input__error">Максимальное количество символов {ReviewTextFieldLengthLimit.Maximum}</p></>}
                </div>
                <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Основные преимущества товара"
                      data-testid='advantage_value'
                      {...register('advantage', {
                        required: true,
                        minLength: ReviewTextFieldLengthLimit.Minimum,
                        maxLength: ReviewTextFieldLengthLimit.Maximum,
                      })}
                      aria-invalid={errors.advantage ? 'true' : 'false'}
                    />
                  </label>
                  {errors.advantage?.type === 'required' &&
                    <><br /><p className="custom-input__error">Нужно указать достоинства</p></>}
                  {errors.advantage?.type === 'minLength' &&
                    <><br /><p className="custom-input__error">Миниальное количество символов {ReviewTextFieldLengthLimit.Minimum}</p></>}
                  {errors.advantage?.type === 'maxLength' &&
                    <><br /><p className="custom-input__error">Максимальное количество символов {ReviewTextFieldLengthLimit.Maximum}</p></>}
                </div>
                <div className={`custom-input form-review__item ${errors.disadvantage ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Главные недостатки товара"
                      data-testid='disadvantage_value'
                      {...register('disadvantage', {
                        required: true,
                        minLength: ReviewTextFieldLengthLimit.Minimum,
                        maxLength: ReviewTextFieldLengthLimit.Maximum,
                      })}
                      aria-invalid={errors.disadvantage ? 'true' : 'false'}
                    />
                  </label>
                  {errors.disadvantage?.type === 'required' &&
                    <><br /><p className="custom-input__error">Нужно указать недостатки</p></>}
                  {errors.disadvantage?.type === 'minLength' &&
                    <><br /><p className="custom-input__error">Миниальное количество символов {ReviewTextFieldLengthLimit.Minimum}</p></>}
                  {errors.disadvantage?.type === 'maxLength' &&
                    <><br /><p className="custom-input__error">Максимальное количество символов {ReviewTextFieldLengthLimit.Maximum}</p></>}
                </div>
                <div className={`custom-textarea form-review__item ${errors.review ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      placeholder="Поделитесь своим опытом покупки"
                      defaultValue={''}
                      data-testid='review_value'
                      {...register('review', {
                        required: true,
                        minLength: ReviewTextFieldLengthLimit.Minimum,
                        maxLength: ReviewTextFieldLengthLimit.Maximum,
                      })}
                      aria-invalid={errors.review ? 'true' : 'false'}
                    />
                  </label>
                  {errors.review?.type === 'required' &&
                    <><br /><div className="custom-input__error">Нужно добавить комментарий</div></>}
                  {errors.review?.type === 'minLength' &&
                    <><br /><div className="custom-input__error">Миниальное количество символов {ReviewTextFieldLengthLimit.Minimum}</div></>}
                  {errors.review?.type === 'maxLength' &&
                    <><br /><div className="custom-input__error">Максимальное количество символов {ReviewTextFieldLengthLimit.Maximum}</div></>}
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">
                Отправить отзыв
              </button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseButton}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupAddReview;
