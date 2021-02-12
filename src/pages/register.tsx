import InputMask from "@components/InputMask";
import Layout from "@components/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@services/api";
import {
  Alert,
  Button,
  FormStyled,
  LoadingSpinner,
  Container,
  Input,
} from "@styles/components";
import normalizeChar from "@utils/normalizeChar";
import { registerUserSchema } from "@utils/YupValidations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "src/contexts/authContext";

interface IRegister {
  fullName: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  vat_number: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const [loading, setLoading] = useState<boolean>();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerUserSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: IRegister) => {
    setLoading(true);
    const { email, password } = data;

    /* const inputLogins = { email, password }; */

    let { name } = data;
    let fullName = name.split(" "),
      first_name = fullName[0],
      last_name = fullName[fullName.length - 1];

    data.first_name = first_name;
    data.last_name = last_name;
    delete data.name;

    data.vat_number = normalizeChar(data.vat_number);

    try {
      await api.post("/customer/register", data);

      login(email, password, "/profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-md m-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Cadastre-se</h2>
        </div>

        <FormStyled disabled={loading} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">
            <div>Digite seu nome completo:</div>
          </label>

          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Ex: Carlos Silva"
            ref={register}
            error={errors.name}
          />

          {errors.name && <Alert>{errors.name.message}</Alert>}

          <label htmlFor="email">
            <div>Digite seu e-mail:</div>
          </label>
          <Input
            type="email"
            name="email"
            placeholder="Ex: carlossilva@hotmail.com"
            ref={register}
            error={errors.email}
          />
          {errors.email && <Alert>{errors.email.message}</Alert>}

          <label htmlFor="vat_number">
            <div> Digite seu CPF/CNPJ (apenas números):</div>
          </label>

          <InputMask
            type="text"
            inputMode="numeric"
            name="vat_number"
            id="vat_number"
            placeholder="Ex: 123.456.789-12"
            mask={["999.999.999-99", "99.999.999/9999-99"]}
            error={errors.vat_number}
            ref={register}
          />

          {errors.vat_number && <Alert>{errors.vat_number.message}</Alert>}

          <label htmlFor="password">
            <div>Digite sua senha:</div>
          </label>
          <Input
            type="password"
            id="password"
            ref={register}
            name="password"
            placeholder="Sua senha"
            error={errors.password}
          />

          {errors.password && <Alert>{errors.password.message}</Alert>}

          <label htmlFor="password_confirmation">
            <div>Confirme sua senha:</div>
          </label>
          <Input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            ref={register}
            placeholder="Confirme sua senha"
            error={errors.password_confirmation}
          />

          {errors.password_confirmation && (
            <Alert>{errors.password_confirmation.message}</Alert>
          )}

          <div className="text-center">
            <Button
              bgColor="light-green"
              className="py-2 px-4 mt-5 mx-auto text-lg ripple"
              type="submit"
            >
              {loading ? (
                <LoadingSpinner color="primary" size={15} barSize={3} />
              ) : (
                <>Criar seu cadastro</>
              )}
            </Button>
          </div>
        </FormStyled>
      </div>

      <div className="text-center mt-5 ">
        <span className="text-gray-500">
          Ao criar sua conta, você concorda com a nossa{" "}
        </span>
        <a className="underline" href="">
          Política de Privacidade
        </a>
      </div>
    </Container>
  );
}

Register.Layout = Layout;
