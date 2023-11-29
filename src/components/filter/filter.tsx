import { FILTER_CATEGORY, FILTER_LEVEL, FILTER_TYPE, NameParameterFromURL } from '../../constants';
import { FocusEventHandler, MouseEventHandler, useRef, useEffect, KeyboardEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteAllFilterLevels, deleteAllFilterTypes, deleteFilterLevel, deleteFilterType, setFilterCategory, setFilterLevel, setFilterType, setPriceMax, setPriceMin } from '../../store/products-data/products-data.slice';
import { NameCategoryEng, NameLevelEng, NameTypeEng } from '../../types/filter';
import { getCurrentFilterCategory, getMaxPriceProduct, getMinPriceProduct } from '../../store/products-data/products-data.selectors';
import { useSearchParams } from 'react-router-dom';

function Filter(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentFilterCategory = useAppSelector(getCurrentFilterCategory);
  const [searchParams] = useSearchParams();
  const currentPriceMinFromURL = searchParams.get(NameParameterFromURL.PriceMin);
  const currentPriceMaxFromURL = searchParams.get(NameParameterFromURL.PriceMax);
  const currentFilterCategoryFromURL = String(searchParams.get(NameParameterFromURL.Category));
  const currentFilterTypesFromURL = (String(searchParams.get(NameParameterFromURL.Type))).split(',');
  const currentFilterLevelsFromURL = (String(searchParams.get(NameParameterFromURL.Level))).split(',');
  const inputRefPrice = useRef<HTMLInputElement>(null);
  const inputRefPriceUp = useRef<HTMLInputElement>(null);
  const inputRefForm = useRef<HTMLFormElement>(null);
  const minPriceProduct = useAppSelector(getMinPriceProduct);
  const maxPriceProduct = useAppSelector(getMaxPriceProduct);

  const handleFilterCategory: MouseEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.checked) {
      if (event.currentTarget.id === FILTER_CATEGORY[1].nameEng) {
        if (currentFilterTypesFromURL.includes(FILTER_TYPE[2].nameEng)) {
          dispatch(deleteFilterType(FILTER_TYPE[2].nameEng));
        }
        if (currentFilterTypesFromURL.includes(FILTER_TYPE[1].nameEng)) {
          dispatch(deleteFilterType(FILTER_TYPE[1].nameEng));
        }
      }
      dispatch(setFilterCategory(event.currentTarget.id as NameCategoryEng));
    } else {
      dispatch(setFilterCategory(null));
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
      if (inputRefPriceUp.current?.value) {
        dispatch(setPriceMax(Number(maxPriceProduct)));
        inputRefPriceUp.current.value = String(maxPriceProduct);
      }
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

  const handleKeyDownPrice: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if ((event.key === 'Enter') || (event.key === 'Ent')) {
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
    }
  };

  const handleKeyDownPriceUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if ((event.key === 'Enter') || (event.key === 'Ent')) {
      if (Number(event.currentTarget.value) === 0) {
        if (inputRefPriceUp.current?.value) {
          dispatch(setPriceMax(Number(maxPriceProduct)));
          inputRefPriceUp.current.value = String(maxPriceProduct);
        }
      }
      if (Number(event.currentTarget.value) > Number(maxPriceProduct)) {
        if (inputRefPriceUp.current?.value) {
          inputRefPriceUp.current.value = String(maxPriceProduct);
          dispatch(setPriceMax(Number(maxPriceProduct)));
        }
      } else {
        dispatch(setPriceMax(Number(event.currentTarget.value)));
      }
    }
  };

  const handleResetFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    dispatch(setFilterCategory(null));
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
                    onKeyDown={handleKeyDownPrice}
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
                    onKeyDown={handleKeyDownPriceUp}
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
            {FILTER_CATEGORY.map((filter) => (
              <div className='custom-checkbox catalog-filter__item' key={filter.nameEng}>
                <label>
                  <input
                    type="checkbox"
                    name={filter.nameEng}
                    disabled={(filter.nameEng === 'photocamera' && currentFilterCategory === 'videocamera') || (filter.nameEng === 'videocamera' && currentFilterCategory === 'photocamera')}
                    onClick={handleFilterCategory}
                    id={filter.nameEng}
                    defaultChecked={currentFilterCategoryFromURL === filter.nameEng}
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
                    disabled={(currentFilterCategory === 'videocamera' && filter.nameEng === 'film') || currentFilterCategory === 'videocamera' && filter.nameEng === 'snapshot'}
                    id={filter.nameEng}
                    onClick={handleFilterType}
                    checked={currentFilterTypesFromURL.includes(filter.nameEng)}
                    readOnly
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
