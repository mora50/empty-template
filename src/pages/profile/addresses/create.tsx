import { yupResolver } from "@hookform/resolvers/yup";
import api from "@services/api";
import { Button, FormStyled, LoadingSpinner } from "@styles/components";
import normalizeChar from "@utils/normalizeChar";
import { ValidationFormAddress } from "@utils/YupValidations";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Layout from "@components/Layout";
import SideBarProfile from "@components/SideBarProfile";

import notification from "@utils/notification";
import { useRouter } from "next/router";
import AddressForm from "@components/AddressForm";

export interface ICreateAddress {
  address: string;
  city: string;
  complement: string;
  country: string;
  country_name: string;
  default: boolean;
  id: number;
  name: string;
  neighborhood: string;
  number: number;
  phone: string;
  postcode: string;
  country_code: string;
  state: string;
  default_address?: boolean;
}

function CreateAddress() {
  const [loading, setLoading] = useState<boolean>();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(ValidationFormAddress),
  });

  const onSubmit = async (data: ICreateAddress) => {
    setLoading(true);

    data.phone = "+55" + normalizeChar(data.phone);

    data.postcode = normalizeChar(data.postcode);

    const { value }: any = data.state;

    data.state = value;

    data.country = "BR";

    try {
      api.post("/customer/addresses/create", data);
      router.push("/profile/addresses");
      notification("Endereço criado com sucesso", "success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-3/6 m-auto">
      <FormProvider {...methods}>
        <FormStyled
          disabled={loading}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <AddressForm />
          <div className="text-center">
            <Button
              bgColor="primary"
              className="py-2 px-4 mt-5 mx-auto text-lg"
              type="submit"
            >
              {loading ? (
                <LoadingSpinner color="primary" size={15} barSize={3} />
              ) : (
                <>Salvar endereço</>
              )}
            </Button>
          </div>
        </FormStyled>
      </FormProvider>
    </div>
  );
}

export default CreateAddress;

CreateAddress.Layout = Layout;

CreateAddress.SideBarProfile = SideBarProfile;
