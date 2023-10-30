import { useEffect, MouseEventHandler } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePopupAddReview, getActivePopupAddReviewSuccess, getErrorProductData, getProductData } from '../../store/products-data/products-data.selectors';
import { AppRoute, RATINGS, Tab } from '../../constants';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductDataAction, getReviewsAction, getSimilarProductsAction } from '../../store/api-actions';
import SimilarProducts from '../../components/similar-products/similar-products';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Page404 from '../page-404/page-404';
import PopupAddReview from '../../components/popup-add-review/popup-add-review';
import PopupAddReviewSuccess from '../../components/popup-add-review-success/popup-add-review-success';

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentTab = window.location.pathname.split('/')[3];
  const dispatch = useAppDispatch();
  const productData = useAppSelector(getProductData);
  const errorProductData = useAppSelector(getErrorProductData);
  const isActivePopupAddReview = useAppSelector(getActivePopupAddReview);
  const isActivePopupAddReviewSuccess = useAppSelector(getActivePopupAddReviewSuccess);
  document.body.style.overflowY = 'visible';

  const handleUpButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (!currentTab && id) {
      navigate(`${AppRoute.Product}/${id}/${Tab.Characteristics}`);
    }

    const needToGetData = String(productData.id) !== id || Object.keys(productData).length === 0;

    if (needToGetData && id && !errorProductData) {
      dispatch(getProductDataAction(id));
      dispatch(getSimilarProductsAction(id));
      dispatch(getReviewsAction(id));
    }
    window.scroll(0, 0);
  }, [productData, dispatch, id, errorProductData, currentTab, navigate]);

  if (errorProductData || !currentTab || !id) {
    return <Page404 />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <div className="page-content__section">
            <section className="product" data-testid='product_page'>
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`/${productData.previewImgWebp}, ${productData.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`/${productData.previewImg}`}
                      srcSet={`/${productData.previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={productData.name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{productData.name}</h1>
                  <div className="rate product__rate">
                    {RATINGS.map((rating) => (
                      <svg width={17} height={16} aria-hidden="true" key={rating}>
                        <use xlinkHref={`#icon${productData.rating >= rating ? '-full-star' : '-star'}`} />
                      </svg>
                    ))}
                    <p className="visually-hidden">Рейтинг: {productData.rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{productData.reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{productData.price?.toLocaleString()} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <Link className={`tabs__control ${currentTab === Tab.Characteristics ? 'is-active' : ''}`} type="button" to={`${AppRoute.Product}/${productData.id}/${Tab.Characteristics}`} id={Tab.Characteristics}>
                        Характеристики
                      </Link>
                      <Link className={`tabs__control ${currentTab === Tab.Description ? 'is-active' : ''}`} type="button" to={`${AppRoute.Product}/${productData.id}/${Tab.Description}`} id={Tab.Description}>
                        Описание
                      </Link>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element ${currentTab === Tab.Characteristics ? 'is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>
                            <p className="item-list__text">{productData.vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{productData.category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{productData.type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{productData.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element ${currentTab === Tab.Description ? 'is-active' : ''}`}>
                        <div className="product__tabs-text">
                          <p>
                            {productData.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <SimilarProducts />
          <ReviewsList />
        </div>
        {isActivePopupAddReview && <PopupAddReview />}
        {isActivePopupAddReviewSuccess && <PopupAddReviewSuccess />}
      </main>
      <button className="up-btn" onClick={handleUpButton}>
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </button>
      <Footer />
    </div>
  );
}

export default ProductPage;
