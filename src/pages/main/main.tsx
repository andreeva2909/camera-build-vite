import Filter from '../../components/filter/filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Sorting from '../../components/sorting/sorting';
import { useAppSelector } from '../../hooks';
import { getActivePopupAddItem, getAllProducts } from '../../store/products-data/products-data.selectors';
import ProductCardList from '../../components/product-card-list/product-card-list';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler, useState, useEffect } from 'react';
import { COUNT_PAGES_FOR_ONE_PAGE, COUNT_PRODUCTS_FOR_ONE_PAGE, DEFAULT_PAGE_NUMBER } from '../../constants';
import PopupAddItem from '../../components/popup-add-item/popup-add-item';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Banner from '../../components/banner/banner';
import Page404 from '../page-404/page-404';


function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const allProducts = useAppSelector(getAllProducts);
  const currentPageNumberFromURL = Number(window.location.search.split('=')[1]);
  const [currentPageNumber, setCurrentPage] = useState(currentPageNumberFromURL ? currentPageNumberFromURL : DEFAULT_PAGE_NUMBER);
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
  const currentProducts = allProducts.slice(((currentPageNumberFromURL - 1) * COUNT_PRODUCTS_FOR_ONE_PAGE), (currentPageNumberFromURL * COUNT_PRODUCTS_FOR_ONE_PAGE));
  const countPages = Math.ceil(allProducts.length / COUNT_PRODUCTS_FOR_ONE_PAGE);
  const arrayPages = [];
  for (let i = DEFAULT_PAGE_NUMBER; i < countPages + DEFAULT_PAGE_NUMBER; i++) {
    arrayPages.push(i);
  }
  const activePopupAddItem = useAppSelector(getActivePopupAddItem);
  document.body.style.overflowY = 'visible';

  const handlePageButton: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    setCurrentPage(Number(event.currentTarget.id));
    window.scroll({
      top: 360,
      behavior: 'smooth'
    });
  };

  const handleBackButton: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    setListPages(listPages - COUNT_PAGES_FOR_ONE_PAGE);
    setCurrentPage(listPages);
    window.scroll({
      top: 360,
      behavior: 'smooth'
    });
  };

  const handleFutherButton: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    setListPages(listPages + COUNT_PAGES_FOR_ONE_PAGE);
    setCurrentPage(listPages + (COUNT_PAGES_FOR_ONE_PAGE + 1));
    window.scroll({
      top: 360,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    navigate(`?page=${currentPageNumber}`);
  }, [currentPageNumber, navigate]);

  if (countPages !== 0 && !currentPageNumberFromURL || (countPages !== 0 && ((currentPageNumberFromURL < 0) || (currentPageNumberFromURL > countPages)))) {
    return <Page404 />;
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
                  <ProductCardList products={currentProducts} />
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
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
