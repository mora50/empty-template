import Link from "next/link";
import { FC } from "react";
import Slider from "react-slick";
import ProductBox from "../ProductBox";
import * as S from "./styles";

interface IProducts {
  products: [
    {
      id: number;
      name: string;
      image: string;
      price: string;
      son_suggested_price: string;
      son_url_key: string;
      son_images: [
        {
          url: string;
        }
      ];
    }
  ];
}

var settingsSlider = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,

  responsive: [
    {
      breakpoint: 600,
      settings: {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },

    {
      breakpoint: 800,
      settings: {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: false,
      },
    },

    {
      breakpoint: 1000,
      settings: {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        centerMode: false,
      },
    },
  ],
};

const ProductsCarousel: FC<IProducts> = ({ products }) => {
  return (
    <S.SliderWrapper className=" container m-auto">
      <Slider {...settingsSlider}>
        {products.map((product) => (
          <Link href={`/product/${product.son_url_key}`} key={product.id}>
            <a>
              <ProductBox
                image={product.image ?? product.son_images[0].url}
                price={product.son_suggested_price}
                name={product.name}
              />
            </a>
          </Link>
        ))}
      </Slider>
    </S.SliderWrapper>
  );
};

export default ProductsCarousel;
