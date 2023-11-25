import { FILTER_CATHEGORY, FILTER_LEVEL, FILTER_TYPE } from '../../constants';
import { FocusEventHandler, MouseEventHandler, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteAllFilterLevels, deleteAllFilterTypes, deleteFilterLevel, deleteFilterType, setFilterCathegory, setFilterLevel, setFilterType, setPriceMax, setPriceMin } from '../../store/products-data/products-data.slice';
import { NameCathegoryEng, NameLevelEng, NameTypeEng } from '../../types/filter';
import { getCurrentFilterCathegory, getMaxPriceProduct, getMinPriceProduct } from '../../store/products-data/products-data.selectors';
import { useSearchParams } from 'react-router-dom';

function Filter(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentFilterCathegory = useAppSelector(getCurrentFilterCathegory);
  const [searchParams] = useSearchParams();
  const currentPriceMinFromURL = searchParams.get('priceMin');
  const currentPriceMaxFromURL = searchParams.get('priceMax');
  const currentFilterCathegoryFromURL = String(searchParams.get('category'));
  const currentFilterTypesFromURL = (String(searchParams.get('types'))).split(',');
  const currentFilterLevelsFromURL = (String(searchParams.get('levels'))).split(',');
  const inputRefPrice = useRef<HTMLInputElement>(null);
  const inputRefPriceUp = useRef<HTMLInputElement>(null);
  const inputRefForm = useRef<HTMLFormElement>(null);
  const minPriceProduct = useAppSelector(getMinPriceProduct);
  const maxPriceProduct = useAppSelector(getMaxPriceProduct);

  const handleFilterCathegory: MouseEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.checked) {
      dispatch(setFilterCathegory(event.currentTarget.id as NameCathegoryEng));
    } else {
      dispatch(setFilterCathegory(null));
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

  const handleInputPrice: MouseEventHandler<HTMLInputElement> = (event) => {
    if (Number(event.currentTarget.value) < 0) {
      if (inputRefPrice.current?.value) {
        inputRefPrice.current.value = String(Number(event.currentTarget.value) * -1);
      }
    }
  };

  const handleInputPriceUp: MouseEventHandler<HTMLInputElement> = (event) => {
    if (Number(event.currentTarget.value) < 0) {
      if (inputRefPriceUp.current?.value) {
        inputRefPriceUp.current.value = String(Number(event.currentTarget.value) * -1);
      }
    }
  };

  const handleBlurPrice: FocusEventHandler<HTMLInputElement> = (event) => {
    if (Number(event.currentTarget.value) === 0) {
      dispatch(setPriceMin(0));
    }
    if (Number(event.currentTarget.value) < Number(minPriceProduct)) {
      if (inputRefPrice.current?.value) {
        inputRefPrice.current.value = String(minPriceProduct);
        dispatch(setPriceMin(Number(minPriceProduct)));
      }
    } else {
      dispatch(setPriceMin(Number(event.currentTarget.value)));
    }
  };

  const handleBlurPriceUp: FocusEventHandler<HTMLInputElement> = (event) => {
    if (Number(event.currentTarget.value) === 0) {
      dispatch(setPriceMax(0));
    }
    if (Number(event.currentTarget.value) > Number(maxPriceProduct)) {
      if (inputRefPriceUp.current?.value) {
        inputRefPriceUp.current.value = String(maxPriceProduct);
        dispatch(setPriceMax(Number(maxPriceProduct)));
      }
    } else {
      dispatch(setPriceMax(Number(event.currentTarget.value)));
    }
  };

  const handleResetFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    dispatch(setFilterCathegory(null));
    dispatch(deleteAllFilterTypes());
    dispatch(deleteAllFilterLevels());
    dispatch(setPriceMin(0));
    dispatch(setPriceMax(0));
    if (inputRefPrice.current?.value) {
      inputRefPrice.current.value = '';
    }
    if (inputRefPriceUp.current?.value) {
      inputRefPriceUp.current.value = '';
    }
    inputRefForm.current?.reset();
  };

  useEffect(() => {
    if (Number(currentPriceMaxFromURL) < Number(currentPriceMinFromURL) && currentPriceMaxFromURL !== null) {
      if (inputRefPriceUp.current?.value) {
        inputRefPriceUp.current.value = String(maxPriceProduct);
        dispatch(setPriceMax(Number(maxPriceProduct)));
      }
    }
    if (Number(maxPriceProduct) < Number(currentPriceMinFromURL)) {
      if (inputRefPrice.current?.value) {
        inputRefPrice.current.value = String(minPriceProduct);
        dispatch(setPriceMin(Number(minPriceProduct)));
      }
    }
  });

  return (
    <div className="catalog__aside" data-testid="filter">
      <div className="catalog-filter">
        <form action="#" ref={inputRefForm}>
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    onInput={handleInputPrice}
                    onBlur={handleBlurPrice}
                    ref={inputRefPrice}
                    placeholder={String(minPriceProduct) !== 'undefined' ? String(minPriceProduct) : 'от'}
                    defaultValue={String(currentPriceMinFromURL)}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    onInput={handleInputPriceUp}
                    onBlur={handleBlurPriceUp}
                    ref={inputRefPriceUp}
                    placeholder={String(maxPriceProduct) !== 'undefined' ? String(maxPriceProduct) : 'до'}
                    defaultValue={String(currentPriceMaxFromURL)}
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
                  <input type="checkbox" name={filter.nameEng} id={filter.nameEng} onClick={handleFilterLevel} defaultChecked={currentFilterLevelsFromURL.includes(filter.nameEng)}/>
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">{filter.nameRu}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetFilters}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filter;
