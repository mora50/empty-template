import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { getProductsList, getProductsUrl } from "@lib/getProductsList";
import client from "@services/apollo";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { GET_PRODUCT } from "src/graphql/getProduct";
import { Button, Container, LoadingSpinner } from "@styles/components";
import { useRouter } from "next/router";
import Description from "@components/Loaders/ProductPage/Description";
import { Carousel } from "react-responsive-carousel";
import ProductsCarousel, { IProducts } from "@components/ProductsCarousel";
import currencyFormat from "@utils/currencyFormat";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ShoppingCartOutline } from "@styled-icons/evaicons-outline/ShoppingCartOutline";
import Image from "next/image";
import ProductVariants from "@components/ProductVariants";
import { useUI } from "src/contexts/modalsContext";
import { useLocation } from "src/contexts/locationContext";
import compoundInterest from "@utils/compoundInterest";
import { useCart } from "src/contexts/cartContext";

interface IProduct {
  name: string;
  formatted_price: string;
  compoundInterest: string;
  short_description: string;
  id: number;
  specs: {
    label: string;
    value: string;
  }[];
  attributes: [
    {
      text_value: string;
      attribute: [
        {
          admin_name: string;
          code: string;
        }
      ];
    }
  ];
  images: [
    {
      path: string;
    }
  ];
  offers: [
    {
      price: number;
      marketplace_seller_id: number;
      id: number;
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
  carouselProducts: IProducts[];
}) {
  const { isFallback } = useRouter();
  /**Multable product data */
  const [productData, setProductData] = useState<IProduct>(product);
  const { openLocationBar } = useUI();
  const { location } = useLocation();
  const { addItemCart, changeCartLoading, handleCart } = useCart();

  useEffect(() => {
    if (product) {
      const nonAllowedAttr = [
        "short_description",
        "description",
        "name",
        "url_key",
        "meta_description",
        "meta_title",
        "meta_keywords",
        "width",
        "height",
        "depth",
        "weight",
        "status",
        "featured",
        "new",
        "visible_individually",
        "tax_category_id",
        "pmina",
        "pmaxa",
      ];

      const allowedAttr = product.attributes.filter(
        (attr) => !nonAllowedAttr.includes(attr.attribute[0].code)
      );

      const specs = allowedAttr.map((attr) => {
        const attribute = attr.attribute[0];

        return {
          label: attribute.admin_name,
          value: attr.text_value,
        };
      });

      setProductData({
        ...product,
        formatted_price: currencyFormat(product.offers[0]?.price),
        specs,
        compoundInterest: currencyFormat(
          compoundInterest(product.offers[0]?.price, 1.1, 10)
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

  const addCart = async () => {
    const offer = product.offers[0];

    const sellerId = offer.marketplace_seller_id;

    const offerId = offer.id;

    const quantity = 1;

    await addItemCart({
      productId: product.id,
      quantity,
      sellerId,
      offerId,
    });

    await handleCart();
  };

  return (
    <Container className="animated fadeIn">
      {productData && (
        <div className="grid gap-3 grid-cols-10">
          <div className="md:col-span-7 bg-white  col-span-full shadow-md op rounded-md px-7 py-5 ">
            <div className="grid md:gap-x-10 grid-cols-6">
              <div className="md:col-span-3 col-span-full">
                <Carousel
                  showStatus={false}
                  showIndicators={false}
                  showArrows={false}
                  renderThumbs={renderThumbs}
                  swipeable={false}
                  swipeScrollTolerance={50}
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

                {/* <div className="my-7 ">
                  <ProductVariants parentId={product.parent[0].product_id} />
                </div> */}

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
            <div className="fixed z-50 md:relative md:shadow-none md:border-none md:p-0 w-full border shadow-top  left-0 py-2 px-5 bg-white bottom-0">
              <span className="text-sm">Ofertas a partir de:</span>
              <div className="md:text-3xl text-2xl font-extrabold">
                {productData.formatted_price}
              </div>
              <div className="text-md">
                em até 10x de {productData.compoundInterest}
              </div>
              <div className="mt-5">
                <Button
                  onClick={() => addCart()}
                  bgColor="light-green"
                  className="w-full h-10"
                  flexCenter
                >
                  {changeCartLoading ? (
                    <LoadingSpinner color="green" size={25} barSize={3} />
                  ) : (
                    <>
                      Adicionar{" "}
                      <span className="ml-1">
                        {" "}
                        <ShoppingCartOutline />
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {location && (
              <div className="text-sm mt-5">
                <div> Ofertas mais próximas de: </div>

                <span
                  onClick={openLocationBar}
                  className="flex font-bold underline cursor-pointer"
                >
                  <span className="truncate">
                    Una cidad{/* {location.street} */}, {location.neighborhood}{" "}
                    - {location.city}
                  </span>
                </span>
              </div>
            )}

            <div className="text-sm mt-5">
              Vendido por:{" "}
              <strong>
                {" "}
                {productData.offers[0]?.marketplace_seller[0].shop_title}{" "}
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

            <table className="table-auto">
              <tbody>
                {productData.specs?.map((spec) => (
                  <tr key={spec.label}>
                    <td>{spec.label}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/*   {isFallback ? "LOADING" : <div> {product.name}</div>} */}
    </Container>
  );
}

Slug.Layout = Layout;
