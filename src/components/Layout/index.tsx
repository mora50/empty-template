import { ManagedUIContext } from "../../contexts/modalsContext";
import Footer from "../Footer";
import Header from "../Header";
import { WrapperContent } from "./styles";

const Layout: React.FC = ({ children }) => {
  return (
    <ManagedUIContext>
      <WrapperContent>
        <Header />

        <div className="my-6 md:my-10">{children}</div>
        <Footer />
      </WrapperContent>
    </ManagedUIContext>
  );
};

export default Layout;
