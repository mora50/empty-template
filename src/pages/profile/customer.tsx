import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import SideBarProfile from "@components/SideBarProfile";
import { Alert, Button, FormStyled, LoadingSpinner } from "@styles/components";
import { updateProfileSchema } from "@utils/YupValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import normalizeChar from "@utils/normalizeChar";
import Input from "@components/Input";
import api from "@services/api";
import dateToYMD from "@utils/dateToYMD";
import notification from "@utils/notification";

interface ICustomer {
  name: string;
  email: string;
  vat_number: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  first_name: string;
  last_name: string;
  fullname: string;
}

function Customer() {
  const [inputData, setInputData] = useState<ICustomer>();
  const [buttonLoading, setButtonLoading] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
  } = useForm(/* {
    resolver: yupResolver(updateProfileSchema),
  } */);

  const onSubmit = async (data: ICustomer) => {
    const { date_of_birth, name } = data;

    const dateFormatted = dateToYMD(date_of_birth);

    data.date_of_birth = dateFormatted;

    setButtonLoading(true);

    const fullName = name.split(" "),
      first_name = fullName[0],
      last_name = fullName[fullName.length - 1];

    data.first_name = first_name;
    data.last_name = last_name;
    delete data.name;

    data.phone = "+55" + normalizeChar(data.phone);

    data.vat_number = normalizeChar(data.vat_number);

    try {
      const response = await api.put("/customer/profile", data);

      notification(response.data.message, "success");

      reset(["password", "password_confirmation"]);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    (async function () {
      try {
        const { data: response } = await api.get<ICustomer>("/customer/get");

        if (response) {
          const { first_name, last_name, date_of_birth } = response;

          const fullname = `${first_name} ${last_name}`;

          const dateFormatted = Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }).format(new Date(date_of_birth + "T06:00:00Z"));

          if (date_of_birth) {
            response.date_of_birth = dateFormatted;
          }

          response.fullname = fullname;

          if (response.phone) {
            response.phone = response.phone.substring(3);
          }

          setInputData(response);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [setValue]);

  return (
    <div className="mx-auto max-w-md">
      <fieldset disabled={buttonLoading}>
        <FormStyled className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <>
            <label htmlFor="name">
              <div>Digite seu nome completo:</div>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={inputData?.name}
              placeholder="Seu nome completo"
              ref={register}
            />
            {errors.name && <Alert>{errors.name.message}</Alert>}
            <label htmlFor="email">
              <div>Digite seu e-mail:</div>
            </label>
            <input
              type="email"
              defaultValue={inputData?.email}
              name="email"
              placeholder="Seu email"
              ref={register}
            />
            {errors.email && <Alert>{errors.email.message}</Alert>}
            <label htmlFor="vat_number">
              <div> Digite seu CPF/CNPJ (apenas números):</div>
            </label>
            <Input
              type="text"
              mask={["999.999.999-99", "99.999.999/9999-99"]}
              name="vat_number"
              id="vat_number"
              ref={register}
              defaultValue={inputData?.vat_number}
              inputMode="numeric"
              placeholder="CPF/CNPJ"
            />
            {errors.vat_number && <Alert>{errors.vat_number.message}</Alert>}
            <label htmlFor="date_of_birth">
              <div> Selecione a data do seu aniversário </div>
            </label>
            <Input
              type="text"
              inputMode="numeric"
              mask="99/99/9999"
              name="date_of_birth"
              defaultValue={inputData?.date_of_birth}
              ref={register}
              id="date_of_birth"
              placeholder="Data de Nascimento"
            />
            {errors.date_of_birth && (
              <Alert>{errors.date_of_birth.message}</Alert>
            )}
            <label htmlFor="gender">
              <div> Selecione seu sexo</div>
            </label>

            <select
              ref={register}
              id="gender"
              value={inputData?.gender}
              onChange={(e) => {
                setInputData({ ...inputData, gender: e.target.value });
              }}
              name="gender"
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
            <label htmlFor="phone">
              <div>Digite seu telefone </div>{" "}
            </label>
            <Input
              mask={["(99) 9999-9999", "(99) 99999-9999"]}
              type="text"
              name="phone"
              defaultValue={inputData?.phone}
              id="phone"
              ref={register}
              inputMode="numeric"
              placeholder="(19) 9999-9999"
            />
            {errors.phone && <Alert>{errors.phone.message}</Alert>}
            <label htmlFor="password">
              <div>Digite sua senha:</div>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={register}
              placeholder="Sua senha"
            />
            {errors.password && <Alert>{errors.password.message}</Alert>}
            <label htmlFor="password_confirmation">
              <div>Confirme sua senha:</div>
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              ref={register}
              placeholder="Confirme sua senha"
            />
            {errors.password_confirmation && (
              <Alert>{errors.password_confirmation.message}</Alert>
            )}

            <div className="text-center">
              <Button
                bgColor="primary"
                className="py-2 px-4 mt-5"
                type="submit"
              >
                {buttonLoading ? (
                  <LoadingSpinner size={15} barSize={3} />
                ) : (
                  <>atualizar</>
                )}
              </Button>
            </div>
          </>
        </FormStyled>
      </fieldset>
    </div>
  );
}

export default Customer;

Customer.Layout = Layout;

Customer.SideBarProfile = SideBarProfile;
