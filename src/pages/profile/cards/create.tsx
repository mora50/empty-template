import CreditCardForm from "@components/CreditCardForm";
import Layout from "@components/Layout";
import LoadingAllScreen from "@components/LoadingAllScreen";
import SideBarProfile from "@components/SideBarProfile";
import api from "@services/api";
import { FormStyled } from "@styles/components";
import normalizeChar from "@utils/normalizeChar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ICreditCard {
  cvc?: string;
  expiry?: string;
  name?: string;
  number?: string;
  date_expiration: string;
}

export default function CreateCard() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const methods = useForm(/* {
    resolver: yupResolver(creditCardSchema),
  } */);

  const saveCard = async (data: ICreditCard) => {
    data.date_expiration = data.date_expiration.replace("/", "");
    data.number = normalizeChar(data.number);

    setLoading(true);
    try {
      await api.post("/customer/cards/create", data);

      router.push("/profile/cards/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingAllScreen />}

      <FormProvider {...methods}>
        <FormStyled onSubmit={methods.handleSubmit(saveCard)}>
          <CreditCardForm />
        </FormStyled>
      </FormProvider>
    </>
  );
}

CreateCard.Layout = Layout;

CreateCard.SideBarProfile = SideBarProfile;
