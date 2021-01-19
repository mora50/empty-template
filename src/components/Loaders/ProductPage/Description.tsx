import React from "react";
import ContentLoader from "react-content-loader";

interface Props {
  className?: string;
}

const Description = (props: Props) => (
  <>
    <ContentLoader
      speed={2}
      width={410}
      height={15}
      viewBox="0 0 410 15"
      backgroundColor="#fafafa"
      foregroundColor="#E0E0E0"
      style={{ width: "100%" }}
      {...props}
      className="mb-5"
    >
      <rect x="0" y="0" rx="3" ry="3" width="300" height="15" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width={410}
      height={42}
      viewBox="0 0 410 42"
      backgroundColor="#fafafa"
      foregroundColor="#E0E0E0"
      style={{ width: "100%" }}
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="17" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="34" rx="3" ry="3" width="178" height="6" />
    </ContentLoader>
  </>
);

export default Description;
