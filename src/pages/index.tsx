import ProductsCarousel, { IProducts } from "../components/ProductsCarousel";
import { GetStaticProps } from "next";
import { getProductsList } from "../lib/getProductsList";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Container } from "@styles/components";
import Image from "next/image";

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

export default function Home({ products }: { products: IProducts[] }) {
  const router = useRouter();

  return (
    <>
      <Container className="lg:mb-4 mt-7 text-center">
        <Image src="/home-image.jpg" width="1000" height="500" quality="100" />
      </Container>

      <Container className="mb-5">
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
