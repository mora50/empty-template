import Layout from "@components/Layout";
import { getProductsUrl } from "@lib/getProductsList";
import client from "@services/apollo";
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { GET_PRODUCT } from "src/graphql/getProduct";
import { Button, Container } from "@styles/components";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "@components/Loaders/ProductPage/Image";
import Description from "@components/Loaders/ProductPage/Description";
import { useEffect, useState } from "react";
import currencyFormat from "@utils/currencyFormat";

import { ShoppingCartOutline } from "@styled-icons/evaicons-outline/ShoppingCartOutline";

interface IProduct {
  product: {
    name: string;
    formatted_price: string;
    compoundInterest: string;
    offers: [
      {
        price: number;
      }
    ];

    parent: [
      {
        description: string;
      }
    ];
  };
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
    variables: { url_key: params.slug, postcode: "null" },
  });

  const product = response.data.children[0];

  return {
    props: {
      product,
    },
    revalidate: 60 * 60,
  };
}

export default function Slug({ product }: IProduct) {
  const { isFallback } = useRouter();
  const [productData, setproductData] = useState(product);

  function compoundInterest(capital: number, interest: number, time: number) {
    interest = interest / 100;

    let amount = capital * Math.pow(1 + interest, time);

    let amountInterest = amount / time;

    return currencyFormat(amountInterest);
  }

  useEffect(() => {
    if (product) {
      setproductData({
        ...product,
        formatted_price: currencyFormat(product.offers[0].price),
        compoundInterest: compoundInterest(product.offers[0].price, 1.1, 10),
      });
    }
  }, [product]);

  if (isFallback) {
    return "Carregando";
  }

  return (
    <Container>
      <div className="grid gap-3 grid-cols-10">
        <div className="md:col-span-7 col-span-full border border-gray-200 rounded-md px-7 py-5 ">
          <div className="grid grid-cols-6">
            <div className="md:col-span-3 col-span-full"></div>

            <div className="md:col-span-3 mt-5 md:mt-0 col-span-full">
              <h1 className="font-bold">{product.name}</h1>

              <p
                className="text-sm mt-5"
                dangerouslySetInnerHTML={{
                  __html:
                    product.parent[0].description !== "NULL"
                      ? product.parent[0].description
                      : "Sem Descrição",
                }}
              ></p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 col-span-full border border-gray-200 rounded-md px-7 py-5 ">
          <span className="text-sm">Ofertas a partir de:</span>

          <div className="text-3xl font-extrabold">
            {productData?.formatted_price}
          </div>

          <div className="text-xl">
            em até 10x de {productData?.compoundInterest}
          </div>

          <div className="mt-5">
            <Button bgColor="light-green" className="w-full" flexCenter>
              Adicionar <ShoppingCartOutline />
            </Button>
          </div>
        </div>
      </div>

      {/*   {isFallback ? "LOADING" : <div> {product.name}</div>} */}
    </Container>
  );
}

Slug.Layout = Layout;
