import { FC, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import api from "@services/api";
import { Button, LinkStyled } from "@styles/components";
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "react-aria";
import { FocusScope } from "@react-aria/focus";
import BackdropModal from "../BackdropModal";
import { IAddresses } from "src/pages/profile/addresses";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import InputRadio from "@components/UI/InputRadio";
import CheckoutAddressesLoader from "@components/Loaders/CheckoutAddressesLoader";
import Link from "next/link";

const CheckoutAddresses: FC<{ callback: (id: number) => Promise<void> }> = ({
  callback,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [defaultAddress, setDefaultAddress] = useState<IAddresses>();
  const [addresses, setAddresses] = useState<IAddresses[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const closeModal = () => setShow(false);

  const { modalProps } = useModal();
  const { overlayProps } = useOverlay(
    {
      isOpen: show,
      isDismissable: true,
      onClose: () => setShow(false),
    },
    ref
  );

  const { dialogProps } = useDialog({}, ref);

  const handleChangeAddress = async (address: IAddresses) => {
    setDefaultAddress(address);
    await callback(address.id);
  };

  useEffect(() => {
    (async function () {
      setLoading(true);

      try {
        const { data: response } = await api.get<{ data: IAddresses[] }>(
          "/customer/addresses"
        );

        let addresses = response.data;

        if (addresses.length) {
          addresses = addresses.map((address) => {
            const postcode = address.postcode;

            const formattedPostCode =
              postcode.slice(0, 5) + "-" + postcode.slice(5, 8);

            return {
              ...address,
              postcode: postcode.length === 8 ? formattedPostCode : postcode,
            };
          });

          const current = addresses.find(
            (address) => address.default === true && address
          );

          if (current) {
            await callback(current.id);
          }

          setDefaultAddress(current);

          setAddresses(
            addresses.sort((prev, curr) =>
              prev.default_address === curr.default_address ? -1 : 1
            )
          );
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [callback]);

  return (
    <>
      <div className="text-gray-500">
        {!loading && !defaultAddress && (
          <div className="text-center">
            Você não possui nenhum endereço cadastrado <br />
            <br />
            <Link href="/checkout/address" passHref>
              <LinkStyled bgColor="primary" className="mt-14 font-bold">
                {" "}
                Crie um endereço{" "}
              </LinkStyled>
            </Link>
          </div>
        )}

        {loading && <CheckoutAddressesLoader />}

        {!loading && defaultAddress && (
          <>
            <strong> Endereço de entrega </strong>

            <div className="flex items-center justify-between md:justify-start">
              <div className="text-sm">
                {defaultAddress.address}, {defaultAddress.number} <br />
                {defaultAddress.neighborhood} <br />
                {defaultAddress.city} - {defaultAddress.state} <br />
                CEP: {defaultAddress.postcode}
              </div>

              <div className="md:ml-10 text-xs md:text-sm">
                <Button onClick={() => setShow(true)} bgColor="light-green">
                  Alterar endereço
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <Transition show={show}>
        <OverlayContainer>
          <FocusScope contain restoreFocus autoFocus>
            <div className="fixed inset-0  h-full  z-50">
              <div className="absolute inset-0 h-full overflow-hidden flex">
                <BackdropModal onClose={closeModal} />

                <section
                  ref={ref}
                  {...dialogProps}
                  {...overlayProps}
                  {...modalProps}
                  className="inset-y-0 left-0  outline-none relative max-w-3xl m-auto"
                >
                  <Transition.Child
                    enter="transition ease-in-out duration-300 transform"
                    leave="transition ease-in-out duration-100 transform"
                  >
                    <div className="bg-white shadow-md animated fadeIn  overflow-x-hidden rounded p-5  relative mx-4">
                      <Button
                        onClick={closeModal}
                        className="text-black absolute -right-2 top-0"
                      >
                        <CloseOutline width={20} />
                      </Button>

                      <>
                        <div className="text-lg">
                          <strong> Escolha o endereço</strong>
                        </div>

                        <div className="divide-y overflow-y-auto max-h-52 animated fadeIn">
                          {addresses?.map((address) => (
                            <div
                              className="flex items-center "
                              key={address.id}
                            >
                              <InputRadio
                                name={`address`}
                                type="radio"
                                id={`${address.id}address`}
                                defaultChecked={
                                  address.id === defaultAddress.id
                                }
                              />

                              <label
                                className="ml-3 py-3"
                                htmlFor={`${address.id}address`}
                                onClick={() => handleChangeAddress(address)}
                              >
                                <div className="text-black">{address.name}</div>
                                <div className="table table-fixed w-full ">
                                  <div className="truncate table-cell text-gray-500">
                                    {address.address}, {address.number},{" "}
                                    {address.neighborhood}, {address.city} -{" "}
                                    {address.state} CEP: {address.postcode}
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="text-center  mt-4">
                          <Link href="/checkout/address" passHref>
                            <LinkStyled
                              bgColor="white"
                              className="text-primary border-2 text-lg border-primary"
                            >
                              <b> Adicionar outro endereço </b>
                            </LinkStyled>
                          </Link>
                        </div>
                      </>
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

export default CheckoutAddresses;
