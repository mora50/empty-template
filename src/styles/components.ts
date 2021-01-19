import styled, { css } from "styled-components";

interface ILoadingSpinner {
  size: number;
  barSize: number;
}

interface ICallActions {
  bgColor?: string;
  minHeight?: number;
  fontSize?: number;
  flexCenter?: boolean;
}

const size = {
  mobile: "375px",
  tablet: "767px",
  laptop: "970px",
  laptopL: "1170px",
  desktop: "2560px",
};

export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const Container = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media ${device.tablet} {
    max-width: 750px;
  }
  @media ${device.laptop} {
    max-width: 970px;
  }
  @media ${device.laptopL} {
    max-width: 1170px;
  }
`;

export const LoadingSpinner = styled.div<ILoadingSpinner>`
  border: ${(props) => props.barSize}px solid var(--primary);
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  border-top: ${(props) => props.barSize}px solid #ccc;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const FormStyled = styled.form<{ disabled?: boolean }>`
  /*   label {
    padding-bottom: 1rem;
  } */
  transition: 0.3s;

  input,
  select,
  textarea {
    padding: 10px 15px;
    border: 1px solid #ccc;

    width: 100%;
    border-radius: 7px;
    background: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    -webkit-box-shadow: 2px 0px 10px 2px rgba(0, 0, 0, 0.02);
    -moz-box-shadow: 2px 0px 10px 2px rgba(0, 0, 0, 0.02);
    box-shadow: 2px 0px 10px 2px rgba(0, 0, 0, 0.02);
    transition: 0.4s;

    &:focus {
      border-color: var(--primary);
    }
  }

  label div {
    margin-top: 1rem;

    margin-bottom: 10px;
    span {
      color: var(--red);
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.6;
    `};

  /* input,
  select,
  text {
    border-radius: ${(props) => props.theme.borders.borderRadius};
    color: #000;
    -webkit-appearance: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 0.7rem 1rem;
    width: 100%;
    margin: 0.5rem 0 0.7rem 0;
  } */
`;

export const Alert = styled.div`
  border: 1px solid #e02424;
  padding: 4px 0.7rem;
  border-radius: 7px;
  background-color: #fbd5d5;
`;

export const Button = styled.button<ICallActions>`
  border-radius: 10px;
  align-items: center;
  padding: 4px 0.7rem;
  color: #fff;
  transition: 0.2s;
  min-height: 35px;

  &:hover {
    filter: brightness(110%);
  }

  svg {
    width: 30px;
    margin-right: 7px;
  }

  ${(props) =>
    props.flexCenter &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `};

  ${(props) =>
    props.minHeight &&
    css`
      min-height: ${props.minHeight}px;
    `};

  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}px;
    `};

  ${(props) =>
    props.bgColor &&
    css`
      background: var(--${props.bgColor});
    `};
`;

export const LinkStyled = styled.a<ICallActions>`
  border-radius: 10px;
  align-items: center;
  padding: 4px 0.7rem;
  color: #fff;
  transition: 0.2s;

  &:hover {
    filter: brightness(110%);
  }

  svg {
    width: 30px;
    margin-right: 7px;
  }

  ${(props) =>
    props.minHeight &&
    css`
      min-height: ${props.minHeight}px;
    `};

  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}px;
    `};

  ${(props) =>
    props.bgColor &&
    css`
      background: var(--${props.bgColor});
    `};
`;
