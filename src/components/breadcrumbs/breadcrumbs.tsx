import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getProductData } from '../../store/products-data/products-data.selectors';

function Breadcrumbs(): JSX.Element {
  const location = useLocation();
  const pathname = location.pathname;
  const productData = useAppSelector(getProductData);

  return (
    <div className="breadcrumbs" data-testid="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={`${AppRoute.Main}?page=1`}>
              Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className={`breadcrumbs__link breadcrumbs__link${pathname === AppRoute.Main ? '--active' : ''}`} to={AppRoute.Main}>
              Каталог
              {pathname !== AppRoute.Main &&
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>}
            </Link>
          </li>
          {pathname.includes(AppRoute.Product) &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {productData.name}
              </span>
            </li>}
        </ul>
      </div>
    </div>
  );
}


export default Breadcrumbs;
