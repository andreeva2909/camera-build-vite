import { NameCategoryRu, NameLevelRu, NameTypeRu } from './filter';

export type ProductInBasket = {
  id: number;
  name: string;
  count: number;
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

export type PromoCode = string;

export type Order = {
  camerasIds: [number];
  coupon: string;
}
