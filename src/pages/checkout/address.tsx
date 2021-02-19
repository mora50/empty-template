import AddressForm from "@components/AddressForm";
import CheckoutLayout from "@components/CheckoutLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@services/api";
import { FormStyled, LoadingSpinner, Button } from "@styles/components";
import normalizeChar from "@utils/normalizeChar";
import { ValidationFormAddress } from "@utils/YupValidations";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ICreateAddress } from "src/pages/profile/addresses/create";

export default function Address() {
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm({ resolver: yupResolver(ValidationFormAddress) });

  const createAddress = async (data: ICreateAddress) => {
    data.phone = "+55" + normalizeChar(data.phone);

    data.postcode = normalizeChar(data.postcode);

    const { value }: any = data.state;

    data.state = value;

    data.country = "BR";

    setLoading(true);

    try {
      api.post("/customer/addresses/create", data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <div className="text-center relative text-lg">
          <div className="absolute text-sm -top-1 left-0 underline">
            <Link href="/checkout/dispatch" passHref>
              <a>voltar</a>
            </Link>
          </div>

          <div className="flex-grow pt-3">
            <strong> Digite seu endereço </strong>
          </div>
        </div>

        <FormStyled
          disabled={loading}
          onSubmit={methods.handleSubmit(createAddress)}
          className="mx-auto pt- animated fadeIn"
        >
          <AddressForm />

          <div className="text-center">
            <Button
              bgColor="primary"
              className="py-2 px-4 mt-5 mx-auto"
              type="submit"
              minHeight={40}
            >
              {loading ? (
                <LoadingSpinner color="primary" size={15} barSize={3} />
              ) : (
                "Entregar nesse endereço"
              )}
            </Button>
          </div>
        </FormStyled>
      </FormProvider>
    </>
  );
}

Address.CheckoutLayout = CheckoutLayout;
