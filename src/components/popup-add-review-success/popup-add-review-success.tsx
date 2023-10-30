import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { MouseEventHandler } from 'react';
import { useAppDispatch } from '../../hooks';
import { setPopupAddReviewSuccess } from '../../store/products-data/products-data.slice';

function PopupAddReviewSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  document.body.style.overflowY = 'hidden';

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddReviewSuccess(false));
  };

  const handleReturnButton: MouseEventHandler<HTMLAnchorElement> = () => {
    window.scroll(0, 0);
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setPopupAddReviewSuccess(false));
    }
  };

  return (
    <div className="modal is-active modal--narrow" onKeyDown={handleKeyButton}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton}/>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              autoFocus
              to={`${AppRoute.Main}?page=1`}
              onClick={handleReturnButton}
            >
              Вернуться к покупкам
            </Link>
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

export default PopupAddReviewSuccess;
