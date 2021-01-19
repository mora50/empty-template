import styled, { css } from "styled-components";

export const BarWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  background: #cccccc;
  height: 3px;
  align-items: center;
`;

export const Bar = styled.div<{ width: string }>`
  height: 3px;
  background: #000;
  width: ${({ width }) => width}%;
`;

interface IPointStatus {
  color?: string;
}

export const PointStatus = styled.div<IPointStatus>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #cccccc;

  ${({ color }) =>
    color &&
    css`
      background: ${color};
    `}
`;
