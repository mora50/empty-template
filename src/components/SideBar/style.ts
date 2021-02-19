import styled from "styled-components";

import { ColorPalette } from "@styled-icons/evaicons-solid/ColorPalette";
import { ChevronRight } from "@styled-icons/boxicons-solid/ChevronRight";

export const iconColor = styled(ColorPalette)`
  color: #ffffff;
  height: 18px;
  width: 18px;
  display: inline-block;
  margin-right: 10px;
`;

export const iconRight = styled(ChevronRight)`
  color: #707070;
  height: 20px;
  width: 20px;
`;

export const Close = styled.button`
  background: none;
  color: var(--gray);
  position: absolute;
  width: 20px;
  right: 0.7rem;
  top: 0.5rem;
`;

export const menuWrapper = styled.div`
  background-color: #fff;
  width: 230px;
  min-height: 100px;

  color: #042a68;
  left: 6%;
  position: relative;
  z-index: 100;
  font-weight: 700;
  top: 3.7rem;
  border-radius: 15px;

  h3 {
    font-size: 15px;
    margin-bottom: 0;
    padding: 15px;
  }

  ul {
    list-style: none;

    padding-bottom: 1px;

    li {
      font-size: 14px;

      a {
        display: flex;
        justify-content: space-between;
        color: #707070;
        align-items: center;
        padding: 1rem 1rem;

        &:hover {
          background: #ccc;
        }
      }

      &:last-child {
        a {
          &:hover {
            border-radius: 0px 0px 15px 15px;
          }
        }
      }
    }
  }
`;
