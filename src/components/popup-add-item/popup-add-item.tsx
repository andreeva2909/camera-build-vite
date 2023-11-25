import { MouseEventHandler } from 'react';
import { setPopupAddItem } from '../../store/products-data/products-data.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedProductData } from '../../store/products-data/products-data.selectors';
import useScroll from '../../hooks/use-scroll';

function PopupAddItem(): JSX.Element {
  const dispatch = useAppDispatch();
  const { showScroll, hideScroll } = useScroll();
  const selectedProductData = useAppSelector(getSelectedProductData);
  hideScroll();

  const handleCloseButton: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddItem(false));
    showScroll();
  };

  const handleKeyButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Escape') || (event.key === 'Esc')) {
      dispatch(setPopupAddItem(false));
      showScroll();
    }
  };

  return (
    <div className="modal is-active" onKeyDown={handleKeyButton} data-testid='popup_add_item'>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleCloseButton}/>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${selectedProductData.previewImgWebp}, ${selectedProductData.previewImgWebp2x} 2x`}
                />
                <img
                  src={selectedProductData.previewImg}
                  srcSet={`${selectedProductData.previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={selectedProductData.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{selectedProductData.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{selectedProductData.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{selectedProductData.type} {selectedProductData.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
                <li className="basket-item__list-item">{selectedProductData.level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{selectedProductData.price.toLocaleString()} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              autoFocus
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
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

export default PopupAddItem;
