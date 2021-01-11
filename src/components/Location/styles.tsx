import styled, { css } from "styled-components";
import { MapMarkerAlt } from "@styled-icons/fa-solid/MapMarkerAlt";
import { RightArrowAlt } from "@styled-icons/boxicons-regular/RightArrowAlt";

export const iconMap = styled(MapMarkerAlt)`
  color: #ed2929;

  width: 14px;

  margin: 10px 5px;
  color: #fff;
`;

export const iconGo = styled(RightArrowAlt)`
  color: #fff;
  height: 24px;
  width: 24px;
  display: inline-block;
  cursor: pointer;
`;

export const redButton = styled.button`
  background-color: #ed2929;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: 0.9rem auto 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  height: 35px;
  padding: 2px 7px;
`;

export const Close = styled.button`
  background: none;
  color: var(--gray);
  position: absolute;
  width: 20px;
  right: 0.6rem;
  top: 0.4rem;
`;

export const LocationWrapper = styled.form`
  position: relative;
  border-radius: 0px 0px 20px 20px;
  justify-content: center;
  align-items: center;
  display: flex;

  width: 280px;
  height: 180px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  z-index: 101;
  padding: 20px 15px;
  text-align: center;

  div button:nth-child(1) {
    background: var(--primary);
    color: #fff;
    padding: 7px 10px;
    border-radius: 15px;

    &:focus {
      outline: none;
    }

    svg {
      width: 12px;
      margin-right: 4px;
    }
  }
`;

export const CepLocation = styled.form`
  background-color: #e7f0f5;
  border-radius: 50px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0.5rem auto 0;
  width: 180px;

  input {
    background-color: transparent;
    border: 0px;
    height: 40px;
    box-shadow: none;
    font-size: 20px;
    width: 77%;
    padding: 0 1rem;
  }

  button {
    background-color: var(--primary);
    border-radius: 50px;
    height: 40px;
    width: 40px;
    color: #fff;
    border: 0px;
    right: 0px;
    position: absolute;
  }
`;
