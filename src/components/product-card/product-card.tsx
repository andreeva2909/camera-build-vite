import { MouseEventHandler } from 'react';
import { AppRoute, RATINGS, Tab } from '../../constants';
import { Product } from '../../types/product';
import { selectProductId, setPopupAddItem } from '../../store/products-data/products-data.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { getProductsInBasket } from '../../store/products-data/products-data.selectors';
import { checkProductInBasket } from '../../utils';

type ProductCardProps = {
  product: Product;
  style?: object;
}

function ProductCard({ product, style }: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const productsInBasket = useAppSelector(getProductsInBasket);

  const handleBuyButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    dispatch(setPopupAddItem(true));
    dispatch(selectProductId(event.currentTarget.id));
  };

  return (
    <div className="product-card is-active" style={style} data-testid='product_card'>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${product.previewImg}`}
            srcSet={`/${product.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {RATINGS.map((rating) => (
            <svg width={17} height={16} aria-hidden="true" key={rating}>
              <use xlinkHref={`#icon${product.rating >= rating ? '-full-star' : '-star'}`} />
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {product.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{product.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {product.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {!checkProductInBasket(String(product.id), productsInBasket) &&
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            id={String(product.id)}
            onClick={handleBuyButton}
          >
            Купить
          </button>}
        {checkProductInBasket(String(product.id), productsInBasket) &&
          <a
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
          >
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            В корзине
          </a>}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}/${Tab.Characteristics}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
