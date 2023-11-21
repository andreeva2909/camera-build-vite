import { MouseEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortingDirection, setSortingType } from '../../store/products-data/products-data.slice';
import { SortingDirection, SortingType } from '../../types/sorting';
import { getCurrentSortingDirection, getCurrentSortingType } from '../../store/products-data/products-data.selectors';
import { CurrentSortingDirection, CurrentSortingType } from '../../constants';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Sorting(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentSortingType = useAppSelector(getCurrentSortingType);
  const currentSortingDirection = useAppSelector(getCurrentSortingDirection);
  const [searchParams] = useSearchParams();
  const currentSortTypeFromURL = String(searchParams.get('sortType'));
  const currentSortDirectionFromURL = String(searchParams.get('sortDirection'));

  const handleSortingTypeButton: MouseEventHandler<HTMLInputElement> = (event) => {
    if (currentSortDirectionFromURL === 'null' || currentSortingDirection === CurrentSortingDirection.None) {
      dispatch(setSortingDirection(CurrentSortingDirection.Up));
    }
    dispatch(setSortingType(event.currentTarget.id as SortingType));
  };

  const handleSortingDirectionButton: MouseEventHandler<HTMLInputElement> = (event) => {
    if (currentSortTypeFromURL === 'null' || currentSortingType === CurrentSortingType.None) {
      dispatch(setSortingType(CurrentSortingType.Price));
    }
    dispatch(setSortingDirection(event.currentTarget.id as SortingDirection));
  };

  useEffect(() => {
    if (currentSortDirectionFromURL === 'null') {
      dispatch(setSortingDirection(CurrentSortingDirection.Up));
    }
    if (currentSortTypeFromURL === 'null') {
      dispatch(setSortingType(CurrentSortingType.Price));
    }
    dispatch(setSortingType(currentSortTypeFromURL as SortingType));
    dispatch(setSortingDirection(currentSortDirectionFromURL as SortingDirection));
  }, [currentSortDirectionFromURL, currentSortTypeFromURL, dispatch, navigate]);

  return (
    <div className="catalog-sort" data-testid="sorting">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="price"
                name="sort"
                checked={currentSortingType === CurrentSortingType.Price}
                onClick={handleSortingTypeButton}
                readOnly
              />
              <label htmlFor="price">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="popular"
                name="sort"
                checked={currentSortingType === CurrentSortingType.Popular}
                onClick={handleSortingTypeButton}
                readOnly
              />
              <label htmlFor="popular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={currentSortingDirection === CurrentSortingDirection.Up}
                onClick={handleSortingDirectionButton}
                readOnly
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={currentSortingDirection === CurrentSortingDirection.Down}
                onClick={handleSortingDirectionButton}
                readOnly
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sorting;
