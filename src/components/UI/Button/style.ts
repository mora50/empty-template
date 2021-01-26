import styled, { css } from "styled-components";
import { IPositionWave } from ".";

export const BtnRipple = styled.button`
  width: 300px;
  height: 100px;
  outline: 0;
  border: 1px solid #e15f03;
  background: #ff6a00;
  color: white;
  font-size: 15px;
  text-transform: uppercase;
  font-size: 1.4rem;
  transition: background 0.3s;
  overflow: hidden;
  position: relative;
`;

export const Wave = styled.span<{ effectProps: IPositionWave }>`
  ${({ effectProps }) =>
    effectProps &&
    css`
      pointer-events: none;
      width: 1px;
      height: 1px;
      background: transparent;
      top: 0;
      left: 0;
      display: block;
      /* Reset de posições */
      position: absolute;

      will-change: transform;
      transform: translateX(${effectProps.left}px)
        translateY(${effectProps.top}px);

      &:after {
        content: "";
        display: block;
        width: 100%;
        border-radius: 50%;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.4);
        /* Importantes */
        will-change: transform;
        transform: scale(${effectProps.scale ?? 0});
        opacity: ${effectProps?.opacity};
        transition: transform 0.5s, opacity 0.3s;
      }
    `}
`;
