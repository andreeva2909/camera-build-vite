import { CurrentSortingType, CurrentSortingDirection, FILTER_CATHEGORY, FILTER_TYPE } from './constants';
import { Product } from './types/product';
import { Review } from './types/review';
import { SortingDirection, SortingType } from './types/sorting';

function sortReviews(reviewA: Review, reviewB: Review): number {
  const reviewDateA = new Date(reviewA.createAt);
  const reviewDateB = new Date(reviewB.createAt);
  return reviewDateB.getTime() - reviewDateA.getTime();
}

function scrollWindow(params : object) {
  window.scrollTo(params);
}

function sortPriceUp(productA: Product, productB: Product): number {
  return productA.price - productB.price;
}

function sortPriceDown(productA: Product, productB: Product): number {
  return productB.price - productA.price;
}

function sortPopularUp(productA: Product, productB: Product): number {
  return productA.rating - productB.rating;
}

function sortPopularDown(productA: Product, productB: Product): number {
  return productB.rating - productA.rating;
}

function sortProducts(products: Product[], sortingType: SortingType, sortingDirection: SortingDirection) {
  if ((sortingType === CurrentSortingType.None && sortingDirection === CurrentSortingDirection.None) || (sortingType === 'null' && sortingDirection === 'null')) {
    return products.slice();
  }

  if ((sortingType === CurrentSortingType.Price || sortingType === CurrentSortingType.Popular) && sortingDirection === CurrentSortingDirection.None) {
    if (sortingType === CurrentSortingType.Price) {
      return products.slice().sort(sortPriceUp);
    }
    if (sortingType === CurrentSortingType.Popular) {
      return products.slice().sort(sortPopularUp);
    }
  }

  if ((sortingDirection === CurrentSortingDirection.Up || sortingDirection === CurrentSortingDirection.Down) && sortingType === CurrentSortingType.None) {
    if (sortingDirection === CurrentSortingDirection.Up) {
      return products.slice().sort(sortPriceUp);
    }
    if (sortingDirection === CurrentSortingDirection.Down) {
      return products.slice().sort(sortPriceDown);
    }
  }

  if (sortingType === CurrentSortingType.Price && sortingDirection === CurrentSortingDirection.Up) {
    return products.slice().sort(sortPriceUp);
  }

  if (sortingType === CurrentSortingType.Price && sortingDirection === CurrentSortingDirection.Down) {
    return products.slice().sort(sortPriceDown);
  }

  if (sortingType === CurrentSortingType.Popular && sortingDirection === CurrentSortingDirection.Up) {
    return products.slice().sort(sortPopularUp);
  }

  if (sortingType === CurrentSortingType.Popular && sortingDirection === CurrentSortingDirection.Down) {
    return products.slice().sort(sortPopularDown);
  }
}

function filterProductsByCathegory(product: Product, cathegory: string) {
  if (cathegory === 'none' || cathegory === 'null') {
    return product;
  }
  if (cathegory === FILTER_CATHEGORY[0].nameEng) {
    return product.category === 'Фотоаппарат';
  }
  if (cathegory === FILTER_CATHEGORY[1].nameEng) {
    return product.category === 'Видеокамера';
  }
}

function filterProductsByType(products: Product[] | undefined, type: string[]) {
  console.log(type);
  if (type.length === 0 || type[0] === 'null' || type[0] === '') {
    return products;
  } else {
    const currentProducts = [] as Product[];
    products?.map((product) => {
      type.map((element) => {
        if ((product.type === FILTER_TYPE[0].nameRu) && (element === FILTER_TYPE[0].nameEng)) {
          currentProducts.push(product);
        }
        if ((product.type === FILTER_TYPE[1].nameRu) && (element === FILTER_TYPE[1].nameEng)) {
          currentProducts.push(product);
        }
        if ((product.type === FILTER_TYPE[2].nameRu) && (element === FILTER_TYPE[2].nameEng)) {
          currentProducts.push(product);
        }
        if ((product.type === FILTER_TYPE[3].nameRu) && (element === FILTER_TYPE[3].nameEng)) {
          currentProducts.push(product);
        }
      });
    });
    return currentProducts;
  }
}

export { sortReviews, scrollWindow, sortProducts, filterProductsByCathegory, filterProductsByType };
