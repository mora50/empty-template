import React from "react";
import { BackDrop, LoadingAnimatted, WrapperLoading } from "./styles";

// import { Container } from './styles';

const LoadingAllScreen: React.FC = () => {
  return (
    <WrapperLoading>
      <BackDrop />

      <LoadingAnimatted>
        <div className="infinity-path">
          <div></div>
          <div></div>
        </div>
      </LoadingAnimatted>
    </WrapperLoading>
  );
};

export default LoadingAllScreen;
