import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Alert,
  Button,
  FormStyled,
  Input,
  LoadingSpinner,
} from "../styles/components";
import { loginSchema } from "../utils/YupValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { FacebookSquare } from "@styled-icons/boxicons-logos/FacebookSquare";

import { useAuth } from "../contexts/authContext";

import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [loadingButton, setLoadingButton] = useState<boolean>();

  const router = useRouter();

  const { login } = useAuth();

  async function handleDataForm(data: ILoginForm) {
    setLoadingButton(true);

    const prevPath = router.query.prevPath ?? "/profile";

    const { email, password } = data;

    await login(email, password, prevPath);

    setLoadingButton(false);
  }

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <div className="max-w-md mx-auto  flex items-center justify-center md:mt-24">
        <div className="px-8 w-full">
          <div className="text-center text-2xl">
            <strong>Login do Cliente</strong>
          </div>

          <FormStyled
            disabled={loadingButton}
            onSubmit={handleSubmit(handleDataForm)}
          >
            <div className="my-4">
              <label htmlFor="email">
                {" "}
                <div> Seu email</div>
              </label>

              <Input
                ref={register}
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                error={errors.email}
              />

              {errors.email && (
                <Alert className="w-100">{errors.email.message}</Alert>
              )}
            </div>

            <div className="my-4">
              <label htmlFor="password">
                {" "}
                <div> Senha</div>
              </label>

              <Input
                ref={register}
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                error={errors.password}
              />

              {errors.password && (
                <Alert className="w-100">{errors.password.message}</Alert>
              )}
            </div>

            <div className=" my-4 text-right">
              <a className="sublimed color-blue mt-3">Esqueci a senha</a>
            </div>

            <div className="h-32 ">
              <>
                <Button
                  bgColor="primary"
                  minHeight={38}
                  className="w-full justify-center"
                  type="submit"
                >
                  {loadingButton ? (
                    <LoadingSpinner className="mx-auto" size={20} barSize={3} />
                  ) : (
                    "Entrar"
                  )}
                </Button>

                <div className="my-2 flex items-center font-weight-bold">
                  <span className="w-40">
                    <hr />
                  </span>
                  <div className="mx-2 w-10 text-center">ou</div>
                  <span className="w-40">
                    <hr />
                  </span>
                </div>
                <Button
                  bgColor="f-blue"
                  className="w-full text-center justify-center flex items-center"
                >
                  <FacebookSquare />
                  Entrar com facebook
                </Button>
              </>
            </div>
          </FormStyled>

          <div className="my-3 text-center">
            <span className="color-grey"> Cliente novo na loja? </span>
            <strong>
              <Link href="/register">
                <a className="sublimed color-blue"> Cadastre-se aqui </a>
              </Link>
              <br />
            </strong>
          </div>
        </div>
      </div>
    </>
  );
}

Login.Layout = Layout;
