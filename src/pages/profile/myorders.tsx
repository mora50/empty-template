import Layout from "../../components/Layout";
import Orders from "../../components/Orders";
import SideBarProfile from "../../components/SideBarProfile";

export default function MyOrders() {
  return (
    <>
      <h2 className="mb-4 text-xl">Pedidos</h2>
      <Orders />{" "}
    </>
  );
}

MyOrders.Layout = Layout;

MyOrders.SideBarProfile = SideBarProfile;
