import React, { ChangeEvent, FormEventHandler, MouseEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPopupAddReview, setPopupAddReviewSuccess } from '../../store/products-data/products-data.slice';
import { UserReview } from '../../types/review';
import { getErrorAddReview, getProductData } from '../../store/products-data/products-data.selectors';
import { MAX_VALUE_RATING, MIN_VALUE_RATING, ReviewTextFieldLengthLimit } from '../../constants';
import { postNewReviewAction } from '../../store/api-actions';

function PopupAddReview(): JSX.Element {
  const dispatch = useAppDispatch();
  document.body.style.overflowY = 'hidden';
  const productData = useAppSelector(getProductData);
  const errorAddReview = useAppSelector(getErrorAddReview);

  const ratingData = [
    { value: 5, title: 'Отлично' },
    { value: 4, title: 'Хорошо' },
    { value: 3, title: 'Нормально' },
    { value: 2, title: 'Плохо' },
    { value: 1, title: 'Ужасно' }
  ];

  const [userReview, setUserReview] = useState<UserReview>({
    cameraId: productData.id,
    rating: 0,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: ''
  });

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddReview(false));
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setPopupAddReview(false));
    }
  };

  const handleRatingChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);
    setUserReview({
      ...userReview,
      rating: value
    });
  };

  const handleUserNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setUserReview({
      ...userReview,
      userName: value
    });
  };

  const handleAdvantagesChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setUserReview({
      ...userReview,
      advantage: value
    });
  };

  const handleDisadvantagesChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setUserReview({
      ...userReview,
      disadvantage: value
    });
  };

  const handleCommentChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setUserReview({
      ...userReview,
      review: value
    });
  };

  const checkRatingValue = (userReview.rating >= MIN_VALUE_RATING) && (userReview.rating <= MAX_VALUE_RATING);
  const checkUserNameInputField = userReview.userName.length >= ReviewTextFieldLengthLimit.Minimum && userReview.userName.length <= ReviewTextFieldLengthLimit.Maximum;
  const checkAdvantageInputField = userReview.advantage.length >= ReviewTextFieldLengthLimit.Minimum && userReview.userName.length <= ReviewTextFieldLengthLimit.Maximum;
  const checkDisdvantageInputField = userReview.disadvantage.length >= ReviewTextFieldLengthLimit.Minimum && userReview.userName.length <= ReviewTextFieldLengthLimit.Maximum;
  const checkReviewInputField = userReview.review.length >= ReviewTextFieldLengthLimit.Minimum && userReview.userName.length <= ReviewTextFieldLengthLimit.Maximum;
  const checkAllFields = checkRatingValue && checkUserNameInputField && checkAdvantageInputField && checkDisdvantageInputField && checkReviewInputField;

  const handleReviewFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (checkAllFields) {
      dispatch(postNewReviewAction(userReview));
      if (!errorAddReview) {
        dispatch(setPopupAddReview(false));
        dispatch(setPopupAddReviewSuccess(true));
      }
    }
  };

  return (
    <div className="modal is-active" onKeyDown={handleKeyButton} data-testid='popup_add_review'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton} />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleReviewFormSubmit}>
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
                            name="rate"
                            type="radio"
                            defaultValue={rating.value}
                            onChange={handleRatingChange}
                            data-testid={`rating_${rating.value}_value`}
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
                      <span className="rate__stars">{userReview.rating}</span> <span>/</span>{' '}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {!checkRatingValue &&
                  <p className="rate__message">Нужно оценить товар</p>}
                </fieldset>
                <div className={`custom-input form-review__item ${!checkUserNameInputField ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      required
                      autoFocus
                      onChange={handleUserNameChange}
                      minLength={ReviewTextFieldLengthLimit.Minimum}
                      maxLength={ReviewTextFieldLengthLimit.Maximum}
                      data-testid='username_value'
                    />
                  </label>
                  {!checkUserNameInputField && <p className="custom-input__error">(от {ReviewTextFieldLengthLimit.Minimum} до {ReviewTextFieldLengthLimit.Maximum} символов)</p>}
                </div>
                <div className={`custom-input form-review__item ${!checkAdvantageInputField ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      required
                      onChange={handleAdvantagesChange}
                      minLength={ReviewTextFieldLengthLimit.Minimum}
                      maxLength={ReviewTextFieldLengthLimit.Maximum}
                      data-testid='advantage_value'
                    />
                  </label>
                  {!checkAdvantageInputField && <p className="custom-input__error">(от {ReviewTextFieldLengthLimit.Minimum} до {ReviewTextFieldLengthLimit.Maximum} символов)</p>}
                </div>
                <div className={`custom-input form-review__item ${!checkDisdvantageInputField ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      required
                      onChange={handleDisadvantagesChange}
                      minLength={ReviewTextFieldLengthLimit.Minimum}
                      maxLength={ReviewTextFieldLengthLimit.Maximum}
                      data-testid='disadvantage_value'
                    />
                  </label>
                  {!checkDisdvantageInputField && <p className="custom-input__error">(от {ReviewTextFieldLengthLimit.Minimum} до {ReviewTextFieldLengthLimit.Maximum} символов)</p>}
                </div>
                <div className={`custom-textarea form-review__item ${!checkReviewInputField ? 'is-invalid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      placeholder="Поделитесь своим опытом покупки"
                      defaultValue={''}
                      onChange={handleCommentChange}
                      minLength={ReviewTextFieldLengthLimit.Minimum}
                      maxLength={ReviewTextFieldLengthLimit.Maximum}
                      data-testid='review_value'
                    />
                  </label>
                  {!checkReviewInputField &&
                  <div className="custom-textarea__error">
                    (от {ReviewTextFieldLengthLimit.Minimum} до {ReviewTextFieldLengthLimit.Maximum} символов)
                  </div>}
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" disabled={!checkAllFields}>
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
