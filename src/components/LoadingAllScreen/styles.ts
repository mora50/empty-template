import styled from "styled-components";

export const WrapperLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 99999;
`;

export const BackDrop = styled.div`
  z-index: 5;
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const LoadingAnimatted = styled.div`
  margin-top: 4rem;
  z-index: 10;
  width: 60px;
  height: 40px;
  border-radius: 5px;
  padding: 1rem;
  align-items: center;
  display: flex;
  justify-content: center;

  .infinity-path {
    --size: 30;
    --speed: 0.65;
    height: calc(var(--size) * 1px);
    position: relative;
    width: calc(var(--size) * 1px);

    & > div {
      height: calc(var(--size) * 1px);
      width: calc(var(--size) * 1px);
      border-radius: 100%;
      border: calc(var(--size) / 4 * 1px) solid rgba(255, 255, 255, 0.9);
      position: absolute;
      top: 0;
      left: 0;
      animation-duration: calc(var(--speed) * 1s);
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-name: infinity-spin;
      transform: translate(calc(var(--translate) * 1%), 0)
        translate(calc(var(--translate-2) * 1px), 0);

      &:before {
        content: "";
        height: calc(var(--size) / 4 * 1px);
        width: calc(var(--size) / 4 * 1px);
        border-radius: 100%;
        background: var(--primary);
        position: absolute;
        top: 50%;
        animation: infinity-vanish calc(var(--speed) * 2s) infinite reverse
          steps(1);
        transform: translate(
          calc(var(--translate-2) * 2px),
          calc(var(--translate) * 1%)
        );
      }
    }

    & > div:nth-of-type(1) {
      --translate: -50;
      --translate-2: calc(var(--size) / 8);
      &:before {
        right: 0;
      }
    }

    & > div:nth-of-type(2) {
      --translate: 50;
      --translate-2: calc(var(--size) / 8 * -1);
      animation-delay: calc(var(--speed) * 1s);
      animation-direction: reverse;

      &:before {
        left: 0;
        transform: translate(calc(var(--size) / 4 * -1px), -50%);
        animation-direction: normal;
      }
    }
  }

  @keyframes infinity-vanish {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes infinity-spin {
    from {
      transform: translate(calc(var(--translate) * 1%), 0)
        translate(calc(var(--translate-2) * 1px), 0) rotate(0deg);
    }
    to {
      transform: translate(calc(var(--translate) * 1%), 0)
        translate(calc(var(--translate-2) * 1px), 0) rotate(360deg);
    }
  }
`;
