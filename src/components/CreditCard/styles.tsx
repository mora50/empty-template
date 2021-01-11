import { css } from "styled-components";

export const blocked = {
  fieldWrapper: {
    base: css`
      border: 0;
    `,
  },

  inputWrapper: {
    base: css`
      border: 0;
      background: transparent;
      padding: 0;
      box-shadow: none !important;
    `,
  },

  input: {
    base: css`
      background: transparent;
    `,
  },

  errorText: {
    base: css`
      display: none;
    `,
  },
};
