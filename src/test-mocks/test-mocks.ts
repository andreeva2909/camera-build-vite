import faker from 'faker';
import { Product, ProductPromo } from '../types/product';
import { Review, UserReview } from '../types/review';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { testInitialState } from '../store/products-data/products-data.slice';

export const makeFakeProduct = (): Product => ({
  id: 4,
  name: faker.lorem.word(),
  vendorCode: faker.lorem.word(),
  type: 'Цифровая',
  category: 'Фотоаппарат',
  description: faker.lorem.words(5),
  level: 'Нулевой',
  price: faker.datatype.number(20000),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  reviewCount: faker.datatype.number(20),
  previewImg: faker.image.city(),
  previewImg2x: faker.image.city(),
  previewImgWebp: faker.image.city(),
  previewImgWebp2x: faker.image.city(),
} as Product);

export const makeFakeProductPromo = (): ProductPromo => ({
  id: faker.datatype.number(40),
  name: faker.lorem.word(),
  previewImg: faker.image.city(),
  previewImg2x: faker.image.city(),
  previewImgWebp: faker.image.city(),
  previewImgWebp2x: faker.image.city(),
} as ProductPromo);

export const makeFakeReview = (): Review => ({
  id: faker.lorem.word(),
  createAt: String(new Date()),
  cameraId: 4,
  userName: faker.lorem.word(),
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  review: faker.lorem.words(5),
  rating: faker.datatype.number({ min: 1, max: 5 }),
} as Review);

export const makeFakeUserReview = (): UserReview => ({
  cameraId: 4,
  userName: faker.lorem.word(),
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  review: faker.lorem.words(5),
  rating: faker.datatype.number({ min: 1, max: 5 }),
} as UserReview);

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>

export const extractActionTypes =
  (actions: Action<string>[]) => actions.map(({ type }) => type);


export const makeFakeStore = (initialState?: Partial<State>): State => ({
  Data: {
    ...testInitialState
  },
  ...initialState ?? {}
});
