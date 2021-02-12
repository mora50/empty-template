import { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import api from "@services/api";
import { Button, Container } from "@styles/components";
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "react-aria";
import { FocusScope } from "@react-aria/focus";
import BackdropModal from "../BackdropModal";
import { IAddresses } from "src/pages/profile/addresses";
import AddressForm from "@components/AddressForm";

// import { Container } from './styles';

const CheckoutAddresses: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultAddress, setDefaultAddress] = useState<IAddresses>();
  const [addresses, setAddresses] = useState<IAddresses[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

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

          setDefaultAddress(current);

          setAddresses(addresses);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="text-gray-500">
        <strong> Endereço de entrega </strong>

        {loading ? (
          "Carregando" /**TODO: Skeleton effect  */
        ) : (
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
        )}
      </div>

      <Transition show={show}>
        <OverlayContainer>
          <FocusScope contain restoreFocus autoFocus>
            <div className="fixed inset-0 overflow-hidden h-full z-50">
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                <BackdropModal onClose={closeModal} />

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
                    <div className="max-w-3xl">
                      <div className="bg-white shadow-md rounded p-5">
                        {showAddressForm && <AddressForm />}

                        {!showAddressForm && (
                          <>
                            <div className="text-lg">
                              <strong> Escolha o endereço</strong>
                            </div>

                            <div className="divide-y">
                              {addresses.map((address) => (
                                <div
                                  className="flex items-center "
                                  key={address.id}
                                >
                                  <input
                                    type="radio"
                                    name={`address`}
                                    id={`${address.id}address`}
                                    defaultChecked={
                                      address.id === defaultAddress.id
                                    }
                                  />

                                  <label
                                    className="ml-3 py-3"
                                    htmlFor={`${address.id}address`}
                                  >
                                    <div className="text-black">
                                      {address.name}
                                    </div>
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
                            <div className="text-center">
                              <Button
                                bgColor="white"
                                className="text-primary border-2 mt-3 border-primary"
                                onClick={() => setShowAddressForm(true)}
                              >
                                <b> Adicionar outro endereço </b>
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
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
