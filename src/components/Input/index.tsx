import {
  FormEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";

import { mask, unMask } from "remask";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  mask: string | string[];
  defaultValue?: string;
}

const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const [value, setValue] = useState<string>();

  const { defaultValue, onChange } = props;

  const handleInput = useCallback(
    (value: string, ev?: FormEvent<HTMLInputElement>) => {
      const pattern = props.mask;

      const masked = mask(unMask(value), pattern);

      setValue(masked);

      if (ev) {
        ev.currentTarget.value = masked;
      }
    },

    [props.mask]
  );

  useEffect(() => {
    if (defaultValue) {
      handleInput(defaultValue);
    }
  }, [defaultValue]);

  return (
    <input
      {...props}
      defaultValue={value}
      ref={ref}
      onChange={(e) => {
        handleInput(e.target.value, e);
        onChange && onChange(e);
      }}
    />
  );
});

export default Input;
