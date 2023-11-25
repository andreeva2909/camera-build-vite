import { NameCathegoryEng } from './filter';
import { SortingDirection, SortingType } from './sorting';

export type Params = {
  priceMin: string;
  priceMax: string;
  page: string;
  sortType: SortingType;
  sortDirection: SortingDirection;
  category: NameCathegoryEng;
  types: string;
  levels: string;
}
