import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';
import { getAllProductsPromo } from '../../store/products-data/products-data.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { AppRoute, Tab } from '../../constants';
import { MouseEventHandler } from 'react';
import { selectProductId } from '../../store/products-data/products-data.slice';

function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const allProductsPromo = useAppSelector(getAllProductsPromo).slice(0, 3);

  const handleDetailsButton: MouseEventHandler<HTMLAnchorElement> = (event) => {
    dispatch(selectProductId(event.currentTarget.id));
  };

  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
      data-testid="banner"
    >
      {allProductsPromo.map((promo) => (
        <SwiperSlide key={promo.id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`}
              />
              <img
                src={promo.previewImg}
                srcSet={`${promo.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{promo.name}</span>
              <span className="banner__text">
                Профессиональная камера от&nbsp;известного производителя
              </span>
              <Link className="btn" to={`${AppRoute.Product}/${promo.id}/${Tab.Characteristics}`} id={String(promo.id)} onClick={handleDetailsButton}>
                Подробнее
              </Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
