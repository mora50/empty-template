import { FC } from "react";
import ContentLoader from "react-content-loader";

// import { Container } from './styles';

const CartBoxLoader: FC = (props) => {
  return (
    <div className="grid pt-2 pb-1  items-center gap-3 grid-cols-12 ">
      <div className="col-span-3 flex">
        <ContentLoader
          speed={2}
          width={100}
          height={58}
          viewBox="0 0 100 100"
          backgroundColor="#fafafa"
          foregroundColor="#E0E0E0"
          {...props}
        >
          <rect x="0" y="0" rx="0" ry="0" width="100" height="100" />
        </ContentLoader>
      </div>

      <div className="col-span-9">
        <div className="product-name">
          {" "}
          <ContentLoader
            speed={2}
            width={197}
            height={24}
            viewBox="0 0 197 24"
            backgroundColor="#fafafa"
            foregroundColor="#E0E0E0"
            {...props}
            style={{ width: "100%" }}
          >
            <rect x="0" y="0" rx="0" ry="0" width="197" height="24" />
          </ContentLoader>
        </div>

        <div className="flex justify-between mt-2 text-sm">
          <div className="col-span-6 text-xs text-gray-500">
            {" "}
            <ContentLoader
              speed={2}
              width={80}
              height={15}
              viewBox="0 0 80 15"
              backgroundColor="#fafafa"
              foregroundColor="#E0E0E0"
              {...props}
              style={{ width: "100%" }}
            >
              <rect x="0" y="0" rx="0" ry="0" width="80" height="15" />
            </ContentLoader>
            {/*  Quantidade: {item.quantity} */}
          </div>

          <div className="col-span-6">
            {" "}
            <ContentLoader
              speed={2}
              width={70}
              height={15}
              viewBox="0 0 70 15"
              backgroundColor="#fafafa"
              foregroundColor="#E0E0E0"
              {...props}
              style={{ width: "100%" }}
            >
              <rect x="0" y="0" rx="0" ry="0" width="70" height="15" />
            </ContentLoader>
            {/* {item.formated_price} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBoxLoader;
