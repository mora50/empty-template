import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { getProductsList, getProductsUrl } from "@lib/getProductsList";
import client from "@services/apollo";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { GET_PRODUCT } from "src/graphql/getProduct";
import { Button, Container } from "@styles/components";
import { useRouter } from "next/router";
import Description from "@components/Loaders/ProductPage/Description";
import { Carousel } from "react-responsive-carousel";
import ProductsCarousel from "@components/ProductsCarousel";
import currencyFormat from "@utils/currencyFormat";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ShoppingCartOutline } from "@styled-icons/evaicons-outline/ShoppingCartOutline";
import Image from "next/image";
import ProductVariants from "@components/ProductVariants";
import { useUI } from "src/contexts/modalsContext";
import { useLocation } from "src/contexts/locationContext";
import { useQuery } from "@apollo/client";
import compoundInterest from "@utils/compoundInterest";

interface IProduct {
  name: string;
  formatted_price: string;
  compoundInterest: string;
  short_description: string;
  images: [
    {
      path: string;
    }
  ];
  offers: [
    {
      price: number;
      marketplace_seller: [
        {
          shop_title: string;
        }
      ];
    }
  ];

  parent: [
    {
      description: string;
      product_id: string;
    }
  ];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getProductsUrl();

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const response = await client.query({
    query: GET_PRODUCT,
    variables: { url_key: params.slug, postcode: `null` },
  });

  const carouselProducts = await getProductsList();
  const product = response.data.children[0];

  return {
    props: {
      product,
      carouselProducts,
    },
    revalidate: 60 * 60,
  };
}

export default function Slug({
  product,
  carouselProducts,
}: {
  product: IProduct;
}) {
  const { isFallback } = useRouter();
  /**Multable product data */
  const [productData, setproductData] = useState<IProduct>(product);
  const { toggleLocationBar } = useUI();
  const { location } = useLocation();

  useEffect(() => {
    if (location) {
    }
  }, [location]);

  useEffect(() => {
    if (product) {
      setproductData({
        ...product,
        formatted_price: currencyFormat(product.offers[0].price),
        compoundInterest: currencyFormat(
          compoundInterest(product.offers[0].price, 1.1, 10)
        ),
      });
    }
  }, [product]);

  if (isFallback) {
    return "Carregando";
  }

  const renderThumbs = () =>
    productData.images.map(({ path }) => (
      <div className="flex" key={path}>
        <Image
          src={`${process.env.NEXT_PUBLIC_AMAZON_URL_IMAGE}/${path}`}
          width={55}
          height={55}
        />
      </div>
    ));

  return (
    <Container>
      {productData && (
        <div className="grid gap-3 grid-cols-10">
          <div className="md:col-span-7 bg-white col-span-full shadow-md rounded-md px-7 py-5 ">
            <div className="grid md:gap-x-10 grid-cols-6">
              <div className="md:col-span-3 col-span-full">
                <Carousel
                  showStatus={false}
                  showIndicators={false}
                  showArrows={false}
                  renderThumbs={renderThumbs}
                >
                  {product.images.map(({ path }) => (
                    <div key={path}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_AMAZON_URL_IMAGE}/${path}`}
                        width={350}
                        height={350}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="md:col-span-3  col-span-full">
                <h1 className="font-bold text-xl">{product.name}</h1>

                <div
                  className="text-sm mt-5"
                  dangerouslySetInnerHTML={{
                    __html: `<p> ${
                      product.short_description.length
                        ? product.short_description
                        : "Sem Descrição"
                    }</p>`,
                  }}
                ></div>

                <div className="my-7">
                  <ProductVariants parentId={product.parent[0].product_id} />
                </div>

                <div className="mt-5 underline text-sm">
                  Mais informações
                  <div className="my-4">
                    <hr />
                  </div>
                  Conheça nossa política de troca
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-white col-span-full shadow-md rounded-md px-7 py-5 ">
            <div className="fixed z-50 md:relative md:shadow-none md:border-none md:p-0 w-full border  shadow-top  left-0 py-2 px-5 bg-white bottom-0">
              <span className="text-sm">Ofertas a partir de:</span>
              <div className="md:text-3xl text-2xl font-extrabold">
                {productData.formatted_price}
              </div>
              <div className="text-md">
                em até 10x de {productData.compoundInterest}
              </div>
              <div className="mt-5">
                <Button bgColor="light-green" className="w-full" flexCenter>
                  Adicionar{" "}
                  <span className="ml-1">
                    {" "}
                    <ShoppingCartOutline />
                  </span>
                </Button>
              </div>
            </div>

            {location && (
              <div className="text-sm my-5">
                <div> Ofertas mais próximas de: </div>

                <span
                  onClick={toggleLocationBar}
                  className="flex font-bold underline cursor-pointer"
                >
                  <span className="truncate">
                    Una cidad{/* {location.street} */}, {location.neighborhood}{" "}
                    - {location.city}
                  </span>
                </span>
              </div>
            )}

            <div className="text-sm">
              Vendido por:{" "}
              <strong>
                {" "}
                {productData.offers[0].marketplace_seller[0].shop_title}{" "}
              </strong>
            </div>
          </div>

          <div className="col-span-full mt-5">
            <h2 className="text-xl md:text-2xl font-bold">
              Talvez você tenha interesse
            </h2>
            <ProductsCarousel products={carouselProducts} />
          </div>

          <div className="bg-white col-span-full shadow-md rounded-md px-7 py-5">
            <h2 className="text-xl font-bold mb-5">Especificações</h2>

            <table>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <ul>
              {product.attributes.map(
                (attribute, index) =>
                  attribute.text_value !== null &&
                  attribute.attribute[0].code !== "short_description" &&
                  attribute.attribute[0].code !== "description" &&
                  attribute.attribute[0].code !== "name" &&
                  attribute.attribute[0].code !== "url_key" &&
                  attribute.attribute[0].code !== "meta_title" &&
                  attribute.attribute[0].code !== "meta_description" &&
                  attribute.attribute[0].code !== "meta_keywords" &&
                  attribute.attribute[0].code !== "width" &&
                  attribute.attribute[0].code !== "height" &&
                  attribute.attribute[0].code !== "depth" &&
                  attribute.attribute[0].code !== "weight" &&
                  attribute.text_value && (
                    <li key={index}>
                      <strong>{attribute.attribute[0].admin_name}: </strong>
                      {attribute.text_value}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      )}

      {/*   {isFallback ? "LOADING" : <div> {product.name}</div>} */}
    </Container>
  );
}

Slug.Layout = Layout;
