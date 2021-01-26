import styled from "styled-components";
import { cssVar, darken } from "polished";

export const buttonsWrapper = styled.div`
  padding: 0px 20px;
`;

export const DropDownAccess = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  z-index: 100;
`;

export const CartHeaderWrapper = styled.div`
  margin-top: 3.5rem;
  position: relative;

  width: 224px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.15);
  background-color: #fff;

  .welcome {
    color: #000;

    position: absolute;

    top: 16px;
    left: 16px;
  }

  a,
  button {
    &:hover {
      color: var(--primary);
    }
  }

  ul li {
    a,
    button {
      padding: 0.8rem 15px;
    }
  }

  .close {
    color: #000;

    position: absolute;
    width: 25px;
    top: 6px;
    right: 10px;
  }

  .login-btn {
    text-align: center;
    margin: 0.5rem 0;

    button,
    a {
      height: 31px;
    }

    button,
    a:hover {
      color: #fff !important;
    }
  }

  .btn-login {
    background: var(--primary);
    transition: 0.2s;

    &:hover {
      background: var(--link-hover-color);
    }

    padding: 6px 12px;
    font-size: 13px;

    color: #fff;
    font-weight: bold;
    border-radius: 7px;
    width: 100%;
  }

  .new-customer {
    font-size: 14px;
  }

  .footer-dropdown {
    display: flex;
    justify-content: center;

    span {
      border: 1px solid var(--gray);
      margin: 0 1rem;
    }

    a {
      color: var(--primary);
      font-size: 12px;
      text-decoration-line: underline;
      text-decoration-style: solid;
    }
  }

  .btn-facebook {
    font-weight: bold;
    background: #3b5999;
    padding: 5px 12px;
    font-size: 13px;
    align-items: center;
    border: 0;
    width: 100%;
    display: flex;
    color: #fff;
    border-radius: 4px;
    justify-content: center;

    svg {
      width: 20px;
      margin-right: 7px;
    }
  }
`;
