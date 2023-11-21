import { FILTER_CATHEGORY, FILTER_LEVEL, FILTER_TYPE } from '../../constants';
import { MouseEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteFilterLevel, deleteFilterType, setFilterCathegory, setFilterLevel, setFilterType } from '../../store/products-data/products-data.slice';
import { NameCathegoryEng, NameLevelEng, NameTypeEng } from '../../types/filter';
import { getCurrentFilterCathegory, getCurrentFilterLevel, getCurrentFilterType } from '../../store/products-data/products-data.selectors';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Filter(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentFilterCathegory = useAppSelector(getCurrentFilterCathegory);
  const currentFilterType = useAppSelector(getCurrentFilterType);
  const currentFilterLevel = useAppSelector(getCurrentFilterLevel);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentFilterCathegoryFromURL = String(searchParams.get('category'));
  const currentFilterTypesFromURL = (String(searchParams.get('types'))).split(',');
  console.log(currentFilterCathegory);

  const handleFilterCathegory: MouseEventHandler<HTMLInputElement> = (event) => {
    if (currentFilterCathegoryFromURL === 'null' || event.currentTarget.checked) {
      dispatch(setFilterCathegory(event.currentTarget.id as NameCathegoryEng));
    } else {
      dispatch(setFilterCathegory('none'));
    }
  };

  const handleFilterType: MouseEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.checked) {
      dispatch(setFilterType(event.currentTarget.id as NameTypeEng));
    } else {
      dispatch(deleteFilterType(event.currentTarget.id as NameTypeEng));
    }
  };

  const handleFilterLevel: MouseEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.checked) {
      dispatch(setFilterLevel(event.currentTarget.id as NameLevelEng));
    } else {
      dispatch(deleteFilterLevel(event.currentTarget.id as NameTypeEng));
    }
  };

  if (currentFilterType.length === 0) {
    //currentFilterTypesFromURL.shift();
    currentFilterTypesFromURL.map((filterType) => {
      dispatch(setFilterType(filterType as NameTypeEng));
    });
  }

  useEffect(() => {
    if (currentFilterCathegory === 'null') {
      dispatch(setFilterCathegory(currentFilterCathegoryFromURL as NameCathegoryEng));
    }
  }, [currentFilterCathegory, currentFilterCathegoryFromURL, currentFilterType, currentFilterType.length, currentFilterTypesFromURL, dispatch, navigate]);

  return (
    <div className="catalog__aside" data-testid="filter">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder="до"
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {FILTER_CATHEGORY.map((filter) => (
              <div className='custom-checkbox catalog-filter__item' key={filter.nameEng}>
                <label>
                  <input
                    type="checkbox"
                    name={filter.nameEng}
                    disabled={(filter.nameEng === 'photocamera' && currentFilterCathegory === 'videocamera') || (filter.nameEng === 'videocamera' && currentFilterCathegory === 'photocamera')}
                    onClick={handleFilterCathegory}
                    id={filter.nameEng}
                    defaultChecked={currentFilterCathegoryFromURL === filter.nameEng}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {filter.nameRu}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {FILTER_TYPE.map((filter) => (
              <div className="custom-checkbox catalog-filter__item" key={filter.nameEng}>
                <label>
                  <input
                    type="checkbox"
                    name={filter.nameEng}
                    disabled={(currentFilterCathegory === 'videocamera' && filter.nameEng === 'film') || currentFilterCathegory === 'videocamera' && filter.nameEng === 'snapshot'}
                    id={filter.nameEng}
                    onClick={handleFilterType}
                    defaultChecked={currentFilterTypesFromURL.includes(filter.nameEng)}
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">{filter.nameRu}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {FILTER_LEVEL.map((filter) => (
              <div className="custom-checkbox catalog-filter__item" key={filter.nameEng}>
                <label>
                  <input type="checkbox" name={filter.nameEng} id={filter.nameEng} onClick={handleFilterLevel}/>
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">{filter.nameRu}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filter;
