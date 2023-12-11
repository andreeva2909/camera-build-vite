import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePopupDeleteProductFromBasket, getActivePopupOrder, getDiscount, getProductsInBasket, getPromoCode, getPromoCodeError } from '../../store/basket-data/basket-data.selectors';
import { decreaseCountProduct, increaseCountProduct, setActivePopupDeleteProduct, setActivePopupOrder, setCountProduct, setDeletingProduct, setPromoCode } from '../../store/basket-data/basket-data.slice';
import { AppRoute, MAX_COUNT_PRODUCTS, MIN_COUNT_PRODUCTS } from '../../constants';
import PopupDeleteProductFromBasket from '../../components/popup-delete-product-from-basket/popup-delete-product-from-basket';
import { Link } from 'react-router-dom';
import { postCouponAction, postOrderAction } from '../../store/api-actions';
import classNames from 'classnames';
import PopupOrderSuccess from '../../components/popup-order-success/popup-order-success';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const productsInBasket = useAppSelector(getProductsInBasket);
  const totalSumProductsInBasket = productsInBasket.slice().reduce((previousValue, currentValue) => previousValue + Number(currentValue.price * currentValue.count), 0);
  const isActivePopupDeleteProduct = useAppSelector(getActivePopupDeleteProductFromBasket);
  const inputRef = useRef<HTMLInputElement>(null);
  const promoCode = useAppSelector(getPromoCode);
  const promoCodeError = useAppSelector(getPromoCodeError);
  const discount = useAppSelector(getDiscount);
  const productDiscount = Math.round((totalSumProductsInBasket * (discount * 0.01)));
  const totalSum = totalSumProductsInBasket - productDiscount;
  const isActivePopupOrder = useAppSelector(getActivePopupOrder);

  const handleDecreaseButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    dispatch(decreaseCountProduct(Number(event.currentTarget.id)));
  };

  const handleIncreaseButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    dispatch(increaseCountProduct(Number(event.currentTarget.id)));
  };

  const handleChangeCountProduct: FocusEventHandler<HTMLInputElement> = (event) => {
    if (Number(event.currentTarget.value) < MIN_COUNT_PRODUCTS - 1) {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: MIN_COUNT_PRODUCTS }));
    } else if (Number(event.currentTarget.value) > MAX_COUNT_PRODUCTS) {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: MAX_COUNT_PRODUCTS }));
    } else if ((event.currentTarget.value).split(',')[1] || (event.currentTarget.value).split('.')[1]) {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: Math.round(Number(event.currentTarget.value)) }));
    } else {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: Number(event.currentTarget.value) }));
    }
  };

  const handleBlurCountProduct: FocusEventHandler<HTMLInputElement> = (event) => {
    if (Number(event.currentTarget.value) <= MIN_COUNT_PRODUCTS) {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: MIN_COUNT_PRODUCTS }));
    } else if (Number(event.currentTarget.value) > MAX_COUNT_PRODUCTS) {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: MAX_COUNT_PRODUCTS }));
    } else if ((event.currentTarget.value).split(',')[1] || (event.currentTarget.value).split('.')[1]) {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: Math.round(Number(event.currentTarget.value)) }));
    } else {
      dispatch(setCountProduct({ id: Number(event.currentTarget.id), count: Number(event.currentTarget.value) }));
    }
  };

  const handleDeleteProduct: MouseEventHandler<HTMLButtonElement> = (event) => {
    dispatch(setActivePopupDeleteProduct(true));
    dispatch(setDeletingProduct(Number(event.currentTarget.id)));
  };

  const handleKeyDownApplyPromocode: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if ((event.key === 'Enter') || (event.key === 'Ent')) {
      if (inputRef.current?.value) {
        dispatch(setPromoCode(inputRef.current?.value));
        dispatch(postCouponAction(inputRef.current?.value));
      }
    }
  };

  const handleApplyPromocode: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (inputRef.current?.value || inputRef.current?.value === '') {
      dispatch(setPromoCode(inputRef.current?.value));
      dispatch(postCouponAction(inputRef.current?.value));
    }
  };

  const handleOrderButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const camerasIds = [] as unknown as [number];
    productsInBasket.slice().map((product) => camerasIds.push(product.id));
    if (discount === null || discount === 0 || promoCode === null) {
      dispatch(setPromoCode(null));
      dispatch(postOrderAction({camerasIds: camerasIds, coupon: null}));
    } else {
      dispatch(postOrderAction({camerasIds: camerasIds, coupon: promoCode}));
    }
    setTimeout(() => dispatch(setActivePopupOrder(true)), 1000);
  };

  if (productsInBasket.length === 0) {
    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <section className="basket" data-testid='basket_page'>
            <div className="container">
              {productsInBasket.length > 0 &&
                <div>
                  <h1 className="title title--h2">Корзина</h1>
                  <ul className="basket__list">
                    {productsInBasket.map((product) => (
                      <li className="basket-item" key={product.id}>
                        <div className="basket-item__img">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
                            />
                            <img
                              src={product.previewImg}
                              srcSet={`${product.previewImg2x} 2x`}
                              width={140}
                              height={120}
                              alt={product.name}
                            />
                          </picture>
                        </div>
                        <div className="basket-item__description">
                          <p className="basket-item__title">{product.name}</p>
                          <ul className="basket-item__list">
                            <li className="basket-item__list-item">
                              <span className="basket-item__article">Артикул:</span>{' '}
                              <span className="basket-item__number">{product.vendorCode}</span>
                            </li>
                            <li className="basket-item__list-item">
                              {product.type} {product.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}
                            </li>
                            <li className="basket-item__list-item">
                              {product.level} уровень
                            </li>
                          </ul>
                        </div>
                        <p className="basket-item__price">
                          <span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
                        </p>
                        <div className="quantity">
                          <button
                            className="btn-icon btn-icon--prev"
                            aria-label="уменьшить количество товара"
                            disabled={product.count <= MIN_COUNT_PRODUCTS}
                            id={String(product.id)}
                            onClick={handleDecreaseButton}
                          >
                            <svg width={7} height={12} aria-hidden="true">
                              <use xlinkHref="#icon-arrow" />
                            </svg>
                          </button>
                          <label className="visually-hidden" htmlFor="counter1" />
                          <input
                            type="number"
                            id={String(product.id)}
                            value={product.count || ''}
                            onChange={handleChangeCountProduct}
                            onBlur={handleBlurCountProduct}
                            min={1}
                            max={99}
                            aria-label="количество товара"
                          />
                          <button
                            className="btn-icon btn-icon--next"
                            aria-label="увеличить количество товара"
                            id={String(product.id)}
                            onClick={handleIncreaseButton}
                            disabled={product.count >= MAX_COUNT_PRODUCTS}
                          >
                            <svg width={7} height={12} aria-hidden="true">
                              <use xlinkHref="#icon-arrow" />
                            </svg>
                          </button>
                        </div>
                        <div className="basket-item__total-price">
                          <span className="visually-hidden">Общая цена:</span>{(product.price * product.count).toLocaleString()} ₽
                        </div>
                        <button
                          className="cross-btn"
                          type="button"
                          aria-label="Удалить товар"
                          id={String(product.id)}
                          onClick={handleDeleteProduct}
                        >
                          <svg width={10} height={10} aria-hidden="true">
                            <use xlinkHref="#icon-close" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>}
              {productsInBasket.length === 0 &&
                <section className="catalog">
                  <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
                    <h3 className="title title--h3">Корзина пуста</h3>
                    <Link className="btn" to={`${AppRoute.Main}?page=1`}>Вернуться на главную страницу</Link>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </section>}
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом поле
                  </p>
                  <div className="basket-form">
                    <form action="#">
                      <div className={classNames({ 'is-invalid': productsInBasket.length !== 0 && promoCodeError, 'is-valid': productsInBasket.length !== 0 && discount > 0 }, 'custom-input')}>
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                            ref={inputRef}
                            defaultValue={promoCode || ''}
                            onKeyDown={handleKeyDownApplyPromocode}
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit" onClick={handleApplyPromocode}>
                        Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{totalSumProductsInBasket.toLocaleString()} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className={classNames({ 'basket__summary-value--bonus': discount > 0 && productsInBasket.length > 0 }, 'basket__summary-value')}>
                      {productDiscount.toLocaleString()} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {totalSum.toLocaleString()} ₽
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit" disabled={productsInBasket.length === 0} onClick={handleOrderButton}>
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isActivePopupDeleteProduct && <PopupDeleteProductFromBasket />}
        {isActivePopupOrder && <PopupOrderSuccess />}
      </main>
      <Footer />
    </div>);
}

export default BasketPage;
