import { MouseEventHandler } from 'react';
import { useAppDispatch } from '../../hooks';
import useScroll from '../../hooks/use-scroll';
import { setPopupAddProductToBasketSuccess } from '../../store/products-data/products-data.slice';
import { AppRoute } from '../../constants';
import { Link } from 'react-router-dom';
import { scrollWindow } from '../../utils';

function PopupAddProductToBasketSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const { showScroll, hideScroll } = useScroll();
  hideScroll();

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLElement> = (event) => {
    event.preventDefault();
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

  return (
    <div className="modal is-active modal--narrow" onKeyDown={handleKeyButton}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton} />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <a className="btn btn--transparent modal__btn" href="#" onClick={handleCloseButton}>
              Продолжить покупки
            </a>
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
