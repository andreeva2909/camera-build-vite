import { NameCategoryEng } from './filter';
import { SortingDirection, SortingType } from './sorting';

export type Params = {
  priceMin: string;
  priceMax: string;
  page: string;
  sortType: SortingType;
  sortDirection: SortingDirection;
  category: NameCategoryEng;
  types: string;
  levels: string;
}

export type ParamsFromURL = {
  priceMin: number;
  priceMax: number;
  sortingType: SortingType;
  sortingDirection: SortingDirection;
  filterCategory: NameCategoryEng;
  filterType: string[];
  filterLevel: string[];
}

