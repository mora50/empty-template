import { Transition } from "@headlessui/react";
import { FC, useRef } from "react";
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "react-aria";

import { FocusScope } from "@react-aria/focus";
import { Container } from "../../styles/components";
import BackdropModal from "../BackdropModal";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

// css
import * as S from "./style";

interface Props {
  open?: boolean;
  onClose: () => void;
}

const SideBar: FC<Props> = ({ open = false, onClose }) => {
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
                  enterFrom="fade-in"
                  enterTo="-translate-x-0"
                  leave="transition ease-in-out duration-100 transform"
                  leaveFrom="fade-out"
                  leaveTo="fade-out"
                >
                  <div className="container mx-auto">
                    <S.menuWrapper>
                      <h3> Itens do Menu</h3>
                      <S.Close onClick={onClose}>
                        <CloseOutline />
                      </S.Close>
                      <ul>
                        <li>
                          <a
                            href="#/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Primeiro item
                            <S.iconRight />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Segundo Item
                            <S.iconRight />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terceiro Item
                            <S.iconRight />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Quarto Item
                            <S.iconRight />
                          </a>
                        </li>
                      </ul>
                    </S.menuWrapper>
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

export default SideBar;
