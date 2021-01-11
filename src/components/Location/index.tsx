import React, { useState, useRef, FC, useEffect } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Transition } from "@headlessui/react";
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { MapMarkerAlt } from "@styled-icons/fa-solid/MapMarkerAlt";
import { getGeolocation } from "../../lib/geoLocation";
import InputMask from "react-input-mask";

import Logo from "../../assets/images/logo.svg";
// css
import * as S from "./styles";
import { LoadingSpinner } from "../../styles/components";
import notification from "../../utils/notification";
import api from "../../services/api";
import BackdropModal from "../BackdropModal";

interface Props {
  className?: string;
  open?: boolean;
  onClose: () => void;
}

interface LocationProps {
  zipCode: string;
  city: string;
}

type Falsy = false | 0 | "" | null | undefined;

const Location: FC<Props> = ({ open = false, onClose }) => {
  const [location, setLocation] = useState<LocationProps | Falsy>();
  const [postcode, setPostcode] = useState<string>();
  const [loading, setLoading] = useState<Boolean>(false);
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
    setLocation(JSON.parse(localStorage.getItem("location")));
  }, []);

  async function searchCepHandler(e: any) {
    e.preventDefault();
    if (postcode.length < 9) {
      return;
    }

    const data = {
      zipcode: postcode.replace("-", ""),
    };

    setLoading(true);

    try {
      const { data: response } = await api.post("/search-cep", data);

      if (response.message) {
        return notification("Cep não encontrado", "error");
      }

      localStorage.setItem("location", JSON.stringify(response.data));

      setLocation(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleGeoLocation() {
    await getGeolocation(setLocation, setLoading);
  }

  function removeLocationHandler() {
    setLocation(false);

    localStorage.removeItem("location");
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
                className="h-fit  inset-y-0 right-0  justify-center flex   outline-none"
              >
                <Transition.Child
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-y-32"
                  enterTo="translate-y-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-y-0"
                  leaveTo="-translate-y-64"
                >
                  <S.LocationWrapper>
                    <S.Close type="button" onClick={onClose}>
                      <CloseOutline />
                    </S.Close>
                    <div>
                      {loading ? (
                        <LoadingSpinner size={40} barSize={5} />
                      ) : location ? (
                        <>
                          <div className="mb-2">
                            {" "}
                            <strong>Calculando frete para:</strong>
                          </div>
                          <p>{location.city}</p>

                          <p className="my-2">CEP: {location.zipCode}</p>

                          <S.redButton
                            type="button"
                            onClick={() => removeLocationHandler()}
                          >
                            <S.iconMap className="white" /> remover endereço
                          </S.redButton>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleGeoLocation()}
                          >
                            <MapMarkerAlt /> usar minha localização atual
                          </button>

                          <div className="mt-4">ou digite seu CEP abaixo</div>

                          <S.CepLocation>
                            <InputMask
                              type="text"
                              mask="99999-999"
                              placeholder="00000-000"
                              inputMode="numeric"
                              onChange={(e) => setPostcode(e.target.value)}
                            />
                            <button
                              onClick={(e) => searchCepHandler(e)}
                              type="submit"
                            >
                              <S.iconGo />
                            </button>
                          </S.CepLocation>
                        </>
                      )}
                    </div>
                  </S.LocationWrapper>
                </Transition.Child>
              </section>
            </div>
          </div>
        </FocusScope>
      </OverlayContainer>
    </Transition>
  );
};

export default Location;
