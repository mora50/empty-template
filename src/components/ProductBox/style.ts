import styled from "styled-components";

export const ProdutoWrapper = styled.div`
  background-color: #fff;
  display: flex;
  border-radius: 10px;

  padding: 0 1rem;
  color: #042a68;
  font-weight: 300;
  min-height: 320px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 1rem;
  text-align: center;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);

  .box-price {
    padding-bottom: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr repeat(2, auto) 1fr;
    align-items: center;

    .price {
      grid-column-start: 3;
      font-size: 18px;
    }
  }

  .productName {
    margin: 1rem 0 0.5rem;
  }

  small {
    color: #333;
    display: block;
  }

  strong {
    font-weight: 700;
    color: #08a82b;
    font-size: 16px;
  }

  .productName {
    min-height: 37px;
    display: block;
  }
`;

export const ImageWrapper = styled.div`
  padding: 17px 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 152px;

  /*   img {
    max-width: 102px;
    max-height: 152px;
    display: block;
  } */
`;

export const imagemWrapper = styled.div`
  width: 100%;
  height: 160px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
  margin-bottom: 10px;
`;

export const categoryWrapper = styled.div`
  display: flex;
  justify-content: center;

  abbr {
    font-style: italic;
    font-weight: 100;
  }
  img {
    margin: 3px 0.5rem;
    width: 17px;
  }
`;
