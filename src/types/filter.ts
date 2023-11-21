export type NameCathegoryEng = 'photocamera' | 'videocamera' | 'none' | 'null';

export type NameCathegoryRu = 'Фотоаппарат' | 'Фотокамера' | 'Видеокамера' | 'none' | 'null';

export type FilterCathegoryType = {
  nameEng: NameCathegoryEng;
  nameRu: NameCathegoryRu;
};

export type NameTypeEng = 'digital' | 'film' | 'snapshot' | 'collection' | 'none' | 'null';

export type NameTypeRu = 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная' | 'none' | 'null';

export type FilterType = {
  nameEng: NameTypeEng;
  nameRu: NameTypeRu;
};

export type NameLevelEng = 'zero' | 'non-professional' | 'professional' | 'none' | 'null' ;

export type NameLevelRu = 'Нулевой' | 'Любительский' | 'Профессиональный' | 'none' | 'null';

export type FilterLevelType = {
  nameEng: NameLevelEng;
  nameRu: NameLevelRu;
};
