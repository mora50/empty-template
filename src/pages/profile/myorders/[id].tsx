import Layout from "@components/Layout";
import LoadingAllScreen from "@components/LoadingAllScreen";
import SideBarProfile from "@components/SideBarProfile";
import api from "@services/api";
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
  shipping_amount: string;
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
      setOrder(response);
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
          <span>Pedido: {order.id}</span>

          <div className="grid grid-cols-3">
            <span>Pagamento</span>
          </div>
        </>
      )}
    </div>
  );
}

Order.Layout = Layout;

Order.SideBarProfile = SideBarProfile;
