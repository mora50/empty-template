import * as Yup from "yup";

export const ValidationFormAddress = Yup.object().shape({
  address: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),
  number: Yup.string()
    .max(8, "Máximo 8 caracteres")
    .required("Número da residencia é obrigatório"),
  city: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),
  neighborhood: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),

  state: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .typeError("Campo obrigatório"),

  postcode: Yup.string()
    .max(9, "Máximo 8 números")
    .matches(/^[0-9-]+$/, "Apenas números")
    .required("Campo obrigatório")
    .typeError("Apenas números"),
  phone: Yup.string()
    .max(20, "Máximo 20 números")
    .min(10, "Mínimo 8 números")
    .required("Número do telefone é obrigatório")

    .required("Número do telefone é obrigatório"),
  name: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),
});

export const ValidationUnloggedForm = Yup.object().shape({
  address: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),

  number: Yup.string()
    .max(8, "Máximo 8 caracteres")
    .required("Número da residencia é obrigatório"),
  city: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),
  neighborhood: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),

  state: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .typeError("Campo obrigatório"),

  postcode: Yup.string()
    .max(9, "Máximo 8 números")
    .matches(/^[0-9-]+$/, "Apenas números")
    .required("Campo obrigatório")
    .typeError("Apenas números"),
  phone: Yup.string()
    .max(20, "Máximo 20 números")
    .min(10, "Mínimo 8 números")
    .required("Número do telefone é obrigatório"),

  vat_number: Yup.string()
    .max(19, "Máximo 14 números")
    .min(14, "Mínimo 11 números")
    .matches(/^[0-9/.-]+$/, "Apenas números")
    .required("Número do documento é obrigatório")
    .typeError("Apenas números"),

  name: Yup.string()
    .required("Campo obrigatório")
    .max(60, "Máximo 60 caracteres"),
  email: Yup.string().email("Email invalido!").required("Email é obrigatório!"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido!").required("Email é obrigatório!"),
  password: Yup.string()
    .required("Campo password é obrigatório")
    .min(6, "Digite pelo menos 6 caracteres"),
});

export const updateProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .max(60, "Máximo 60 caracteres"),
  email: Yup.string().email("Email invalido!").required("Email é obrigatório!"),
  vat_number: Yup.string()
    .max(19, "Máximo 14 números")
    .min(14, "Mínimo 11 números")
    .matches(/^[0-9/.-]+$/, "Apenas números")
    .required("Número do documento é obrigatório")
    .typeError("Apenas números"),
  date_of_birth: Yup.string()
    .max(10, "Máximo 8 números")
    .min(10, "Data incorreta")
    .required("Data obrigatória"),
  password: Yup.string()
    .min(6, "A senha precisa ter mais de 6 caracteres!")
    .max(40, "Máximo 40 números")
    .required("Senha é obrigatório!"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem corresponder!")
    .required("Confirmar a senha é obrigatório!"),
  phone: Yup.string()
    .max(20, "Máximo 20 números")
    .min(10, "Mínimo 8 números")
    .required("Número do telefone é obrigatório"),
});

export const registerUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .max(60, "Máximo 60 caracteres"),
  email: Yup.string().email("Email invalido!").required("Email é obrigatório!"),
  vat_number: Yup.string()
    .max(19, "Máximo 14 números")
    .min(14, "Mínimo 11 números")
    .matches(/^[0-9/.-]+$/, "Apenas números")
    .required("Número do documento é obrigatório")
    .typeError("Apenas números"),
  password: Yup.string()
    .min(6, "A senha precisa ter mais de 6 caracteres!")
    .max(40, "Máximo 40 números")
    .required("Senha é obrigatório!"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem corresponder!")
    .required("Confirmar a senha é obrigatório!"),
});

export const creditCardSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .max(100, "Máximo 100 caracteres"),
  number: Yup.string()
    .min(19, "Mínimo 16 números")
    .matches(/^[0-9 ]+$/, "Apenas números")
    .required("Número do cartão é obrigatório")
    .typeError("Apenas números"),
  date_expiration: Yup.string()
    .max(5, "Digite corretamente")
    .min(5, "Digite a data Completa")
    .required("Data obrigatória"),
  cvv: Yup.string()
    .max(4, "Digite o CVV completo")
    .min(3, "Digite o CVV completo")
    .matches(/^[0-9]+$/, "Apenas números")
    .required("CVV é obrigatório")
    .typeError("Apenas números"),
});

export const forgotPassword = Yup.object().shape({
  email: Yup.string().email("Email invalido!").required("Email é obrigatório!"),
});

export const resetPassword = Yup.object().shape({
  email: Yup.string().email("Email invalido!").required("Email é obrigatório!"),
  password: Yup.string()
    .min(6, "A senha precisa ter mais de 6 caracteres!")
    .max(40, "Máximo 40 números")
    .required("Senha é obrigatório!"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem corresponder!")
    .required("Confirmar a senha é obrigatório!"),
});

export const orderCheckout = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .max(60, "Máximo 60 caracteres"),

  email: Yup.string().email("Email invalido!").required("Email é obrigatório!"),
  vat_number: Yup.string()
    .max(19, "Máximo 14 números")
    .min(14, "Mínimo 11 números")
    .matches(/^[0-9/.-]+$/, "Apenas números")
    .required("Número do documento é obrigatório")
    .typeError("Apenas números"),
  postcode: Yup.string()
    .max(9, "Máximo 8 números")
    .min(9, "Digite o CEP completo")
    .matches(/^[0-9]+$/, "Apenas números")
    .required("Campo obrigatório")
    .typeError("Apenas números"),
  phone: Yup.string()
    .max(20, "Máximo 20 números")
    .min(14, "Mínimo 8 números")
    .required("Número do telefone é obrigatório")
    .typeError("Apenas números"),
});
