import { NameCategoryRu, NameLevelRu, NameTypeRu } from './filter';

export type Product = {
  id: number;
  name: string;
  vendorCode: string;
  type: NameTypeRu;
  category: NameCategoryRu;
  description: string;
  level: NameLevelRu;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type ProductPromo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
