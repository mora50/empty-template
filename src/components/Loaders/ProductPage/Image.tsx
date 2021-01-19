import React from "react";
import ContentLoader from "react-content-loader";

interface Props {
  className?: string;
}

const Image = (props: Props) => (
  <ContentLoader
    speed={2}
    width={240}
    height={250}
    viewBox="0 0 240 250"
    backgroundColor="#fafafa"
    foregroundColor="#E0E0E0"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="240" height="250" />
  </ContentLoader>
);

export default Image;
