import { useRouter } from "next/router";
import { ManagedUIContext } from "../../contexts/modalsContext";
import Footer from "../Footer";
import Header from "../Header";
import { WrapperContent } from "./styles";

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  const isProfilePage = router.pathname.includes("profile");

  return (
    <ManagedUIContext>
      <WrapperContent>
        <Header />

        <div className={`py-6 md:py-10 ${!isProfilePage && "bg-gray-50"}`}>
          {children}
        </div>
        <Footer />
      </WrapperContent>
    </ManagedUIContext>
  );
};

export default Layout;
