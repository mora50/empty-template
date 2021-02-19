import ProgressCircleBar from "@components/UI/ProgressCircleBar";
import { Container, LinkStyled, LoadingSpinner } from "@styles/components";
import { useEffect, useState, memo } from "react";
import { useCart } from "src/contexts/cartContext";
import { Cart } from "@styled-icons/boxicons-regular/Cart";
import { Truck } from "@styled-icons/bootstrap/Truck";

import { Payment } from "@styled-icons/material/Payment";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingAllScreen from "@components/LoadingAllScreen";
import cn from "classnames";

interface Isteps {
  text: string;
  icon?: any;
  link: string;
}

const steps: Isteps[] = [
  {
    text: "Carrinho",
    icon: Cart,
    link: "/checkout/cart",
  },

  {
    text: "Entrega",
    icon: Truck,
    link: "/checkout/dispatch",
  },

  {
    text: "Pagamento",
    icon: Payment,
    link: "/checkout/payment",
  },
];

const subPage = "/checkout/";

const navs = {
  [`${subPage}cart`]: "dispatch",

  [`${subPage}dispatch`]: "payment",
};

const CheckoutLayout: React.FC = ({ children }) => {
  const [screenSize, setScreenSize] = useState<number>();
  const { cart, loading, handleCart } = useCart();

  const router = useRouter();

  const isAddressPage = router.pathname === "/checkout/address";

  useEffect(() => {
    if (window) {
      setScreenSize(window.screen.width);
    }
  }, []);

  useEffect(() => {
    handleCart();
  }, [handleCart]);

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="bg-primary  text-white text-xl font-bold py-2 mb-10 fixed  w-full z-10">
        <Container>
          <Link href="/">
            <a> Logo</a>
          </Link>
        </Container>
      </div>

      <Container className="pt-16 md:pt-20 pb-10">
        {loading && <LoadingAllScreen />}

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
          <div
            className={cn("animated", {
              fadeIn: cart,
              "opacity-0": !cart,
            })}
          >
            {!isAddressPage && cart && (
              <div className="mb-5 flex justify-between relative items-center">
                <span className="absolute border-b border-gray-300 w-full" />
                {steps.map((step, index) => (
                  <div key={index}>
                    <Link href={step.link}>
                      <a>
                        <ProgressCircleBar
                          progress={step.link === router.pathname && 100}
                          text={step?.text}
                          Icon={step?.icon}
                          size={screenSize < 768 ? 85 : 100}
                          strokeWidth={5}
                          circleOneStroke="#dee0e2"
                          circleTwoStroke="#40cd28"
                        />
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-12 gap-x-5 ">
              <div
                className={cn(
                  " h-fit  col-span-full shadow-md rounded-md bg-white p-4",
                  {
                    "lg:col-span-9 md:col-span-8 order-last md:order-first": !isAddressPage,
                    "mx-auto": isAddressPage,
                  }
                )}
              >
                {cart && children}
              </div>

              {!isAddressPage && (
                <div className="lg:col-span-3 md:col-span-4 md:mt-0 col-span-full bottom-0  relative left-0 w-full  md:shadow-none pb-5">
                  <div className="shadow-md rounded-md p-4 bg-white">
                    <span className="text-sm block mb-2 text-gray-500">
                      {cart?.formated_shipping_total && (
                        <>
                          Envio:
                          <strong>{cart?.formated_shipping_total}</strong>
                          <br />
                        </>
                      )}
                      {cart?.items_count < 1 ? "produto" : "produtos"}:{" "}
                      <strong> {cart?.items_count} </strong>
                    </span>
                    <div>
                      <div className="py-1">
                        <hr />
                      </div>
                      {cart?.formated_grand_total ? "Total" : "Subtotal"}:{" "}
                      <span className="text-primary font-bold  text-xl">
                        {cart?.formated_grand_total ?? cart?.formated_sub_total}
                      </span>
                    </div>

                    {router.pathname !== "/checkout/payment" && (
                      <Link passHref href={navs[router.pathname]}>
                        <LinkStyled
                          bgColor="light-green"
                          className="flex mt-3 justify-center font-bold"
                        >
                          Continuar
                        </LinkStyled>
                      </Link>
                    )}

                    <div className="mt-2 text-xs text-gray-500">
                      Possui cupom? Você poderá utilizá-lo na etapa de checkout
                    </div>
                  </div>
                  <div className="fixed  z-50 top-1 right-0 md:relative md:mt-3 rounded-full w-full  md:z-0">
                    {/*  <ProgressCircleBar
                      progress={currentCheckout?.progress}
                      text={currentCheckout?.text}
                      Icon={currentCheckout?.icon}
                      size={screenSize < 768 ? 80 : 130}
                      strokeWidth={5}
                      circleOneStroke="#dee0e2"
                      circleTwoStroke="#40cd28"
                    /> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default memo(CheckoutLayout);
