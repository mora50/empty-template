import styled from "styled-components";

import { device } from "../../styles/components";

export const footerWrapper = styled.footer`
  background-color: var(--gray);

  color: #fff;
  font-size: 10px;
  text-align: center;

  svg {
    margin-left: 5px;
    height: 40px;
  }

  a {
    color: #fff;
  }

  @media ${device.tablet} {
    padding: 0;
  }
`;

export const menuItens = styled.div`
  position: absolute;
  background-color: #505050;
  padding: 20px;
  font-size: 10px;
  color: #fff;
  text-align: left;
  left: 0;
  bottom: 30px;
  min-width: 320px;
  -webkit-box-shadow: 0px 18px 32px -18px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 18px 32px -18px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 18px 32px -18px rgba(0, 0, 0, 0.3);
  display: none;

  ul {
    list-style: none;
    padding: 0px;
    li {
      display: block;
      font-size: 12px;
      font-weight: 700;
      margin: 10px 0px;
    }
  }

  &.active {
    display: initial;
  }
`;
