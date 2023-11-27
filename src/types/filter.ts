export type NameCategoryEng = 'photocamera' | 'videocamera';

export type NameCategoryRu = 'Фотоаппарат' | 'Фотокамера' | 'Видеокамера';

export type FilterCategoryType = {
  nameEng: NameCategoryEng;
  nameRu: NameCategoryRu;
};

export type NameTypeEng = 'digital' | 'film' | 'snapshot' | 'collection';

export type NameTypeRu = 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная';

export type FilterType = {
  nameEng: NameTypeEng;
  nameRu: NameTypeRu;
};

export type NameLevelEng = 'zero' | 'non-professional' | 'professional';

export type NameLevelRu = 'Нулевой' | 'Любительский' | 'Профессиональный' ;

export type FilterLevelType = {
  nameEng: NameLevelEng;
  nameRu: NameLevelRu;
};
