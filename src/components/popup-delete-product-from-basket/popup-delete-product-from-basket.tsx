import { MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useScroll from '../../hooks/use-scroll';
import { getDeletingProductData } from '../../store/basket-data/basket-data.selectors';
import { deleteProduct, setActivePopupDeleteProduct } from '../../store/basket-data/basket-data.slice';

function PopupDeleteProductFromBasket(): JSX.Element {
  const { showScroll, hideScroll } = useScroll();
  const dispatch = useAppDispatch();
  const deletingProductData = useAppSelector(getDeletingProductData);
  hideScroll();

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLElement> = (event) => {
    event.preventDefault();
    dispatch(setActivePopupDeleteProduct(false));
    showScroll();
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setActivePopupDeleteProduct(false));
      showScroll();
    }
  };

  const handleDeleteButton: MouseEventHandler<HTMLButtonElement | HTMLElement> = (event) => {
    event.preventDefault();
    dispatch(setActivePopupDeleteProduct(false));
    dispatch(deleteProduct(Number(event.currentTarget.id)));
    showScroll();
  };

  return (
    <div className="modal is-active" onKeyDown={handleKeyButton} data-testid='popup_delete_product_from_basket'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton}/>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${deletingProductData.previewImgWebp}, ${deletingProductData.previewImgWebp2x} 2x`}
                />
                <img
                  src={deletingProductData.previewImg}
                  srcSet={`${deletingProductData.previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={deletingProductData.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{deletingProductData.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{deletingProductData.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{deletingProductData.type} {deletingProductData.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
                <li className="basket-item__list-item">{deletingProductData.level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              autoFocus
              tabIndex={0}
              id={String(deletingProductData.id)}
              onClick={handleDeleteButton}
            >
              Удалить
            </button>
            <a
              className="btn btn--transparent modal__btn modal__btn--half-width"
              href="#"
              onClick={handleCloseButton}
            >
              Продолжить покупки
            </a>
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

export default PopupDeleteProductFromBasket;
