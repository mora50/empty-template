import styled from "styled-components";
import { device } from "../../styles/components";

export const Elements = styled.div`
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-left: 0.5rem;
    margin-bottom: 0;
  }

  @media ${device.laptop} {
    max-width: 28rem;
    margin: 0 auto;
    height: 85.8%;
  }
`;
