import styled, { css } from "styled-components";

export const WrapperOrder: any = styled.div.attrs<{ statusColor: any }>(
  (props) => ({
    style: {
      borderLeftColor: `var(--${props.statusColor})`,
    },
  })
)<{ statusColor: string }>`
  background: #fff;
  border: 5px solid #fff;
  padding: 1rem;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.04);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.04);

  span {
    ${(props) =>
      props.statusColor &&
      css`
        color: var(--${props.statusColor});
      `}
  }
`;
