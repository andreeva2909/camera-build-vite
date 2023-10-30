import { FILTER_CATHEGORY, FILTER_LEVEL, FILTER_TYPE } from '../../constants';

function Filter(): JSX.Element {
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
              <div className="custom-checkbox catalog-filter__item" key={filter.nameEng}>
                <label>
                  <input
                    type="checkbox"
                    name={filter.nameEng}
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
                  <input type="checkbox" name={filter.nameEng} />
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
