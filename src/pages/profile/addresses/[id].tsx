import { yupResolver } from "@hookform/resolvers/yup";
import api from "@services/api";
import {
  Alert,
  Button,
  FormStyled,
  Input,
  LoadingSpinner,
} from "@styles/components";
import normalizeChar from "@utils/normalizeChar";
import stateOptions from "@utils/states";
import { ValidationFormAddress } from "@utils/YupValidations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Layout from "@components/Layout";
import SideBarProfile from "@components/SideBarProfile";
import getAddress from "@lib/getAddress";
import InputMask from "@components/InputMask";
import Select from "react-select";
import Switch from "@components/UI/Switch";
import notification from "@utils/notification";

interface IAddress {
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

function Address() {
  const [loading, setLoading] = useState<boolean>();
  const [inputData, setInputData] = useState<IAddress>();
  const { register, control, setValue, errors, handleSubmit } = useForm({
    resolver: yupResolver(ValidationFormAddress),
  });

  const router = useRouter();

  const id = router.query.id as string;

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async function () {
        const response = await getAddress(id);

        if (response) {
          setValue(
            "state",
            stateOptions.find((option) => option.value === response.state)
          );
        }

        setInputData(response);

        setLoading(false);
      })();
    }
  }, [id]);

  const onSubmit = async (data: IAddress) => {
    setLoading(true);

    data.phone = "+55" + normalizeChar(data.phone);

    data.postcode = normalizeChar(data.postcode);

    const { value }: any = data.state;

    data.state = value;

    data.country = "BR";

    try {
      api.put(`/customer/addresses/${id}`, data);
      notification("Endereço atualizado com sucesso", "success");
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
        <Input
          id="name"
          placeholder="Digite o apelido do endereço"
          name="name"
          type="text"
          defaultValue={inputData?.name}
          ref={register}
          error={errors.name}
        />

        {errors.name && <Alert>{errors.name.message}</Alert>}

        <label htmlFor="postcode">
          <div>
            CEP para envio<span>*</span>
          </div>
        </label>

        <InputMask
          name="postcode"
          mask="99999-999"
          type="text"
          defaultValue={inputData?.postcode}
          ref={register}
          inputMode="numeric"
          id="postcode"
          placeholder="Digite o CEP"
          error={errors.postcode}
        />

        {errors.postcode && <Alert>{errors.postcode.message}</Alert>}

        <label htmlFor="address">
          <div>
            Logadouro<span>*</span>
          </div>
        </label>

        <Input
          name="address"
          id="address"
          placeholder="Rua, Avenida, etc..."
          type="text"
          defaultValue={inputData?.address}
          ref={register}
          error={errors.address}
        />

        {errors.address && <Alert>{errors.address.message}</Alert>}

        <label htmlFor="city">
          <div>
            Cidade<span>*</span>
          </div>
        </label>

        <Input
          name="city"
          id="city"
          placeholder="Digite o nome de sua cidade"
          type="text"
          defaultValue={inputData?.city}
          ref={register}
          error={errors.city}
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
        <Input
          name="neighborhood"
          id="neighborhood"
          placeholder="Bairro"
          type="text"
          defaultValue={inputData?.neighborhood}
          ref={register}
          error={errors.neighborhood}
        />

        {errors.neighborhood && <Alert>{errors.neighborhood.message}</Alert>}

        <div className="grid gap-4 grid-cols-12 align-center">
          <div className="col-span-6">
            <label htmlFor="number">
              <div>
                Número<span>*</span>
              </div>
            </label>
            <Input
              type="number"
              name="number"
              id="number"
              inputMode="numeric"
              placeholder="Digite o número"
              defaultValue={inputData?.number}
              ref={register}
              error={errors.number}
            />

            {errors.number && <Alert>{errors.number.message}</Alert>}
          </div>

          <div className="col-span-6 pt-6">
            <Switch
              name="default_address"
              defaultChecked={inputData?.default}
              labelText="Endereço padrão?"
              ref={register}
            />
          </div>
        </div>

        <label htmlFor="complement">
          <div>Complemento</div>
        </label>
        <Input
          name="complement"
          id="complement"
          placeholder="Ap, bloco, casa etc..."
          type="text"
          ref={register}
          defaultValue={inputData?.complement}
        />

        <label htmlFor="phone">
          <div>
            Número de telefone<span>*</span>
          </div>
        </label>

        <InputMask
          mask={["(99) 9999-9999", "(99) 99999-9999"]}
          type="text"
          name="phone"
          defaultValue={inputData?.phone}
          id="phone"
          ref={register}
          inputMode="numeric"
          placeholder="(19) 9999-9999"
          error={errors.phone}
        />

        {errors.phone && <Alert>{errors.phone.message}</Alert>}

        <Button
          bgColor="primary"
          className="py-2 px-4 mt-5 mx-auto text-lg"
          type="submit"
        >
          {loading ? (
            <LoadingSpinner color="primary" size={15} barSize={3} />
          ) : (
            <>atualizar</>
          )}
        </Button>
      </FormStyled>
    </div>
  );
}

export default Address;

Address.Layout = Layout;

Address.SideBarProfile = SideBarProfile;
