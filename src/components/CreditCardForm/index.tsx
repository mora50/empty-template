import CreditCard from "@components/CreditCard";
import InputMask from "@components/InputMask";
import { Alert, Button } from "@styles/components";
import { ChangeEvent, useState } from "react";

import { useFormContext } from "react-hook-form";
import { Elements } from "./styles";

export default function CreditCardForm() {
  const { errors, register } = useFormContext();

  const [cvc, setCvc] = useState<string>();
  const [expiry, setExpiry] = useState<string>();
  const [name, setName] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [focus, setFocus] = useState<string>();

  const handleInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
    let focusName = e.target.name;

    focusName = focusName === "cvv" ? "cvc" : focusName;

    focusName = focusName === "date_expiration" ? "expiry" : focusName;

    setFocus(focusName);
  };

  return (
    <Elements>
      <div>
        <div>
          <CreditCard
            cvc={cvc}
            expiry={expiry}
            focus={focus}
            name={name}
            number={number}
          />
          <label htmlFor="name">
            <div className="label-info">
              Nome como está no cartão<span>*</span>
            </div>

            <input
              ref={register}
              type="text"
              id="name"
              name="name"
              onFocus={handleInputFocus}
              placeholder="NOME (como impresso no cartão)"
              onChange={(e) => setName(e.target.value)}
            />

            {errors?.name && <Alert>{errors?.name.message}</Alert>}
          </label>
        </div>
        <div>
          <label htmlFor="number">
            <div className="label-info">
              Número do cartão<span>*</span>
            </div>

            <InputMask
              ref={register}
              mask="9999 9999 9999 9999"
              name="number"
              id="number"
              type="text"
              aria-describedby="number"
              placeholder="NÚMERO DO CARTÃO"
              onFocus={handleInputFocus}
              onChange={(e) => setNumber(e.target.value)}
            />

            {errors?.number && <Alert>{errors?.number.message}</Alert>}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <label htmlFor="date_expiration">
              <div className="label-info">
                Validade<span>*</span>
              </div>

              <InputMask
                ref={register}
                autoComplete="off"
                name="date_expiration"
                mask={"99/99"}
                type="text"
                inputMode="numeric"
                placeholder="VALIDADE (mm/aa)"
                maxLength={5}
                onFocus={handleInputFocus}
                id="date_expiration"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setExpiry(e.target.value)
                }
              />

              {errors?.date_expiration && (
                <Alert>{errors?.date_expiration.message}</Alert>
              )}
            </label>
          </div>

          <div className="col-span-1">
            <label htmlFor="cvv">
              <div className="label-info">
                CVV<span>*</span>
              </div>

              <InputMask
                mask="9999"
                ref={register}
                inputMode="numeric"
                type="text"
                id="cvv"
                name="cvv"
                placeholder="CVV"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCvc(e.target.value)
                }
                onFocus={handleInputFocus}
              />

              {errors?.cvc && <Alert>{errors?.cvc.message}</Alert>}
            </label>
          </div>
        </div>

        <div className="text-center mt-5">
          <Button minHeight={35} bgColor="primary">
            Adicionar
          </Button>
        </div>
      </div>
    </Elements>
  );
}
