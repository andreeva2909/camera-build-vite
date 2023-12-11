import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, COUNT_PRODUCTS_FOR_SCROLLER, COUNT_PRODUCTS_FOR_SEARCH, Tab } from '../../constants';
import { ChangeEventHandler, MouseEventHandler, useState, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { getAllProducts } from '../../store/products-data/products-data.selectors';
import { Product } from '../../types/product';
import { getProductsInBasket } from '../../store/basket-data/basket-data.selectors';

function Header(): JSX.Element {
  const allProducts = useAppSelector(getAllProducts);
  const [searchProducts, setSearchProducts] = useState([] as Product[]);
  const [viewSearch, setViewSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [counter, setCounter] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const productListRef = useRef<HTMLUListElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const productsInBasket = useAppSelector(getProductsInBasket);
  const countProductsInBasket = productsInBasket.slice().reduce((previousValue, currentValue) => previousValue + Number(currentValue.count), 0);

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const currentProducts = [] as Product[];
    setSearchProducts([]);
    setSearchText(event.currentTarget.value);
    if (event.currentTarget.value.length >= COUNT_PRODUCTS_FOR_SEARCH) {
      setViewSearch(true);
      allProducts.map((product) => {
        if (product.name.toLowerCase().includes(String(event.currentTarget.value.toLowerCase())) ||
          (product.name.toLowerCase().includes(String(event.currentTarget.value.split(' ').reverse().join(' ').toLowerCase()))) ||
          (product.name.split(' ').reverse().join(' ').toLowerCase().includes(String(event.currentTarget.value.toLowerCase()))) ||
          (product.name.split(' ').reverse().join('').toLowerCase().includes(String(event.currentTarget.value.toLowerCase()))) ||
          (product.name.toLowerCase().split(' ').join('').includes(String(event.currentTarget.value.toLowerCase()))) ||
          (product.name.toLowerCase().split(' ').sort().join('').includes(String(event.currentTarget.value.toLowerCase().split(' ').sort().join(''))))) {
          if (!(searchProducts.find((currentProduct) => currentProduct.name.toLowerCase() === product.name.toLowerCase()))) {
            currentProducts.push(product);
          }
        } else {
          const deleteProductIndex = searchProducts.indexOf(product);
          if (deleteProductIndex !== -1) {
            searchProducts.splice(deleteProductIndex, 1);
          }
        }
      });
      setSearchProducts([...searchProducts, ...currentProducts]);
    }
    if (event.currentTarget.value.length < COUNT_PRODUCTS_FOR_SEARCH) {
      setSearchProducts([]);
      setViewSearch(false);
    }
  };

  const handleResetSearchButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (inputRef.current?.value) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    setSearchProducts([]);
    setViewSearch(false);
    setCounter(0);
  };

  const handleProductClick: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    navigate(`${AppRoute.Product}/${String(event.currentTarget.id)}/${Tab.Characteristics}`);
  };

  const handleKeyProductButton = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter') || (event.key === 'Ent')) {
      event.preventDefault();
      navigate(`${AppRoute.Product}/${String(event.currentTarget.id)}/${Tab.Characteristics}`);
    }
  };

  const handleKeyFormButton = (event: React.KeyboardEvent) => {
    setCounter(0);
    const focusableElementsString = '[tabindex="0"]';
    const focusableElements: NodeListOf<Element> | undefined = formRef.current?.querySelectorAll(focusableElementsString);
    const focusElements: HTMLUListElement[] | undefined = Array.prototype.slice.call(focusableElements);
    const firstTabStop = focusElements[0];
    const lastTabStop = focusElements[focusElements.length - 1];
    if (event.key === 'Tab') {
      if (searchProducts.length === 1) {
        setCounter(0);
      }
      setCounter(counter + 1);
      if (document.activeElement === lastTabStop) {
        firstTabStop.focus();
        setCounter(1);
      }
    }
    if (event.key === 'ArrowDown') {
      if (searchProducts.length === 1) {
        event.preventDefault();
        focusElements[1].focus();
        setCounter(0);
      }
      if (searchProducts.length > 1) {
        event.preventDefault();
        focusElements[counter + 1].focus();
        setCounter(counter + 1);
        if (document.activeElement === firstTabStop) {
          setCounter(0);
        }
        if (document.activeElement === lastTabStop) {
          setCounter(0);
        }
      }
    }
    if (event.key === 'ArrowUp') {
      if (searchProducts.length === 1) {
        setCounter(0);
      }
      if (counter > 0) {
        event.preventDefault();
        focusElements[counter - 1].focus();
        setCounter(counter - 1);
        if (document.activeElement === firstTabStop) {
          focusElements[0].focus();
          setCounter(0);
        }
      }
    }
  };

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link
          className="header__logo"
          to={`${AppRoute.Main}?page=1`}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={`${AppRoute.Main}?page=1`}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${searchText.length > 0 ? 'list-opened' : ''}`} ref={formRef}>
          <form onKeyDown={handleKeyFormButton}>
            <label>
              <svg
                className="form-search__icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens" />
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                onInput={handleSearchInput}
                ref={inputRef}
                tabIndex={0}
              />
            </label>
            {viewSearch &&
              <ul className={`form-search__select-list ${searchProducts.length > COUNT_PRODUCTS_FOR_SCROLLER ? 'scroller' : ''}`} style={{ overflowY: 'auto' }} ref={productListRef}>
                {searchProducts.length === 0 &&
                  <li className="form-search__select-item" tabIndex={0}>Ничего не найдено</li>}
                {searchProducts.length !== 0 && searchProducts.map((product) => (
                  <li id={String(product.id)} key={product.id} className="form-search__select-item" tabIndex={0} onClick={handleProductClick} onKeyDown={handleKeyProductButton}>
                    {product.name}
                  </li>
                ))}
              </ul>}
          </form>
          <button className="form-search__reset" type="reset" onClick={handleResetSearchButton} tabIndex={0}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link to={AppRoute.Basket} className="header__basket-link">
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {productsInBasket.length !== 0 && <span className="header__basket-count">{countProductsInBasket}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
