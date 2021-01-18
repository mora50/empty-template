import { Transition } from "@headlessui/react";
import { FC, useRef } from "react";
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "react-aria";
import Link from "next/link";
import { FocusScope } from "@react-aria/focus";
import BackdropModal from "../BackdropModal";
import { FacebookSquare } from "@styled-icons/boxicons-logos/FacebookSquare";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

// css
import * as S from "./styles";
import { useUI } from "../../contexts/modalsContext";

interface Props {
  open?: boolean;
  onClose: () => void;
}

const UserDropDown: FC<Props> = ({ open = false, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { displayDropDownUser } = useUI();

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

  async function logoutModal() {
    /*     history.push("/");
    await Logout(); */
  }

  return (
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
                className="inset-y-0 left-0  outline-none"
              >
                <Transition.Child
                  enter="transition ease-in-out duration-300 transform"
                  leave="transition ease-in-out duration-100 transform"
                >
                  <div className="container mx-auto px-4">
                    <S.DropDownAccess>
                      <S.CartHeaderWrapper>
                        <button onClick={onClose}>
                          <CloseOutline className="close" />
                        </button>
                        {displayDropDownUser === "LOGIN_VIEW" && (
                          <div className="px-4 py-4 mt-4">
                            <div className="login-btn">
                              <div onClick={onClose}>
                                <Link href="/login">
                                  <a className="btn-login">Entrar</a>
                                </Link>
                              </div>

                              <div className="my-2 flex items-center font-weight-bold">
                                <span className="w-20">
                                  <hr />
                                </span>
                                <div className="mx-2">ou</div>
                                <span className="w-20">
                                  <hr />
                                </span>
                              </div>
                              <button className="btn-facebook">
                                <FacebookSquare />
                                Entrar com facebook
                              </button>
                            </div>

                            <div className="mt-4 text-center new-customer">
                              <span className="color-grey">
                                {" "}
                                Cliente novo?{" "}
                              </span>
                              <strong> cadastrar</strong>
                            </div>
                          </div>
                        )}

                        {displayDropDownUser === "LOGGED_VIEW" && (
                          <div>
                            <div className="welcome">
                              Olá, <strong> César</strong>
                            </div>

                            <ul className="mt-13 ">
                              <li>
                                <a href="">Minha conta</a>
                              </li>
                              <li>
                                <a href="/my-account/orders">meus pedidos</a>
                              </li>
                              <li>
                                <a href="/">preciso de ajuda</a>
                              </li>
                              <li>
                                <button
                                  className="text-left"
                                  onClick={() => logoutModal()}
                                >
                                  Sair
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </S.CartHeaderWrapper>
                    </S.DropDownAccess>
                  </div>
                </Transition.Child>
              </section>
            </div>
          </div>
        </FocusScope>
      </OverlayContainer>
    </Transition>
  );
};

export default UserDropDown;
