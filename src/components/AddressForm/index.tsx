import { FC } from "react";
import InputMask from "@components/InputMask";
import Switch from "@components/UI/Switch";
import { Alert, Input } from "@styles/components";
import stateOptions from "@utils/states";

import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
/* import { getLocationByCode } from "@lib/getLocationByCode"; */

const AddressForm: FC = () => {
  const { errors, register, control } = useFormContext();
  /**TODO: Auto fill the inputs: state, city and neighborhood by postcode */

  /*  
    const [hasPostCode, setHasPostCode] = useState();
  
  
  const loadInputAPI = async (postcode: string) => {
    if (postcode.length < 8) {
      return;
    }

    let response = await getLocationByCode({ zipCode: postcode });

    if (response) {
      response = response.data;

      setValue("city", response.city);
      setValue(
        "state",
        stateOptions.find((option) => option.value === response.state)
      );
      setValue("address", response.street);

      setValue("neighborhood", response.neighborhood);
    }
  }; */

  return (
    <>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6">
          <label htmlFor="name">
            <div>
              Apelido do endereço <span> *</span>
            </div>
          </label>
          <Input
            id="name"
            placeholder="ex: Minha casa"
            name="name"
            type="text"
            ref={register}
            error={errors.name}
          />

          {errors.name && <Alert>{errors.name.message}</Alert>}
        </div>

        <div className="col-span-6">
          <label htmlFor="postcode">
            <div>
              CEP para envio<span>*</span>
            </div>
          </label>

          <InputMask
            name="postcode"
            mask="99999-999"
            type="text"
            ref={register}
            inputMode="numeric"
            id="postcode"
            placeholder="Digite o CEP"
            error={errors.postcode}
          />
          {errors.postcode && <Alert>{errors.postcode.message}</Alert>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6">
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
            ref={register}
            error={errors.address}
          />

          {errors.address && <Alert>{errors.address.message}</Alert>}
        </div>

        <div className="col-span-6">
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
            ref={register}
            error={errors.city}
          />

          {errors.city && <Alert>{errors.city.message}</Alert>}
        </div>
      </div>

      <div className="no-shadow my-2">
        <label htmlFor="">
          <div>
            Estado <span> *</span>
          </div>
        </label>

        <Controller
          as={
            <Select
              styles={
                errors.state && {
                  control: (provided) => ({ ...provided, borderColor: "red" }),
                }
              }
            />
          }
          options={stateOptions}
          defaultValue={null}
          name="state"
          isClearable
          placeholder={"Selecione seu estado"}
          control={control}
        />

        {errors.state && <Alert>Esse campo é obrigatório</Alert>}
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
            ref={register}
            error={errors.number}
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
      <Input
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

      <InputMask
        mask={["(99) 9999-9999", "(99) 99999-9999"]}
        type="text"
        name="phone"
        id="phone"
        ref={register}
        inputMode="numeric"
        placeholder="(19) 9999-9999"
        error={errors.phone}
      />

      {errors.phone && <Alert>{errors.phone.message}</Alert>}

      {/*    <div className="text-center">
          <Button
            bgColor="primary"
            className="py-2 px-4 mt-5 mx-auto text-lg"
            type="submit"
          >
            {loading ? (
              <LoadingSpinner color="primary" size={15} barSize={3} />
            ) : (
              <>criar</>
            )}
          </Button>
        </div> */}
    </>
  );
};

export default AddressForm;
