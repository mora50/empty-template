import CheckoutAddresses from "@components/CheckoutAddresses";
import CheckoutLayout from "@components/CheckoutLayout";
import LoadingAllScreen from "@components/LoadingAllScreen";
import InputRadio from "@components/UI/InputRadio";
import api from "@services/api";
import { LoadingSpinner } from "@styles/components";
import currencyFormat from "@utils/currencyFormat";
import { useCallback, useEffect, useState } from "react";
import { useCart, ICart } from "src/contexts/cartContext";
import cn from "classnames";
import ShippingsLoader from "@components/Loaders/ShippingsLoader";

type Shippings = { [key: string]: IShipping[] };

interface IShipping {
  carrier: string;
  code: string;
  delivery_time: string;
  price: number;
  formatted_price: string;
  selected: boolean;
  shippingIndex: string;
  loading: boolean;
}

export default function Dispatch() {
  const { cart, loading: loadingCart, setCart } = useCart();
  const [blockShippings, setBlockShippings] = useState<boolean>();

  const [shippings, setShippings] = useState<Shippings>();

  const calculateShipping = useCallback(async () => {
    setShippings(null);

    try {
      const { data: response } = await api.get<Shippings>(
        "/customer/checkout/cart/shipping/calculate"
      );

      Object.entries(response).map(([key, value]) => {
        const shippingDetails = Object.entries(value).map(
          ([key, value], index) => {
            value.shippingIndex = key;
            value.formatted_price = currencyFormat(value.price);
            value.selected = index === 0;

            return value;
          }
        );

        return (response[key] = shippingDetails);
      });

      setShippings(response);
    } finally {
    }
  }, []);

  const saveAddress = useCallback(
    async (id: number) => {
      try {
        await api.post("/customer/checkout/save-address", {
          billing: {
            address_id: id,
            use_for_shipping: true,
          },
          shipping: {},
        });

        await calculateShipping();
      } finally {
      }
    },
    [calculateShipping]
  );

  const saveShipping = useCallback(
    async (shipment) => {
      setBlockShippings(true);

      try {
        const { data: response } = await api.post(
          "/customer/checkout/save-shipping",
          shipment
        );

        const cartUpdated: ICart = response.data;

        if (cartUpdated) {
          const sellers = Object.entries(cartUpdated.sellers);

          cartUpdated.items = sellers.map((seller) => seller[1].items).flat();

          cartUpdated.sellers = sellers.map(([key, value]) => ({
            ...value,
            sellerId: parseInt(key),
          }));

          setCart(cartUpdated);
        }
      } catch (err) {
      } finally {
        setBlockShippings(false);
      }
    },
    [setCart]
  );

  const createSaveShipping = async (
    shippingIndex: string,
    sellerId: number,
    shipmentNumber: number
  ) => {
    const shippingAtrr = {
      [shipmentNumber]: {
        seller: sellerId,
        shipping: shippingIndex,
      },
    };

    return await saveShipping(shippingAtrr);
  };

  useEffect(() => {
    if (shippings) {
      saveShipping(
        Object.entries(shippings).reduce(
          (key, value, index) => ({
            ...key,
            [index + 1]: {
              seller: value[0],
              shipping: value[1][0]?.shippingIndex,
            },
          }),
          {}
        )
      );
    }
  }, [saveShipping, shippings]);

  return (
    <div>
      {loadingCart && <LoadingAllScreen />}

      <CheckoutAddresses callback={saveAddress} />

      {shippings && (
        <div className="divide-y">
          {cart?.sellers.map((seller, index) => (
            <div key={seller.sellerId} className="animated fadeIn py-4">
              <div className=" col-span-full ">
                <div key={seller.sellerId} className=" animated ease-out">
                  <div className="mb-2">
                    <div className="text-sm  text-gray-500 font-bold">
                      Remessa: {index + 1}
                    </div>
                  </div>

                  <div>
                    <ul>
                      {seller.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center  lg:my-2  mb-5"
                        >
                          <div>
                            <span>
                              {item.quantity} {item.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <span className="text-sm  pt-2 text-gray-500 pb-2 lg:pb-0">
                      Vendido por:{" "}
                      <span className="font-bold">{seller.name}</span>
                    </span>

                    <div className="mt-5 mb-2">Fretes disponíveis</div>

                    {!shippings && (
                      <div className="flex overflow-hidden">
                        {Array.from(Array(2), (_, i) => (
                          <div className="mr-2" key={i}>
                            <ShippingsLoader />
                          </div>
                        ))}
                      </div>
                    )}

                    {shippings && (
                      <div
                        className={cn("flex overflow-x-auto  pb-3", {
                          "opacity-75 pointer-events-none": blockShippings,
                        })}
                      >
                        {shippings[seller.sellerId]?.map(
                          (shipping, shipmentNumber) => (
                            <div
                              className="mr-2 relative"
                              key={shipping.shippingIndex}
                            >
                              {shipping.loading && (
                                <span className="absolute top-1 right-1">
                                  <LoadingSpinner
                                    size={15}
                                    barSize={2}
                                    color="primary"
                                  />
                                </span>
                              )}

                              <InputRadio
                                name={seller.sellerId + "shipping"}
                                id={`${shipping.shippingIndex}address`}
                                defaultChecked={shipping.selected}
                                onClick={() =>
                                  createSaveShipping(
                                    shipping.shippingIndex,
                                    seller.sellerId,
                                    shipmentNumber + 1
                                  )
                                }
                                labeltext={
                                  <>
                                    <span className="text-gray-700">
                                      {shipping.carrier}
                                    </span>{" "}
                                    <br />
                                    <span className="text-black">
                                      {shipping.formatted_price}
                                    </span>{" "}
                                    <br />
                                    <small className="text-gray-500">
                                      Receba em: {shipping.delivery_time}{" "}
                                      {shipping.delivery_time == "1"
                                        ? "dia"
                                        : "dias"}
                                    </small>
                                  </>
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Dispatch.CheckoutLayout = CheckoutLayout;
