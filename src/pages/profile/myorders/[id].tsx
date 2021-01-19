import Layout from "@components/Layout";
import LoadingAllScreen from "@components/LoadingAllScreen";
import SideBarProfile from "@components/SideBarProfile";

import api from "@services/api";
import { LinkStyled } from "@styles/components";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IOrder {
  id: string;
  boleto_expiration_date: string;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  formated_grand_total: string;
  formated_sub_total: string;
  formated_shipping_amount: string;
  payment_method: string;
  boleto_url: string;

  shipping_address: {
    address: string;
    number: number;
    city: string;
    postcode: number;
    state: string;
  };
}

export default function Order() {
  const [order, setOrder] = useState<IOrder>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const id = router.query.id as string;

  const handleOrder = async () => {
    setLoading(true);

    try {
      const { data: response } = await api.get(`/customer/order/list/${id}`);

      setOrder(response.data[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      handleOrder();
    } else {
      router.push("/profile/myorders");
    }
  }, [id]);

  return (
    <div>
      {loading ? (
        <LoadingAllScreen />
      ) : !order ? (
        <div className="text-center">Erro ao carregar o pedido</div>
      ) : (
        <>
          <span className="text-xl font-bold">Pedido: {order.id}</span>

          <div className="grid grid-cols-3 gap-2 md:divide-x mt-5 text-gray-500">
            <div className="md:col-span-1 col-span-full md:px-3">
              <div className="grid grid-cols-2 items-center mb-5">
                <div>
                  <div className="mb-1 font-bold"> Pagamento </div>

                  <div className="font-bold  text-black">
                    {" "}
                    {order.payment_method}
                  </div>
                </div>

                <div>
                  Valor:{" "}
                  <span className=" text-black">
                    {order.formated_grand_total}
                  </span>
                </div>
              </div>

              {order.payment_method === "Boleto" && (
                <div className="text-center">
                  <LinkStyled
                    href={order.boleto_url}
                    target="_blank"
                    bgColor="primary"
                    rel="noopener noreferrer"
                  >
                    Ver boleto
                  </LinkStyled>
                </div>
              )}
            </div>

            <div className="md:col-span-1 col-span-full md:px-5 my-5 md:my-0">
              <div className="mb-4 font-bold">Total pago</div>
              <div className="text-gray-500">
                <p className="flex justify-between mb-2">
                  <span> Subtotal </span>{" "}
                  <span> {order.formated_sub_total} </span>
                </p>

                <p className="flex justify-between mb-2">
                  <span>Frete</span>{" "}
                  <span>{order.formated_shipping_amount}</span>
                </p>
              </div>

              <p className="flex justify-between border-black border-t pt-2 text-black">
                <span>Total</span> <span> {order.formated_grand_total}</span>
              </p>
            </div>

            <div className="md:col-span-1 col-span-full md:px-3 ">
              <div className="mb-2 font-bold">Endereço</div>
              <p>
                {order.shipping_address.address},{" "}
                {order.shipping_address.number}{" "}
              </p>
              <p className="my-2">
                {" "}
                {order.shipping_address.city} - {order.shipping_address.state}
              </p>
              <p>{order.shipping_address.postcode}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

Order.Layout = Layout;

Order.SideBarProfile = SideBarProfile;
