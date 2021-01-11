import styled, { css } from "styled-components";

export const DefaultAddress = styled.button<{ default: boolean }>`
  &:hover {
    color: var(--gray);
  }

  ${(props) =>
    props.default &&
    css`
      color: var(--green);
      &:hover {
        filter: initial;
      }
    `};
`;

export const AddressBox = styled.div`
  background: #fff;
  padding: 1rem;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  svg {
    width: 20px;
  }

  .edit-btns {
    button,
    a {
      display: flex;
      align-items: center;
      color: #fff;
      padding: 3px 10px;
      border-radius: 9px;
      transition: 0.3s;
      font-size: 14px;
      font-weight: bold;

      &:hover {
        filter: brightness(115%);
      }

      &:nth-child(1) {
        background: var(--secondary);
      }

      &:nth-child(2) {
        background: var(--red);
      }
    }
  }
`;
