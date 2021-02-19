import { forwardRef, InputHTMLAttributes, ReactChild } from "react";
import { Radio } from "./style";
import cn from "classnames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labeltext?: ReactChild;
}

const InputRadio = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <Radio hasLabel={props.labeltext ? true : false}>
      <input ref={ref} className=" top-0" type="radio" {...props} />

      <div className={cn("box", { "border-none p-0": !props.labeltext })}>
        <div>
          <span className="circle" />
        </div>

        {props.labeltext && <label htmlFor={props.id}>{props.labeltext}</label>}
      </div>
    </Radio>
  );
});

export default InputRadio;
