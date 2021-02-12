import Image from "next/image";
import { FC } from "react";

interface IProduct {
  name?: string;
  price?: string;
  image?: string;
}

import * as S from "./style";

export const ProductBox: FC<IProduct> = ({ name, price, image }) => {
  return (
    <S.ProdutoWrapper>
      <S.ImageWrapper>
        <Image width={100} height={100} src={image} alt={name} />
      </S.ImageWrapper>

      <div>
        <p className="productName">{name}</p>
      </div>

      <div className="box-price">
        <div className="price">
          {price ? (
            <>
              <small>A partir de:</small>

              <strong>{price && price}</strong>
            </>
          ) : (
            <span className="font-weight-bold">Não disponível</span>
          )}
        </div>
      </div>
    </S.ProdutoWrapper>
  );
};

export default ProductBox;
