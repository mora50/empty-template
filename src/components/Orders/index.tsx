import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Button, LinkStyled, LoadingSpinner } from "../../styles/components";
import { WrapperOrder } from "./styles";

interface IOrders {
  id: number;
  created_at: string;
  formated_grand_total: string;
  status: string;
  status_label: string;
}

const Orders: FC = () => {
  const [orders, setOrders] = useState<IOrders[]>();
  const [loading, setLoading] = useState<boolean>();
  const [nextPageOrders, setNextPageOrders] = useState<number>(1);

  const loadMoreOrders = useCallback(async () => {
    setLoading(true);

    try {
      const { data: response } = await api.get("customer/order/list", {
        params: { page: nextPageOrders },
      });

      let page = 0;

      const nextPage = response.links.next;

      response.links.next && (page = nextPage.split("=").pop());

      if (!orders) {
        setOrders(response.data);
      } else {
        setOrders([...orders, ...response.data]);
      }

      setNextPageOrders(page);
    } finally {
      setLoading(false);
    }
  }, [nextPageOrders, orders]);

  useEffect(() => {
    loadMoreOrders();
  }, []);

  return !orders ? (
    <div className="flex justify-center mt-5">
      <LoadingSpinner color="primary" size={50} barSize={5} />
    </div>
  ) : (
    <>
      {!orders.length ? (
        <div className="text-center">Sem pedidos</div>
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-6 justify-center gap-5 ">
            {orders?.map((order) => (
              <WrapperOrder
                className=" md:col-span-12 col-span-full"
                key={order.id}
                statusColor={order.status}
              >
                <div className="grid grid-cols-12 ">
                  <div className="col-span-5">
                    <strong> Pedido {order.id} </strong>
                    <div className="mt-2 date">{order.created_at}</div>
                  </div>

                  <div className="col-span-7 text-right">
                    <div
                      className="m-auto-right font-bold" /* bgColor={order.status} */
                    >
                      <span>{order.status_label}</span>
                    </div>
                    <div className="price mt-2">
                      {order.formated_grand_total}
                    </div>
                  </div>
                </div>

                <hr className="my-5" />

                <div className=" text-center mt-2">
                  <div /*  */>
                    <Link
                      passHref
                      prefetch
                      href={`/profile/myorders/${order.id}`}
                    >
                      <LinkStyled
                        bgColor={order.status}
                        minHeight={50}
                        className="font-bold"
                      >
                        VER DETALHES
                      </LinkStyled>
                    </Link>
                  </div>
                </div>
              </WrapperOrder>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            {loading ? (
              <LoadingSpinner color="primary" size={50} barSize={5} />
            ) : (
              nextPageOrders > 0 && (
                <Button
                  bgColor="primary"
                  onClick={() => loadMoreOrders()}
                  className="py-2 px-3 "
                >
                  carregar mais
                </Button>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
