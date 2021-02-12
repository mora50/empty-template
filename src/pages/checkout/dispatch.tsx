import CheckoutAddresses from "@components/CheckoutAddresses";
import CheckoutLayout from "@components/CheckoutLayout";
import LoadingAllScreen from "@components/LoadingAllScreen";
import api from "@services/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "src/contexts/cartContext";
import { IAddresses } from "../profile/addresses";

export default function Dispatch() {
  const { cart, loading } = useCart();

  return (
    <div>
      {loading && <LoadingAllScreen />}

      <div className="mt-4">
        <CheckoutAddresses />
      </div>

      <div className="divide-y  ">
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
                  {seller.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex items-center  lg:my-2  mb-5">
                        <div>
                          <span>
                            {item.quantity} {item.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span className="text-sm  pt-2 text-gray-500 pb-2 lg:pb-0">
                    Vendido por:{" "}
                    <span className="font-bold">{seller.name}</span>
                  </span>

                  <div className="mt-5">Fretes disponíveis</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Dispatch.CheckoutLayout = CheckoutLayout;
