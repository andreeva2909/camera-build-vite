import { FilterCategoryType, FilterLevelType, FilterType } from './types/filter';

export enum AppRoute {
  Main = '/',
  Product = '/product',
  Characteristics = '/product/:id/:tab',
  Description = '/product/:id/:tab',
  Basket = '/basket'
}

export const FILTER_CATEGORY : FilterCategoryType[] = [
  { nameEng: 'photocamera', nameRu: 'Фотокамера'},
  { nameEng: 'videocamera', nameRu: 'Видеокамера'},
];

export const FILTER_TYPE : FilterType[] = [
  { nameEng: 'digital', nameRu: 'Цифровая'},
  { nameEng: 'film', nameRu: 'Плёночная'},
  { nameEng: 'snapshot', nameRu: 'Моментальная'},
  { nameEng: 'collection', nameRu: 'Коллекционная'}
];

export const FILTER_LEVEL : FilterLevelType[] = [
  { nameEng: 'zero', nameRu: 'Нулевой'},
  { nameEng: 'non-professional', nameRu: 'Любительский'},
  { nameEng: 'professional', nameRu: 'Профессиональный'}
];

export enum SliceName {
  Data = 'Data',
  Basket = 'Basket'
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Similar = '/similar',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders'
}

export const RATINGS = [1, 2, 3, 4, 5];

export const DEFAULT_PAGE_NUMBER = 1;

export const COUNT_PAGES_FOR_ONE_PAGE = 3;

export const COUNT_PRODUCTS_FOR_ONE_PAGE = 9;

export enum Tab {
  Characteristics = 'characteristics',
  Description = 'description'
}

export enum ReviewTextFieldLengthLimit {
  Minimum = 2,
  Maximum = 160
}

export const TIME_TO_RENDER_PAGE = 1000;

export const MIN_VALUE_RATING = 1;

export const MAX_VALUE_RATING = 5;

export enum CurrentSortingType {
  None = 'none',
  Price = 'price',
  Popular = 'popular'
}

export enum CurrentSortingDirection {
  None = 'none',
  Up = 'up',
  Down = 'down'
}

export const COUNT_PRODUCTS_FOR_SCROLLER = 4;

export const COUNT_PRODUCTS_FOR_SEARCH = 3;

export enum NameCategoryFromServer {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера'
}

export enum NameParameterFromURL {
  SortingType = 'sortType',
  SortingDirection = 'sortDirection',
  Page = 'page',
  PriceMin = 'priceMin',
  PriceMax = 'priceMax',
  Category = 'category',
  Type = 'types',
  Level = 'levels'
}

export const MIN_COUNT_PRODUCTS = 1;

export const MAX_COUNT_PRODUCTS = 99;

