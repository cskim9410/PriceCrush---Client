import SliderItem from '@/components/carousel/SliderItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import ArrowButton from '@/components/carousel/ArrowButton';
import * as S from '@/components/stylecomponents/carousel.style';
import * as Api from '@/utils/commonApi';

interface Images {
  main: string;
  details: {
    id: number;
    url: string;
  }[];
}

export interface Product {
  id: number;
  productName: string;
  desc: string;
  auctionEndDate: string;
  currentPrice: string;
  minimumBidPrice: string;
  ownerName: string;
  images: Images;
  currentBidCount: number;
}

interface MainPageCarouselProps {
  popularProducts: Product[];
}

const MainPageCarousel = ({ popularProducts }: MainPageCarouselProps) => {
  const [centerSlideIndex, setCenterSlideIndex] = useState(0);
  // const [popularProducts, setPopularProducts] = useState<Product[]>();
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <ArrowButton direction="prev" size="lg" color="black" />,
    nextArrow: <ArrowButton direction="next" size="lg" color="black" />,
    beforeChange: (prev: number, center: number) => {
      setCenterSlideIndex(center);
    },
  };
  const getData = async () => {
    const data = await Api.get<Product[]>('/products');
    return data;
  };

  // useEffect(() => {
  //   (async () => {
  //     const newData = await getData();
  //     setPopularProducts(newData);
  //   })();
  // }, []);

  return (
    <S.MainPageSlider {...settings}>
      {popularProducts &&
        popularProducts.map((product, index) => (
          <SliderItem
            key={product.id}
            product={product}
            curIdx={index}
            centerIdx={centerSlideIndex}
          />
        ))}
    </S.MainPageSlider>
  );
};
export default MainPageCarousel;
