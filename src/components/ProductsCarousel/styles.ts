import styled from "styled-components";
import { device } from "../../styles/components";

export const SliderWrapper = styled.div`
  .slick-list {
    padding: 0 20% 0 0 !important;
  }

  @media ${device.tablet} {
    .slick-list {
      padding: 0 !important;
    }
  }
`;
