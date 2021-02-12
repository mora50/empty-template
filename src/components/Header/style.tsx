import styled, { css } from "styled-components";
import { Menu } from "@styled-icons/boxicons-regular/Menu";

import { device } from "../../styles/components";

export const IconMenu = styled(Menu)`
  color: #fff;
  height: 32px;
  width: 32px;
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

export const IconsWrapper = styled.div`
  svg {
    color: #fff;
    height: 30px;
    width: 30px;

    cursor: pointer;
  }

  button {
    padding: 5px;
    border-radius: 7px;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const MenuWrapper = styled.header`
  left: 0;
  top: 0;

  width: 100%;
  background: var(--primary);
  border-bottom: 0px solid #ccc;
  padding: 5px 5px 10px 5px;
  -webkit-box-shadow: 0px 1px 21px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 0px 1px 21px 1px rgba(192, 150, 150, 0.03);
  box-shadow: 0px 1px 21px 1px rgba(0, 0, 0, 0.03);
  z-index: 50;
  position: relative;
  overflow: hidden;

  @media ${device.laptop} {
    padding-bottom: 1rem;
  }

  .logo {
    margin-right: 0.5rem;

    svg {
      width: 50px;
      height: 50px;
    }
  }
`;

export const MapIcon = styled.button<{ active: Boolean }>`
  svg {
    color: ${(props) => (props.active ? "var(--red)" : "#fff")};
  }
`;

export const SearchWrapper = styled.form`
  background-color: #e7f0f5;
  border-bottom: 0px solid transparent;

  border-radius: 10px;
  color: #53656f;

  display: flex;
  align-items: center;
  margin-top: 5px;
  justify-content: space-between;
  position: relative;

  input {
    font-size: 16px;
    color: #53656f;
    padding: 0.938em 4em 0.938em 1em;
    background-color: transparent;
    border: 0px;
    position: relative;

    box-shadow: none;
    width: 100%;
  }

  button {
    position: absolute;
    right: 0rem;
    padding: 5px;
    width: 70px;
    height: 54px;
    color: #53656f;

    svg {
      width: 33px;
    }
  }
`;

export const OverlayHeader = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  height: 100%;
  min-height: 100%;
`;
