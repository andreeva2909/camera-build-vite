import { useEffect, MouseEventHandler } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePopupAddItem, getActivePopupAddProductToBasketSuccess, getActivePopupAddReview, getActivePopupAddReviewSuccess, getErrorProductData, getProductData, getProductReviews, getStatusLoadingProductData } from '../../store/products-data/products-data.selectors';
import { AppRoute, RATINGS, Tab } from '../../constants';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductDataAction, getReviewsAction, getSimilarProductsAction } from '../../store/api-actions';
import SimilarProducts from '../../components/similar-products/similar-products';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Page404 from '../page-404/page-404';
import PopupAddReview from '../../components/popup-add-review/popup-add-review';
import PopupAddReviewSuccess from '../../components/popup-add-review-success/popup-add-review-success';
import Loader from '../../components/loader/loader';
import { scrollWindow } from '../../utils';
import { selectProductId, setPopupAddItem } from '../../store/products-data/products-data.slice';
import PopupAddItem from '../../components/popup-add-item/popup-add-item';
import PopupAddProductToBasketSuccess from '../../components/popup-add-product-to-basket-success/popup-add-product-to-basket-success';

function ProductPage(): JSX.Element {
  const { id, tab } = useParams();
  const navigate = useNavigate();
  const currentTab = tab;
  const dispatch = useAppDispatch();
  const productData = useAppSelector(getProductData);
  const productReviewsCount = useAppSelector(getProductReviews).length;
  const errorProductData = useAppSelector(getErrorProductData);
  const isActivePopupAddReview = useAppSelector(getActivePopupAddReview);
  const isActivePopupAddReviewSuccess = useAppSelector(getActivePopupAddReviewSuccess);
  const isProductDataLoading = useAppSelector(getStatusLoadingProductData);
  const activePopupAddItem = useAppSelector(getActivePopupAddItem);
  const activePopupAddProductToBasket = useAppSelector(getActivePopupAddProductToBasketSuccess);

  const handleUpButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    scrollWindow({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAddToBasketButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    dispatch(selectProductId(event.currentTarget.id));
    dispatch(setPopupAddItem(true));
  };

  useEffect(() => {
    if ((!currentTab && id || ((currentTab !== Tab.Characteristics) && (currentTab !== Tab.Description) && id))) {
      navigate(`${AppRoute.Product}/${id}/${Tab.Characteristics}`);
    }

    const needToGetData = String(productData.id) !== id || Object.keys(productData).length === 0;

    if (needToGetData && id && !errorProductData) {
      dispatch(getProductDataAction(id));
      dispatch(getSimilarProductsAction(id));
      dispatch(getReviewsAction(id));
      dispatch(selectProductId(String(id)));
    }
    scrollWindow({
      top: 0
    });
  }, [productData, dispatch, id, errorProductData, currentTab, navigate]);

  if (errorProductData || !id) {
    return <Page404 />;
  }

  if (isProductDataLoading) {
    return (
      <Loader />
    );
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
                      <span className="visually-hidden">Всего оценок:</span>{productReviewsCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{productData.price?.toLocaleString()} ₽
                  </p>
                  <button className="btn btn--purple" type="button" id={String(productData.id)} onClick={handleAddToBasketButton}>
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
        {activePopupAddItem === true && <PopupAddItem />}
        {activePopupAddProductToBasket === true && <PopupAddProductToBasketSuccess />}
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
