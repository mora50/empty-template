import { useRouter } from "next/router";
import Footer from "../Footer";
import Header from "../Header";
import { WrapperContent } from "./styles";

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <WrapperContent>
      <Header />
      <div className={`py-6 md:py-10 `}>{children}</div>
      <Footer />
    </WrapperContent>
  );
};

export default Layout;
