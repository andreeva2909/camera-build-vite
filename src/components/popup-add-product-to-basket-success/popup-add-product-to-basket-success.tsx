import { MouseEventHandler, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import useScroll from '../../hooks/use-scroll';
import { setPopupAddProductToBasketSuccess } from '../../store/products-data/products-data.slice';
import { AppRoute } from '../../constants';
import { Link } from 'react-router-dom';
import { scrollWindow } from '../../utils';

function PopupAddProductToBasketSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const { showScroll, hideScroll } = useScroll();
  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = location.pathname;
  hideScroll();

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddProductToBasketSuccess(false));
    showScroll();
  };

  const handleReturnToCatalogButton: MouseEventHandler<HTMLElement> = () => {
    dispatch(setPopupAddProductToBasketSuccess(false));
    showScroll();
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setPopupAddProductToBasketSuccess(false));
      showScroll();
    }
  };

  const handleBasketButton: MouseEventHandler<HTMLElement> = () => {
    dispatch(setPopupAddProductToBasketSuccess(false));
    showScroll();
    scrollWindow({
      top: 0
    });
  };

  useEffect(() => {
    modalRef.current?.focus();
  });

  return (
    <div className="modal is-active modal--narrow" onKeyDown={handleKeyButton} autoFocus tabIndex={0} ref={modalRef} data-testid='popup_add_product_to_basket_success'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton} />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            {!pathname.includes(AppRoute.Product) &&
              <a className="btn btn--transparent modal__btn" href="#" tabIndex={0} autoFocus onClick={handleCloseButton}>
                Продолжить покупки
              </a>}
            {pathname.includes(AppRoute.Product) &&
              <Link to={`${AppRoute.Main}?page=1`} className="btn btn--transparent modal__btn" tabIndex={0} autoFocus onClick={handleReturnToCatalogButton}>
                Продолжить покупки
              </Link>}
            <Link to={AppRoute.Basket} className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleBasketButton}>
              Перейти в корзину
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

export default PopupAddProductToBasketSuccess;
