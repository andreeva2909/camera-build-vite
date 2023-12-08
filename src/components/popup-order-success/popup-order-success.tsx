import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import useScroll from '../../hooks/use-scroll';
import { MouseEventHandler, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActivePopupOrder } from '../../store/basket-data/basket-data.slice';
import { getOrderError } from '../../store/basket-data/basket-data.selectors';

function PopupOrderSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const { showScroll, hideScroll } = useScroll();
  const orderError = useAppSelector(getOrderError);
  const modalRef = useRef<HTMLDivElement>(null);

  hideScroll();

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLElement> = (event) => {
    event.preventDefault();
    dispatch(setActivePopupOrder(false));
    showScroll();
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setActivePopupOrder(false));
      showScroll();
    }
  };

  const handleReturnToCatalogButton: MouseEventHandler<HTMLElement> = () => {
    dispatch(setActivePopupOrder(false));
    showScroll();
  };

  useEffect(() => {
    modalRef.current?.focus();
  });

  return (
    <div className="modal is-active modal--narrow" onKeyDown={handleKeyButton} autoFocus tabIndex={0} ref={modalRef} data-testid='popup_order_success'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton} />
        <div className="modal__content">
          {!orderError &&
            <div>
              <p className="title title--h4">Спасибо за покупку</p>
              <svg className="modal__icon" width={80} height={78} aria-hidden="true">
                <use xlinkHref="#icon-review-success" />
              </svg>
              <div className="modal__buttons">
                <Link to={`${AppRoute.Main}?page=1`}
                  className="btn btn--purple modal__btn modal__btn--fit-width"
                  type="button"
                  onClick={handleReturnToCatalogButton}
                >
                  Вернуться к покупкам
                </Link>
              </div>
            </div>}
          {orderError &&
            <div>
              <p className="title title--h4">Произошла ошибка при оформлении заказа. Попробуйте еще раз</p>
              <br />
              <br />
              <div className="modal__buttons">
                <Link to={`${AppRoute.Main}?page=1`}
                  className="btn btn--purple modal__btn modal__btn--fit-width"
                  type="button"
                  onClick={handleReturnToCatalogButton}
                >
                  Вернуться к покупкам
                </Link>
              </div>
            </div>}
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

export default PopupOrderSuccess;
