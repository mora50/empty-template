import CheckoutLayout from "@components/CheckoutLayout";
import CreditCardForm from "@components/CreditCardForm";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@services/api";
import { Button, FormStyled, LoadingSpinner } from "@styles/components";
import notification from "@utils/notification";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { creditCardSchema } from "@utils/YupValidations";
import { useCart } from "src/contexts/cartContext";
import { Payment as Card } from "@styled-icons/material/Payment";
import { Barcode } from "@styled-icons/boxicons-regular/Barcode";
import { Printer } from "@styled-icons/boxicons-regular/Printer";
import { useOverlay, useModal, OverlayContainer } from "@react-aria/overlays";
import { useDialog } from "react-aria";
import { FocusScope } from "@react-aria/focus";
import { PhoneIphone } from "@styled-icons/material-twotone/PhoneIphone";
import { DateRange } from "@styled-icons/material/DateRange";
import { ArrowIosDownwardOutline } from "@styled-icons/evaicons-outline/ArrowIosDownwardOutline";
import cn from "classnames";
import { useRouter } from "next/router";
import { ICreditCard } from "../profile/cards/create";
import currencyFormat from "@utils/currencyFormat";
import { PortionButton } from "@styles/pages/payment";
import BackdropModal from "@components/BackdropModal";
import { Transition } from "@headlessui/react";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import InputRadio from "@components/UI/InputRadio";
import normalizeChar from "@utils/normalizeChar";

interface IPayment {
  method: string;
  form_payment: number;
  portion: number;
  card?: ICreditCard;
}

interface IPortions {
  number: number;
  value: string;
}

export default function Payment() {
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedPortion, setSelectedPortion] = useState<IPortions>();
  const [show, setShow] = useState<boolean>(false);
  const [paymentPortions, setPaymentPortions] = useState<IPortions[]>([]);
  const [payment, setPayment] = useState<IPayment>();
  const { cart } = useCart();
  const methods = useForm({ resolver: yupResolver(creditCardSchema) });

  const router = useRouter();

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

  const savePayment = async (payment: IPayment) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    /*  try {
      const { data: response } = await api.post(
        "/customer/checkout/save-payment",
        payment
      );
    } catch (err) {
      err.response && notification(err.response.data.message, "error");
    } finally {
      setLoading(false);
    } */
  };

  const payWithBillet = async () => {
    await savePayment({
      method: "pagarme",
      form_payment: 1,
      portion: 1,
    });
  };

  const payWithCard = async (data: ICreditCard) => {
    data.date_expiration = data.date_expiration.replace("/", "");
    data.number = normalizeChar(data.number);

    if (!selectedPortion) {
      return;
    }

    await savePayment({
      method: "pagarme",
      form_payment: 2,
      portion: selectedPortion.number,
      card: data,
    });
  };

  useEffect(() => {
    if (cart) {
      (async function () {
        try {
          const { data: response } = await api.get(
            "/customer/checkout/calcule-payment"
          );

          const portions = Object.values(response.pagarme["2"]?.value).map(
            (portion: number, index) => ({
              number: index + 1,
              value: currencyFormat(portion),
            })
          );

          setSelectedPortion(portions[0]);
          setPaymentPortions(portions);
        } finally {
          /*   setPaymentLoading(false); */
        }
      })();
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      if (!cart.shipping_address) {
        router.push("/checkout/dispatch");
        notification("Selecione um frete", "info");
      }
    }
  }, [cart, router]);

  return (
    <>
      <div
        className={cn("max-w-md  mx-auto", { "pointer-events-none": loading })}
      >
        <div className="mb-4 font-bold text-gray-500">Formas de pagamento</div>
        <nav className="grid-cols-2 grid text-lg text-center mb-5">
          <button
            onClick={() => setPaymentMethod("card")}
            className={cn(
              "hover:text-primary  col-span-1 justify-center items-center flex border-b-4 font-bold   ",
              { "text-primary border-blue-700": paymentMethod === "card" }
            )}
          >
            Cartão <Card width={25} className="ml-2" />
          </button>

          <button
            onClick={() => setPaymentMethod("billet")}
            className={cn(
              "hover:text-primary  col-span-1 justify-center items-center flex border-b-4 font-bold   ",
              { "text-primary border-blue-700": paymentMethod === "billet" }
            )}
          >
            Boleto <Barcode width={20} />
          </button>
        </nav>

        {paymentMethod === "billet" && (
          <div className="animated fadeIn">
            <ul className="mb-3 space-y-4 ">
              <li>
                <Printer
                  width={40}
                  className="bg-gray-500 rounded-full text-white p-2"
                />{" "}
                <span className="ml-2">Imprima o boleto e pague no banco</span>
              </li>
              <li className="flex items-center ">
                <div className="bg-gray-500 mr-3 rounded-full text-white p-2">
                  <PhoneIphone width={24} />
                </div>
                ou pague pela internet utilizando o código de barras do boleto
              </li>
              <li className="flex items-center ">
                <DateRange
                  className="bg-gray-500 rounded-full mr-3 text-white p-2"
                  width={40}
                />{" "}
                o prazo de validade do boleto é de 1 dia util
              </li>
            </ul>

            <div className="my-4 text-lg flex justify-between font-bold">
              Total: <span> {cart.formated_grand_total} </span>
            </div>

            <Button
              bgColor="primary"
              className="py-2 px-7 flex justify-center w-full "
              type="submit"
              minHeight={50}
              onClick={payWithBillet}
            >
              {loading ? (
                <LoadingSpinner color="primary" size={30} barSize={3} />
              ) : (
                <span className="text-lg">
                  <strong> Fechar pedido </strong>
                </span>
              )}
            </Button>
          </div>
        )}
      </div>

      {paymentMethod === "card" && (
        <div className="mx-auto max-w-md">
          <FormProvider {...methods}>
            <FormStyled
              disabled={loading}
              onSubmit={methods.handleSubmit(payWithCard)}
              className=" animated fadeIn"
            >
              <CreditCardForm />

              <div className="mt-4 text-sm mb-3">Número de parcelas</div>

              <PortionButton type="button" onClick={() => setShow(true)}>
                {!selectedPortion
                  ? "Selecione o número de parcelas"
                  : `${selectedPortion.number}x ${selectedPortion.value}`}

                <ArrowIosDownwardOutline />
              </PortionButton>

              <div className="my-4 text-lg flex justify-between font-bold">
                Total: <span> {cart.formated_grand_total} </span>
              </div>
              <div className="text-center">
                <Button
                  bgColor="primary"
                  className="py-2 px-7 flex justify-center w-full "
                  type="submit"
                  minHeight={50}
                >
                  {loading ? (
                    <LoadingSpinner color="primary" size={15} barSize={3} />
                  ) : (
                    <span className="text-lg">
                      <strong> Fechar pedido </strong>
                    </span>
                  )}
                </Button>
              </div>
            </FormStyled>
          </FormProvider>
        </div>
      )}

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
                    <div className="bg-white w-80  shadow-md animated fadeIn  overflow-x-hidden rounded p-5  relative mx-4">
                      <Button
                        onClick={closeModal}
                        className="text-black absolute -right-1 top-0"
                      >
                        <CloseOutline width={20} />
                      </Button>

                      <div className="text-xl">
                        <strong>Número de parcelas</strong>
                      </div>

                      <div className="divide-y overflow-y-auto h-96">
                        {paymentPortions?.map((portion) => (
                          <div
                            className="flex items-center px-2 cursor-pointer hover:bg-gray-200"
                            key={portion.number}
                            onClick={closeModal}
                          >
                            <InputRadio
                              name={`portion`}
                              type="radio"
                              id={`${portion.number}portion`}
                              onClick={() => setSelectedPortion(portion)}
                              defaultChecked={
                                portion.number === selectedPortion?.number
                              }
                            />

                            <label
                              className="ml-3 py-3 w-full"
                              htmlFor={`${portion.number}portion`}
                            >
                              {portion.number}x de {portion.value}{" "}
                            </label>
                          </div>
                        ))}
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
}

Payment.CheckoutLayout = CheckoutLayout;
