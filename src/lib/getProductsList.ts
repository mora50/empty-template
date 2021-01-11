import { AxiosRequestConfig } from "axios";
import api from "../services/api";
import currencyFormat from "../utils/currencyFormat";

export default interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  serverSide: boolean;
}

export async function getProductsList() {
  const data = {
    term: "",
    facets: { featured: "No" },
  };

  try {
    let response = await api.post("/product/search", data, {
      serverSide: true,
    } as ICustomAxiosRequestConfig);

    const reducedProductList = response.data.hits.slice(0, 15);

    const productsList = reducedProductList.map((product: any) => {
      const price =
        product.son_offers &&
        product.son_offers.length &&
        product.son_offers.sort(
          (prev: any, curr: any) => prev.price - curr.price
        )[0].price;

      product.image = product.images[0].url;

      return {
        ...product,
        price: price ? currencyFormat(price) : null,
      };
    });

    return productsList;
  } catch (err) {
    return err;
  }
}
