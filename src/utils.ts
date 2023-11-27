import { CurrentSortingType, CurrentSortingDirection, FILTER_CATEGORY, FILTER_TYPE, FILTER_LEVEL, NameCategoryFromServer } from './constants';
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

function sortProducts(products: Product[], sortingType: SortingType | null, sortingDirection: SortingDirection | null) {
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
  return products.slice();
}

function filterProductsByCategory(product: Product, category: string | null) {
  if (category === 'none' || category === null || category === '') {
    return product;
  }
  if (category === FILTER_CATEGORY[0].nameEng) {
    return product.category === NameCategoryFromServer.Photocamera;
  }
  if (category === FILTER_CATEGORY[1].nameEng) {
    return product.category === NameCategoryFromServer.Videocamera;
  }
}

function filterProductsByType(products: Product[] | undefined, type: string[]) {
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

function filterProductsByLevel(products: Product[] | undefined, level: string[]) {
  if (level.length === 0 || level[0] === 'null' || level[0] === '') {
    return products;
  } else {
    const currentProducts = [] as Product[];
    products?.map((product) => {
      level.map((element) => {
        if ((product.level === FILTER_LEVEL[0].nameRu) && (element === FILTER_LEVEL[0].nameEng)) {
          currentProducts.push(product);
        }
        if ((product.level === FILTER_LEVEL[1].nameRu) && (element === FILTER_LEVEL[1].nameEng)) {
          currentProducts.push(product);
        }
        if ((product.level === FILTER_LEVEL[2].nameRu) && (element === FILTER_LEVEL[2].nameEng)) {
          currentProducts.push(product);
        }
      });
    });
    return currentProducts;
  }
}

function getMinumimumPriceProduct (products: Product[] | undefined) {
  if (products !== undefined) {
    return sortProducts(products, CurrentSortingType.Price, CurrentSortingDirection.Up)[0]?.price;
  }
}

function getMaximumPriceProduct (products: Product[] | undefined) {
  if (products !== undefined) {
    return sortProducts(products, CurrentSortingType.Price, CurrentSortingDirection.Down)[0]?.price;
  }
}

function filterProductsByPrice(product: Product, currentPriceMin: number, currentPriceMax: number, priceMax: number) {
  if (currentPriceMin === 0 && currentPriceMax === 0) {
    return product;
  }
  if (currentPriceMax < currentPriceMin) {
    return product.price >= currentPriceMin && product.price <= priceMax;
  }
  return product.price >= currentPriceMin && product.price <= currentPriceMax;

}

export { sortReviews, scrollWindow, sortProducts, filterProductsByCategory, filterProductsByType, filterProductsByLevel, getMinumimumPriceProduct, getMaximumPriceProduct, filterProductsByPrice };
