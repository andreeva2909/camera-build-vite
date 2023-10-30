export type NameCathegoryEng = 'photocamera' | 'videocamera';

export type NameCathegoryRu = 'Фотоаппарат' | 'Фотокамера' | 'Видеокамера';

export type FilterCathegoryType = {
  nameEng: NameCathegoryEng;
  nameRu: NameCathegoryRu;
};

export type NameTypeEng = 'digital' | 'film' | 'snapshot' | 'collection';

export type NameTypeRu = 'Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная';

export type FilterType = {
  nameEng: NameTypeEng;
  nameRu: NameTypeRu;
};

export type NameLevelEng = 'zero' | 'non-professional' | 'professional';

export type NameLevelRu = 'Нулевой' | 'Любительский' | 'Профессиональный';

export type FilterLevelType = {
  nameEng: NameLevelEng;
  nameRu: NameLevelRu;
};
