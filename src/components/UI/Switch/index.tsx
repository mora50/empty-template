import {
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
} from "react";

import * as S from "./styles";

interface ISwitch extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
}

const Switch = forwardRef<HTMLInputElement, ISwitch>((props, ref) => {
  const [active, setActive] = useState<boolean>(props.defaultChecked);

  const { name, labelText } = props;

  useEffect(() => {
    setActive(props.defaultChecked);
  }, [props.defaultChecked]);

  return (
    <S.Wrapper>
      <input ref={ref} name={name} id={name} type="checkbox" checked={active} />

      <S.Box htmlFor={name} onClick={() => setActive(!active)} active={active}>
        <span className="ml-11">{labelText}</span>
      </S.Box>
    </S.Wrapper>
  );
});

export default Switch;
