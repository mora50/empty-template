import { yupResolver } from "@hookform/resolvers/yup";
import api from "@services/api";
import { Alert, Button, FormStyled, LoadingSpinner } from "@styles/components";
import normalizeChar from "@utils/normalizeChar";
import stateOptions from "@utils/states";
import { ValidationFormAddress } from "@utils/YupValidations";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Layout from "@components/Layout";
import SideBarProfile from "@components/SideBarProfile";

import Input from "@components/Input";
import Select from "react-select";
import Switch from "@components/UI/Switch";
import notification from "@utils/notification";
import { useRouter } from "next/router";

interface ICreateAddress {
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

  const {
    register,
    control,
    errors,
    handleSubmit,
  } = useForm(/* {
    resolver: yupResolver(ValidationFormAddress),
  } */);

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
      <FormStyled disabled={loading} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          <div>
            Apelido do endereço (ex: Minha casa) <span> *</span>
          </div>
        </label>
        <input
          id="name"
          placeholder="Digite o apelido do endereço"
          name="name"
          type="text"
          ref={register}
        />

        {errors.name && <Alert>{errors.name.message}</Alert>}

        <label htmlFor="postcode">
          <div>
            CEP para envio<span>*</span>
          </div>
        </label>

        <Input
          name="postcode"
          mask="99999-999"
          type="text"
          ref={register}
          inputMode="numeric"
          id="postcode"
          placeholder="Digite o CEP"
        />

        {errors.postcode && <Alert>{errors.postcode.message}</Alert>}

        <label htmlFor="address">
          <div>
            Logadouro<span>*</span>
          </div>
        </label>

        <input
          name="address"
          id="address"
          placeholder="Rua, Avenida, etc..."
          type="text"
          ref={register}
        />

        {errors.address && <Alert>{errors.address.message}</Alert>}

        <label htmlFor="city">
          <div>
            Cidade<span>*</span>
          </div>
        </label>

        <input
          name="city"
          id="city"
          placeholder="Digite o nome de sua cidade"
          type="text"
          ref={register}
        />

        {errors.city && <Alert>{errors.city.message}</Alert>}

        <div className="no-shadow my-2">
          <label htmlFor="">
            <div>
              Estado <span> *</span>
            </div>
          </label>
          <Controller
            as={<Select />}
            options={stateOptions}
            name="state"
            isClearable
            placeholder={"Selecione seu estado"}
            control={control}
          />
        </div>

        {errors.state && <Alert>{errors.state.message}</Alert>}

        <label htmlFor="neighborhood">
          <div>
            Bairro<span>*</span>
          </div>
        </label>
        <input
          name="neighborhood"
          id="neighborhood"
          placeholder="Bairro"
          type="text"
          ref={register}
        />

        {errors.neighborhood && <Alert>{errors.neighborhood.message}</Alert>}

        <div className="grid gap-4 grid-cols-12 align-center">
          <div className="col-span-6">
            <label htmlFor="number">
              <div>
                Número<span>*</span>
              </div>
            </label>
            <input
              type="number"
              name="number"
              id="number"
              inputMode="numeric"
              placeholder="Digite o número"
              ref={register}
            />

            {errors.number && <Alert>{errors.number.message}</Alert>}
          </div>

          <div className="col-span-6 pt-6">
            <Switch
              name="default_address"
              labelText="Endereço padrão?"
              ref={register}
            />
          </div>
        </div>

        <label htmlFor="complement">
          <div>Complemento</div>
        </label>
        <input
          name="complement"
          id="complement"
          placeholder="Ap, bloco, casa etc..."
          type="text"
          ref={register}
        />

        <label htmlFor="phone">
          <div>
            Número de telefone<span>*</span>
          </div>
        </label>

        <Input
          mask={["(99) 9999-9999", "(99) 99999-9999"]}
          type="text"
          name="phone"
          id="phone"
          ref={register}
          inputMode="numeric"
          placeholder="(19) 9999-9999"
        />

        {errors.phone && <Alert>{errors.phone.message}</Alert>}
        <div className="text-center">
          <Button
            bgColor="primary"
            className="py-2 px-4 mt-5 mx-auto text-lg"
            type="submit"
          >
            {loading ? <LoadingSpinner size={15} barSize={3} /> : <>criar</>}
          </Button>
        </div>
      </FormStyled>
    </div>
  );
}

export default CreateAddress;

CreateAddress.Layout = Layout;

CreateAddress.SideBarProfile = SideBarProfile;
