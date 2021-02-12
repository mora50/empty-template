import styled from "styled-components";
import { device } from "@styles/components";

export const ProgressCircle = styled.span<{ progress?: number }>`
  position: relative;

  .content {
    position: absolute;
    text-align: center;
    font-weight: bold;
    color: var(--gray);
    font-size: 12px;

    svg {
      width: 30px;
      color: var(--primary);
    }
  }

  .svg {
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
  }

  .svg-circle-bg {
    fill: none;
  }

  .svg-circle {
    fill: #fff;
    box-shadow: 5px 10px #888888;

    background: #fff;
  }

  @media ${device.tablet} {
    .content {
      font-size: 16px;

      svg {
        width: 40px;
        max-height: 40px;
        color: var(--primary);
      }
    }
  } ;
`;
