import React from "react";
import ContentLoader from "react-content-loader";

interface Props {
  className?: string;
}

const VariantsLoading = (props: Props) => (
  <>
    <ContentLoader
      speed={2}
      width={58}
      height={24}
      viewBox="0 0 58 24"
      backgroundColor="#fafafa"
      foregroundColor="#E0E0E0"
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="58" height="24" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width={400}
      height={39}
      viewBox="0 0 400 39"
      backgroundColor="#fafafa"
      foregroundColor="#E0E0E0"
      {...props}
      style={{ width: "100%" }}
    >
      <rect x="0" y="0" rx="3" ry="3" width="400" height="39" />
    </ContentLoader>
  </>
);

export default VariantsLoading;
