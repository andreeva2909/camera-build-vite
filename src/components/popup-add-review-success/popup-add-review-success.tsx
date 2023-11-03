import { MouseEventHandler } from 'react';
import { useAppDispatch } from '../../hooks';
import { setPopupAddReviewSuccess } from '../../store/products-data/products-data.slice';
import useScroll from '../../hooks/use-scroll';

function PopupAddReviewSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const { showScroll, hideScroll } = useScroll();
  hideScroll();

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddReviewSuccess(false));
    showScroll();
  };

  const handleReturnButton: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setPopupAddReviewSuccess(false));
    showScroll();
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setPopupAddReviewSuccess(false));
      showScroll();
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
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              autoFocus
              onClick={handleReturnButton}
            >
              Вернуться к покупкам
            </button>
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
