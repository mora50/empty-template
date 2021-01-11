import Cards, { Focused } from "react-credit-cards";

interface ICreditCard {
  cvc?: string;
  expiry?: string;
  name?: string;
  number?: string;
  focus?: string;
}

export default function CreditCard(props: ICreditCard) {
  const { cvc, expiry, name, number, focus } = props;

  return (
    <Cards
      cvc={cvc ?? ""}
      expiry={expiry ?? ""}
      name={name ?? ""}
      focused={focus as Focused}
      number={number ?? ""}
      placeholders={{ name: "seu nome" }}
      locale={{ valid: "Validade" }}
    />
  );
}
