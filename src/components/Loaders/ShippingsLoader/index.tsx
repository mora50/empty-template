import { FC } from "react";
import ContentLoader from "react-content-loader";

// import { Container } from './styles';

const ShippingsLoader: FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={168}
      height={106}
      viewBox="0 0 168 106"
      backgroundColor="#fafafa"
      foregroundColor="#E0E0E0"
      radius="50%"
      style={{ borderRadius: "7px" }}
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="168" height="106" />
    </ContentLoader>
  );
};

export default ShippingsLoader;
