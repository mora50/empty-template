import styled, { css } from "styled-components";

export const Radio = styled.div<{ hasLabel: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  ${({ hasLabel }) =>
    hasLabel &&
    css`
      width: max-content;
    `}

  .border {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  input[type="radio"] {
    opacity: 0;
    position: absolute;
    z-index: 200;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    + .box {
      border-radius: 7px;
      border: 1px solid #ccc;
      padding: 1rem;
      display: flex;
      align-items: center;

      .circle {
        width: 20px;
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 50%;
        display: grid;
        justify-content: center;
        margin-right: 0.5rem;
        display: inline-flex;
        align-items: center;
        transition: 0.3s ease-in-out;

        &:after {
          transition: 0.3s ease-in-out;
          content: "";
          width: 0px;
          height: 0px;
          opacity: 0;
          border-radius: 50%;
          position: absolute;
        }
      }
    }

    &:checked {
      + .box {
        border-color: var(--primary);
        border-radius: 7px;
      }

      + .box .circle {
        width: 20px;
        height: 20px;
        border: 1px solid var(--primary);

        &:after {
          background: var(--primary);
          content: "";
          width: 10px;
          opacity: 1;
          height: 10px;
          border-radius: 50%;
          position: absolute;
        }
      }
    }
  }
`;
