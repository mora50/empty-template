import ProgressCircleBar from "@components/UI/ProgressCircleBar";
import { Container, LinkStyled, LoadingSpinner } from "@styles/components";
import { useEffect, useState } from "react";
import { useCart } from "src/contexts/cartContext";
import { Cart } from "@styled-icons/boxicons-regular/Cart";
import { Truck } from "@styled-icons/bootstrap/Truck";

import { Payment } from "@styled-icons/material/Payment";
import Link from "next/link";
import { useRouter } from "next/router";

interface ICurrentCheckout {
  text: string;
  icon?: any;
}

const CheckoutLayout: React.FC = ({ children }) => {
  const [progress, setProgress] = useState(70);
  const [screenSize, setScreenSize] = useState<number>();
  const [currentCheckout, setCurrentCheckout] = useState<ICurrentCheckout>({
    text: "",
  });
  const { cart, loading, handleCart } = useCart();

  const router = useRouter();

  useEffect(() => {
    let step: ICurrentCheckout;

    const subPage = "/checkout/";

    switch (router.pathname) {
      case `${subPage}cart`:
        step = { text: "Carrinho", icon: Cart };
        setProgress(33);

        break;

      case `${subPage}dispatch`:
        step = { text: "Entrega", icon: Truck };
        setProgress(66);
        break;

      case `${subPage}payment`:
        step = { text: "Pagamento", icon: Payment };
        setProgress(100);

        break;

      default:
        step = { text: "", icon: LoadingSpinner };
        setProgress(100);
        break;
    }

    setCurrentCheckout(step);
  }, [router.pathname]);

  useEffect(() => {
    if (window) {
      setScreenSize(window.screen.width);
    }
  }, []);

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="bg-primary  text-white text-xl font-bold py-2 mb-10 fixed w-full z-10">
        <Container>
          <Link href="/">
            <a> Logo</a>
          </Link>
        </Container>
      </div>

      <Container className="pt-28 md:pt-20">
        {!cart && !loading ? (
          <div className="bg-white p-5 text-center  rounded-md ">
            <strong> Seu carrinho está vazio </strong> <br /> Vá até a página
            inicial ou procure no site produtos que possam te alegrar. Quando
            encontrá-los, clique no botão adicionar ao carrinho.
            <div className="mt-5 ">
              <Link passHref href="/">
                <LinkStyled bgColor="light-green">
                  Voltar para página inicial{" "}
                </LinkStyled>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-x-5 ">
            <div className="lg:col-span-9 md:col-span-8 col-span-full shadow-md rounded-md bg-white  px-4">
              {children}
            </div>
            <div className="lg:col-span-3 md:col-span-4 mt-5 md:mt-0 col-span-full  bottom-0  relative left-0 w-full  md:relative md:shadow-none pb-10">
              <div className="shadow-md rounded-md p-4 bg-white">
                Sub total:{" "}
                <span className="color-primary font-bold  text-xl">
                  {cart?.formated_sub_total}
                </span>
                <span className="text-sm block">
                  <strong> {cart?.items_count} </strong>
                  {cart?.items_count < 1 ? "produto" : "produtos"}
                </span>
                <div className=" my-2 text-sm text-gray-500"></div>
                <Link passHref href="/checkout/dispatch">
                  <LinkStyled
                    bgColor="light-green"
                    className="flex justify-center font-bold"
                  >
                    Continuar
                  </LinkStyled>
                </Link>
                <div className="mt-2 text-xs text-gray-500">
                  Possui cupom? Você poderá utilizá-lo na etapa de checkout
                </div>
              </div>

              <div className="fixed top-1 right-0 md:relative md:mt-3 rounded-full w-full z-50 md:z-0">
                <ProgressCircleBar
                  progress={progress}
                  text={currentCheckout.text}
                  Icon={currentCheckout.icon}
                  size={screenSize < 768 ? 80 : 130}
                  strokeWidth={5}
                  circleOneStroke="#dee0e2"
                  circleTwoStroke="#40cd28"
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CheckoutLayout;
