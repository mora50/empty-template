import { createElement, MouseEvent, useEffect, useRef, useState } from "react";
import { BtnRipple, Wave } from "./style";

export interface IPositionWave {
  top?: number;
  left?: number;
  opacity?: number;
  active?: boolean;
  scale?: number;
}

export default function Button({ children }) {
  const [waveProps, setWaveProps] = useState<IPositionWave>({});

  const rippleEffect = (event: MouseEvent<HTMLElement>) => {
    const button = event.target as HTMLElement;

    const buttonPositions: ClientRect = button.getBoundingClientRect();

    const top = Math.abs(buttonPositions.top - event.clientY);

    const scale = Math.min(buttonPositions.height, buttonPositions.width);

    const left = Math.abs(buttonPositions.left - event.clientX);

    const dimensions = {
      top,
      left,
      scale,
    };

    setWaveProps({ ...dimensions, opacity: 1, active: true });

    setTimeout(() => {
      setWaveProps({ ...dimensions, opacity: 0, scale: 0, active: false });
    }, 500);

    /*

    
 

    wave.classList.add('wave');

    button.insertAdjacentElement('beforeend', wave); */
  };

  return (
    <BtnRipple className="border" onClick={rippleEffect}>
      {children}

      {waveProps.active && <Wave effectProps={waveProps.active && waveProps} />}
    </BtnRipple>
  );
}
