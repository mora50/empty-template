import { AxiosRequestConfig } from "axios";
import api from "../services/api";
import currencyFormat from "../utils/currencyFormat";

export default interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  serverSide: boolean;
}

interface IProducts {
  son_offers: [
    {
      price: number;
    }
  ];

  images: [
    {
      url: string;
    }
  ];
  image: string;
  url_key: string;
}

export async function getProductsList() {
  const data = {
    term: "",
    facets: {
      featured: "No",
    },
  };

  try {
    const response = await api.post("/product/search", data, {
      serverSide: true,
    } as ICustomAxiosRequestConfig);

    const reducedProductList: IProducts[] = response.data.hits.slice(0, 15);

    const productsList = reducedProductList.map((product) => {
      const price =
        product.son_offers &&
        product.son_offers.length &&
        product.son_offers.sort((prev, curr) => prev.price - curr.price)[0]
          .price;

      return {
        ...product,
        son_suggested_price: price ? currencyFormat(price) : null,
        price: price ? price : null,
      };
    });

    return productsList;
  } catch (err) {
    return err;
  }
}

export async function getProductsUrl() {
  const productsList = await getProductsList();

  return productsList.map(({ son_url_key }) => ({
    params: { slug: son_url_key },
  }));
}
