import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "../styles/pages/home";
import ProductsCarousel from "../components/ProductsCarousel";
import { GetStaticProps } from "next";
import { getProductsList } from "../lib/getProductsList";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Container } from "@styles/components";
import * as O from "@styles/pages/myorders/order";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProductsList();

  /* console.log(response);

  const products = await response.json(); */

  return {
    props: {
      products,
    },
    revalidate: 60 * 60,
  };
};

export default function Home({ products }) {
  const router = useRouter();

  return (
    <>
      <Container className="lg:mb-4 mt-7">
        <div className="flex flex-col mb-5">
          {/*   <O.BarWrapper className="mt-5">
            <O.Bar width={barWidth()} />
          </O.BarWrapper>

          <div className="flex justify-between w-4/5 -mt-1.5">
            {Array.from(Array(5), (_, i) => (
              <O.PointStatus key={i} />
            ))}
          </div> */}
        </div>

        <Slider {...settings}>
          <div className="h-64">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWoAAACLCAMAAAB/aSNCAAAAdVBMVEX////ycybxaQD97efycB/ycBv96d70jVb0hEP1mW7xbBD6xav71cfxagbyciP6yrLyeC3zfzz4wKX60Lz++/j73tD1nnH1l2bzfDf+9/P849f2pXz0hkb5yLT60cHxYgD0i1H3ror3tZX4uZv2pXr3tpf0jVWqahAnAAADSElEQVR4nO3c627aQABE4WAwUHMN4R6aEGjz/o/YVmoLqF7veKkHJM75H6/4ZEViMDw9mevmrfuo03O/dHdQ24LaFtS2oLYFtS2obUFtC2pbUNuC2hbUtqC2BbUtqG1BbQtqW1DbgtoW1LagthWiHneaC+oL6X5z7cZQn5VtGjxzWmb9uNTtBs+EGupmg9oW1LagtgW1LahtQW0LaltQ24LaFtS2oLYFtS2obUFtC2pbUNu6AXW39HPch6Uuvg7r99ZVTly0+Bj30npUu/f9XDhwmPNwwrUVS+W8l6z0noa6RtmHctwkC/091LL0QTltFpSGWpaeKYcdRuErQC01Hk2Us17D9zTUonTxohy1rLinoRalh8pJq6LyKlDH63QWwjnzXrU01PHylvIecbOPSEMdl35W1pLNOnoM1DHpnfIgdnta/mYcar1Cmj22gjTUEemeIr0IfPsF6hrS0sA0DA1MUMtpA1NwyoNal5YGpkHVm3GoNemjcvnZSLunoQ42zgbK1Q/qPQ11UFobmL7p0lCHpKWBqXrKg1pR0QamyJQHtYAiDUzRKQ/qaPlaGpj6NS8M9b/SfWVgEqY8qCMVO2X26K6V2QPqSmlpYJKmPKgrG0kD0yLwrBjUNaRflUu+iQMT1OHUKS8BGupLaWlgGsgDE9SBxIHpmCgN9Um6kJ4V+0j77wH1ufR/n/KgLnfIlYHpaVlv9oC6hKG1Va5Vb8qDuqR8qgxM8+izYlBHpbWB6fm656Sg/jUwSc+KXSkN9U/pT23Ku/aJVqhHK+Uq21bCwAT1pbQ0MC2SBiaoz9MGJvGpPKirpL8rl5ikzh5Qn6SlLyOmTnlQ/22cSQPTMX32gPq3tDYwpU95UP955drAVPkFW6gvClBrA9N89V4kxE+vnDVeaz9YMxskNFnz202ntI9cUuuXvbWEuomghrrZoLYFtS2obUFtC2pbUNuC2hbUtqC2BbUtqG1BbQtqW1DbgtoW1LYC1NKDCantoD573fsvDTYtPfJBqVudvMHKT3xUan9Q24LaFtS2oLYFtS2obUFtC2pbUNuC2hbUtqC2BbUtqG1BbQtqW1DbgtoW1LY6n7emaLpudi/tbk3RdPP23XRrCmqqH048ZR8aLoPkAAAAAElFTkSuQmCC"
              alt=""
              className="w-full"
            />
          </div>
        </Slider>
      </Container>

      <Container>
        {router.isFallback ? (
          "Carregando"
        ) : (
          <ProductsCarousel products={products} />
        )}
      </Container>

      <Container className="mb-5">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-400 col-span-2 h-64 rounded-md"></div>
          <div className="bg-gray-500 col-span-2 h-64 rounded-md"></div>
        </div>

        <div className="bg-gray-600 w-full h-64 mt-4 rounded-md"></div>
      </Container>
    </>
  );
}

Home.Layout = Layout;
