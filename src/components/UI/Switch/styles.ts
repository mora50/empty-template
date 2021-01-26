import styled, { css, keyframes } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: block;

  input {
    opacity: 0;
    pointer-events: none;
  }
`;

const turnOn = keyframes`

from{
 left: 0rem;
  }
  to{
   
 left: 1rem;
  }
`;

const turnOff = keyframes`
  from{
   left: 1rem;
  }
  to{
   left: 0rem;
  }
`;

export const Box = styled.label<{ active: boolean }>`
  position: relative;
  margin-bottom: 0;
  vertical-align: top;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    background: #ccc;
    display: block;
    width: 28px;
    height: 10px;
    border-radius: 5px;
    position: absolute;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    background: #f1f1f1;
    width: 15px;
    height: 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 100%;

    box-shadow: 0 0.0625rem 0.1875rem 0.0625rem rgba(0, 0, 0, 0.4);
  }

  ${({ active }) =>
    css`
      &:after {
        animation: ${active ? turnOn : turnOff} 2s linear;

        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
      }

      &:before {
        background: ${active ? "var(--primary)" : "#ccc"};
      }
    `}
`;
