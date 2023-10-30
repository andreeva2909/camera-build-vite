import { Product } from '../../types/product';
import ProductCard from '../product-card/product-card';

type ProductCardListProps = {
  products: Product[];
}

function ProductCardList({ products }: ProductCardListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid='product_list'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} data-testid='product_item'/>
      ))}
    </div>
  );
}

export default ProductCardList;
