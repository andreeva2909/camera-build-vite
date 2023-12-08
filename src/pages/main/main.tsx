import Filter from '../../components/filter/filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Sorting from '../../components/sorting/sorting';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActivePopupAddItem, getActivePopupAddProductToBasketSuccess, getAllProducts, getCurrentFilterCategory, getCurrentFilterLevel, getCurrentFilterType, getCurrentPriceMax, getCurrentPriceMin, getCurrentSortingDirection, getCurrentSortingType, getFilteredProductsByCategory, getFilteredProductsByLevel, getFilteredProductsByPrice, getFilteredProductsByType, getSortedProducts, getStatusLoadingProductData } from '../../store/products-data/products-data.selectors';
import ProductCardList from '../../components/product-card-list/product-card-list';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MouseEventHandler, useState, useEffect } from 'react';
import { COUNT_PAGES_FOR_ONE_PAGE, COUNT_PRODUCTS_FOR_ONE_PAGE, DEFAULT_PAGE_NUMBER, NameParameterFromURL } from '../../constants';
import PopupAddItem from '../../components/popup-add-item/popup-add-item';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Banner from '../../components/banner/banner';
import Page404 from '../page-404/page-404';
import { fetchProductsAction, fetchProductsPromoAction } from '../../store/api-actions';
import Loader from '../../components/loader/loader';
import { scrollWindow } from '../../utils';
import { setParamsFromURL } from '../../store/products-data/products-data.slice';
import { SortingDirection, SortingType } from '../../types/sorting';
import { NameCategoryEng } from '../../types/filter';
import { Params } from '../../types/params';
import PopupAddProductToBasketSuccess from '../../components/popup-add-product-to-basket-success/popup-add-product-to-basket-success';
import useScroll from '../../hooks/use-scroll';

function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = useAppSelector(getAllProducts);
  const sortedProducts = useAppSelector(getSortedProducts) || allProducts;
  const filteredProductsByCategory = useAppSelector(getFilteredProductsByCategory) || sortedProducts;
  const filteredProductsByType = useAppSelector(getFilteredProductsByType) || filteredProductsByCategory;
  const filteredProductsByLevel = useAppSelector(getFilteredProductsByLevel) || filteredProductsByType;
  const filteredProductsByPrice = useAppSelector(getFilteredProductsByPrice) || filteredProductsByLevel;
  const currentPageNumberFromURL = Number(searchParams.get(NameParameterFromURL.Page));
  const [currentPageNumber, setCurrentPage] = useState(currentPageNumberFromURL ? currentPageNumberFromURL : DEFAULT_PAGE_NUMBER);
  const currentPriceMin = useAppSelector(getCurrentPriceMin);
  const currentPriceMax = useAppSelector(getCurrentPriceMax);
  const currentSortingType = useAppSelector(getCurrentSortingType);
  const currentSortingDirection = useAppSelector(getCurrentSortingDirection);
  const currentFilterCategory = useAppSelector(getCurrentFilterCategory);
  const currentFilterType = useAppSelector(getCurrentFilterType);
  const currentFilterLevel = useAppSelector(getCurrentFilterLevel);
  const { showScroll } = useScroll();
  showScroll();

  let currentListPages = 0;
  if (currentPageNumberFromURL < COUNT_PAGES_FOR_ONE_PAGE) {
    currentListPages = 0;
  } else {
    for (let i = currentPageNumberFromURL - 1; i > 0; i--) {
      if (i % COUNT_PAGES_FOR_ONE_PAGE === 0) {
        currentListPages = i;
        break;
      }
    }
  }
  const [listPages, setListPages] = useState(currentListPages);
  const currentProducts = filteredProductsByPrice.slice(((currentPageNumberFromURL - 1) * COUNT_PRODUCTS_FOR_ONE_PAGE), (currentPageNumberFromURL * COUNT_PRODUCTS_FOR_ONE_PAGE));
  const countPages = Math.ceil(filteredProductsByPrice.length / COUNT_PRODUCTS_FOR_ONE_PAGE);
  const arrayPages = [];
  for (let i = DEFAULT_PAGE_NUMBER; i < countPages + DEFAULT_PAGE_NUMBER; i++) {
    arrayPages.push(i);
  }
  const activePopupAddItem = useAppSelector(getActivePopupAddItem);
  const activePopupAddProductToBasket = useAppSelector(getActivePopupAddProductToBasketSuccess);
  const isProductDataLoading = useAppSelector(getStatusLoadingProductData);

  useEffect(() => {
    const needToGetData = Object.keys(allProducts).length === 0;

    if (needToGetData) {
      dispatch(fetchProductsAction());
      dispatch(fetchProductsPromoAction());
    }
  }, [allProducts, dispatch]);

  const handlePageButton: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    setCurrentPage(Number(event.currentTarget.id));
    scrollWindow({
      top: 360,
      behavior: 'smooth'
    });
  };

  const handleBackButton: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    setCurrentPage(currentPageNumber - 1);
    if (((currentPageNumberFromURL - 1) % COUNT_PAGES_FOR_ONE_PAGE) === 0) {
      setListPages(listPages - COUNT_PAGES_FOR_ONE_PAGE);
    }
    scrollWindow({
      top: 360,
      behavior: 'smooth'
    });
  };

  const handleFutherButton: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    setCurrentPage(currentPageNumber + 1);
    if ((currentPageNumberFromURL % COUNT_PAGES_FOR_ONE_PAGE) === 0) {
      setListPages(listPages + COUNT_PAGES_FOR_ONE_PAGE);
    }
    if (currentPageNumberFromURL === 1) {
      setListPages(listPages);
    }
    scrollWindow({
      top: 360,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const currentPriceMinFromURL = searchParams.get(NameParameterFromURL.PriceMin);
    const currentPriceMaxFromURL = searchParams.get(NameParameterFromURL.PriceMax);
    const currentSortTypeFromURL = searchParams.get(NameParameterFromURL.SortingType);
    const currentSortDirectionFromURL = searchParams.get(NameParameterFromURL.SortingDirection);
    const currentFilterCategoryFromURL = searchParams.get(NameParameterFromURL.Category);
    const typeParam = searchParams.get(NameParameterFromURL.Type);
    const currentFilterTypesFromURL = typeParam ? typeParam?.split(',') : [];
    const levelParam = searchParams.get(NameParameterFromURL.Level);
    const currentFilterLevelsFromURL = levelParam ? levelParam?.split(',') : [];
    dispatch(setParamsFromURL({
      priceMin: Number(currentPriceMinFromURL),
      priceMax: Number(currentPriceMaxFromURL),
      sortingType: currentSortTypeFromURL as SortingType,
      sortingDirection: currentSortDirectionFromURL as SortingDirection,
      filterCategory: currentFilterCategoryFromURL as NameCategoryEng,
      filterType: currentFilterTypesFromURL,
      filterLevel: currentFilterLevelsFromURL
    }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    const params = {} as Params;
    if (countPages === 1) {
      params.page = '1';
    } else {
      params.page = String(currentPageNumber);
    }
    if (currentPriceMin !== 0) {
      params.priceMin = String(currentPriceMin);
    }
    if (currentPriceMax !== 0) {
      params.priceMax = String(currentPriceMax);
    }
    if (currentSortingType !== null) {
      params.sortType = currentSortingType;
    }
    if (currentSortingDirection !== null) {
      params.sortDirection = currentSortingDirection;
    }
    if (currentFilterCategory !== null) {
      params.category = currentFilterCategory;
    }
    if (currentFilterType.length !== 0) {
      params.types = currentFilterType.join(',');
    }
    if (currentFilterLevel.length !== 0) {
      params.levels = currentFilterLevel.join(',');
    }
    setSearchParams(params);
  }, [countPages, currentFilterCategory, currentFilterLevel, currentFilterType, currentPageNumber, currentPageNumberFromURL, currentPriceMax, currentPriceMin, currentSortingDirection, currentSortingType, navigate, setSearchParams]);

  if (countPages !== 0 && !currentPageNumberFromURL || (countPages !== 0 && ((currentPageNumberFromURL < 0)))) {
    return <Page404 />;
  }

  if (isProductDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="wrapper" data-testid='main_page'>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <Filter />
                <div className="catalog__content">
                  <Sorting />
                  {currentProducts.length === 0 ?
                    <div>
                      <br></br>
                      <br></br>
                      <p className="title title--h5" style={{paddingLeft: '40%'}}>Товары не найдены</p>
                    </div>
                    :
                    <ProductCardList products={currentProducts} />}
                  {(allProducts.length > COUNT_PRODUCTS_FOR_ONE_PAGE) &&
                    <div className="pagination">
                      <ul className="pagination__list">
                        <li className={`pagination__item ${currentPageNumberFromURL < 4 ? 'visually-hidden' : ''}`} onClick={handleBackButton}>
                          <a
                            className="pagination__link pagination__link--text"
                            href=''
                          >
                            Назад
                          </a>
                        </li>
                        {arrayPages.slice(listPages, listPages + COUNT_PAGES_FOR_ONE_PAGE).map((page) => (
                          <li className="pagination__item" key={page} id={String(page)} onClick={handlePageButton}>
                            <a
                              className={`pagination__link ${page === currentPageNumberFromURL ? 'pagination__link--active' : ''}`}
                              href=''
                            >
                              {page}
                            </a>
                          </li>
                        ))}
                        <li className={`pagination__item ${(listPages + COUNT_PAGES_FOR_ONE_PAGE) >= countPages ? 'visually-hidden' : ''}`} onClick={handleFutherButton}>
                          <a
                            className="pagination__link pagination__link--text"
                            href=''
                          >
                            Далее
                          </a>
                        </li>
                      </ul>
                    </div>}
                </div>
              </div>
            </div>
          </section>
        </div>
        {activePopupAddItem === true && <PopupAddItem />}
        {activePopupAddProductToBasket === true && <PopupAddProductToBasketSuccess />}
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
