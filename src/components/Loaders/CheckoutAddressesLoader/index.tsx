import { FC } from "react";
import ContentLoader from "react-content-loader";

const CheckoutAddressesLoader: FC = (props) => (
  <div className="flex items-center justify-between md:justify-start">
    <div>
      <ContentLoader
        speed={2}
        width={133}
        height={80}
        viewBox="0 0 133 80"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ width: "100%" }}
        {...props}
      >
        <rect x="0" y="20" rx="5" ry="5" width="133" height="16" />
        <rect x="0" y="40" rx="5" ry="5" width="133" height="16" />
        <rect x="0" y="0" rx="5" ry="5" width="133" height="16" />
        <rect x="0" y="60" rx="5" ry="5" width="133" height="16" />
      </ContentLoader>
    </div>

    <div className="md:ml-10 text-xs md:text-sm">
      <ContentLoader
        speed={2}
        width={125}
        height={35}
        viewBox="0 0 125 35"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ width: "100%" }}
        {...props}
      >
        <rect x="0" y="0" rx="10" ry="10" width="125" height="35" />
      </ContentLoader>
    </div>
  </div>
);

export default CheckoutAddressesLoader;
