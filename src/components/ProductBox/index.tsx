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
        <picture>
          <img src={image} alt={name} />
        </picture>
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
