import Layout from "../components/Layout";
import Orders from "../components/Orders";
import SideBarProfile from "../components/SideBarProfile";

export default function Profile() {
  return (
    <>
      <h2 className="mb-4 text-xl">Pedidos</h2>
      <Orders />{" "}
    </>
  );
}

Profile.Layout = Layout;

Profile.SideBarProfile = SideBarProfile;
