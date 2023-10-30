import ProductCard from '../product-card/product-card';
import { useAppSelector } from '../../hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './style.css';
import { getSimilarProducts } from '../../store/products-data/products-data.selectors';

function SimilarProducts(): JSX.Element {
  const similarProducts = useAppSelector(getSimilarProducts);

  return (
    <div className="page-content__section" data-testid="similar_products">
      {(similarProducts.length !== 0) &&
        <section className="product-similar">
          <div className="container">
            <h2 className="title title--h3">Похожие товары</h2>
            <div className="product-similar__slider">
              <div className="product-similar__slider-list">
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={3}
                  slidesPerGroup={3}
                  spaceBetween={32}
                  navigation={
                    {
                      nextEl: '.slider-controls--next',
                      prevEl: '.slider-controls--prev',
                    }
                  }
                >
                  {similarProducts.map((similarProduct) => (
                    <SwiperSlide key={similarProduct.id}>
                      <ProductCard style={{ display: 'block', width: '100%', margin: '0' }} product={similarProduct} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  className="slider-controls slider-controls--prev"
                  type="button"
                  aria-label="Предыдущий слайд"
                  style={{ pointerEvents: 'auto' }}
                >
                  <svg width={7} height={12} aria-hidden="true">
                    <use xlinkHref="#icon-arrow" />
                  </svg>
                </button>
                <button
                  className="slider-controls slider-controls--next"
                  type="button"
                  aria-label="Следующий слайд"
                  style={{ pointerEvents: 'auto' }}
                >
                  <svg width={7} height={12} aria-hidden="true">
                    <use xlinkHref="#icon-arrow" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>}
    </div>
  );
}

export default SimilarProducts;
