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
    images: [
      {
        url: string;
      }
    ];
  };
}

interface ICart {
  sellers: {
    id: number;
    items: Items[];
  }[];
}

const CartBox: FC<Props> = ({ open = false, onClose }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setItemsCart] = useState<Items[]>([]);

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

          const items = Object.entries(cart.sellers)
            .map(([key, value]) => value.items)
            .flat();

          setItemsCart(items);
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
                    <div className="container mx-auto px-4">
                      <CartWrapper>
                        {!isAuthenticated
                          ? "Vc precisa estar autenticado"
                          : cartItems.length && (
                              <div>
                                <div className="flex flex-wrap">
                                  {cartItems.map((item) => (
                                    <div
                                      className="grid mb-2 items-center gap-3 grid-cols-12"
                                      key={item.id}
                                    >
                                      <div className="col-span-4">
                                        <Image
                                          src={item.product.images[0].url}
                                          alt={item.name}
                                          width={100}
                                          height={100}
                                        />
                                      </div>

                                      <div className="col-span-8">
                                        <div className="product-name">
                                          {" "}
                                          {item.name}
                                        </div>

                                        <div className="flex justify-between mt-4">
                                          <div className="col-span-6 text-gray-500">
                                            {" "}
                                            Quantidade:
                                            {item.quantity}
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
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                      </CartWrapper>
                    </div>
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
