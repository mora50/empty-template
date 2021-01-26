import { useAuth } from "src/contexts/authContext";

import { Transition } from "@headlessui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "react-aria";
import Link from "next/link";
import Image from "next/image";
import { FocusScope } from "@react-aria/focus";
import BackdropModal from "../BackdropModal";
import { useUI } from "src/contexts/modalsContext";
import { CartWrapper } from "./style";
import api from "@services/api";

import { ShoppingCartOutline } from "@styled-icons/evaicons-outline/ShoppingCartOutline";
import { Container, LinkStyled } from "@styles/components";

interface Props {
  open?: boolean;
  onClose: () => void;
}

interface Items {
  name: string;
  formated_price: string;
  id: number;
  quantity: number;
  product: {
    url_key: string;
    images: [
      {
        url: string;
      }
    ];
  };
}

interface ICart {
  items: Items[];
  formated_sub_total?: string;
  sellers?: {
    id: number;
    items: Items[];
  }[];
}

const CartBox: FC<Props> = ({ open = false, onClose }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<ICart>({ items: [] });

  const ref = useRef<HTMLDivElement>(null);

  const { modalProps } = useModal();
  const { overlayProps } = useOverlay(
    {
      isOpen: open,
      isDismissable: true,
      onClose: onClose,
    },
    ref
  );

  const { dialogProps } = useDialog({}, ref);

  useEffect(() => {
    if (isAuthenticated) {
      (async function () {
        setLoading(true);

        try {
          const response = await api.get("/customer/checkout/cart");

          let cart: ICart = response.data.data;

          if (cart) {
            const items = Object.entries(cart.sellers)
              .map(([key, value]) => value.items)
              .flat();

            cart.items = items;

            setCart(cart);
          }
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Transition show={open}>
        <OverlayContainer>
          <FocusScope contain restoreFocus autoFocus>
            <div className="fixed inset-0 overflow-hidden h-full z-50">
              <div className="absolute inset-0 overflow-hidden">
                <BackdropModal onClose={onClose} />

                <section
                  ref={ref}
                  {...dialogProps}
                  {...overlayProps}
                  {...modalProps}
                  className="inset-y-0 left-0  outline-none relative"
                >
                  <Transition.Child
                    enter="transition ease-in-out duration-300 transform"
                    leave="transition ease-in-out duration-100 transform"
                  >
                    <Container>
                      <CartWrapper className={!isAuthenticated && "p-4"}>
                        {!isAuthenticated ? (
                          <div className="text-center font-bold py-5 flex justify-center items-center">
                            <ShoppingCartOutline width={30} />
                            <div className="ml-2">
                              Faça login para ver o carrinho
                            </div>
                          </div>
                        ) : !cart.items.length ? (
                          <div className="text-center flex py-5 justify-center items-center">
                            <ShoppingCartOutline width={30} />
                            <div className="ml-1">Seu carrinho está vazio</div>
                          </div>
                        ) : (
                          <div>
                            <div className="px-4 pt-3 pb-2">
                              <div className=" flex items-center text-md pb-1 ">
                                Meu carrinho <ShoppingCartOutline width={20} />
                              </div>
                              <ul
                                className={`box divide-y flex flex-wrap ${
                                  cart.items.length < 4 && "pr-0"
                                }`}
                              >
                                {cart.items.map((item) => (
                                  <li key={item.id}>
                                    <Link
                                      href={`/product/${item.product.url_key}`}
                                    >
                                      <a
                                        className="grid pt-2 pb-1  items-center gap-3 grid-cols-12 "
                                        onClick={onClose}
                                      >
                                        <div className="col-span-3 flex">
                                          <Image
                                            src={item.product.images[0].url}
                                            alt={item.name}
                                            width={100}
                                            height={100}
                                          />
                                        </div>

                                        <div className="col-span-9">
                                          <div className="product-name">
                                            {" "}
                                            {item.name}
                                          </div>

                                          <div className="flex justify-between mt-1 text-sm">
                                            <div className="col-span-6 text-xs text-gray-500">
                                              {" "}
                                              Quantidade: {item.quantity}
                                            </div>

                                            <div className="col-span-6">
                                              {item.formated_price}
                                            </div>
                                          </div>
                                        </div>
                                        {/* <div className="grid grid-cols-12 gap-3 justify-between">
                                    <div className="col-span-ful">
                                      {item.name}
                                    </div>

                                
                                  </div> */}
                                      </a>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-gray-200 text-right pt-2 px-4 rounded-b-xl  pb-4 border-t border-gray-300">
                              <div className=" mb-4">
                                <span className="text-gray-500">
                                  {" "}
                                  Total sem frete:
                                </span>{" "}
                                <b> {cart.formated_sub_total} </b>
                              </div>
                              <div>
                                <Link prefetch passHref href="/cart">
                                  <LinkStyled bgColor="light-green">
                                    Ver carrinho
                                  </LinkStyled>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </CartWrapper>
                    </Container>
                  </Transition.Child>
                </section>
              </div>
            </div>
          </FocusScope>
        </OverlayContainer>
      </Transition>
    </>
  );
};

export default CartBox;
