import styled from "styled-components";
import { device } from "../../styles/components";

export const ListItems = styled.div`
  margin-top: 1.5rem;
  position: fixed;
  background: #fff;
  right: 1.5rem;
  padding: 15px;
  bottom: 11.3rem;
  z-index: 20;

  .active {
    color: var(--primary);
  }

  &:before {
    content: "";
    position: absolute;
    bottom: -15px;
    right: 0.7rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 15px 15px;
    transform: rotate(180deg);
    border-color: transparent transparent #ffffff transparent;
  }

  ul li {
    margin: 1rem 0;
    text-align: left;

    &:last-child {
      margin-bottom: 0;
    }

    a,
    button {
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      justify-content: start;

      &:hover {
        color: var(--primary);
      }

      .box-img {
        width: 35px;
        text-align: left;

        svg {
          width: 30px;
        }
      }
    }
  }

  @media ${device.tablet} {
    position: initial;
    background: none;
    padding: 0;
    margin-top: 0;

    &:before {
      display: none;
    }
  }
`;

export const ButtonMenu = styled.button`
  position: fixed;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background: var(--primary);
  right: 1.5rem;
  bottom: 7rem;
  z-index: 20;

  div {
    background: #fff;
    margin: 5px auto;
    width: 6px;
    height: 6px;
    border-radius: 100%;
  }

  @media ${device.tablet} {
    display: none;
  }
`;
