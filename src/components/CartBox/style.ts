import styled from "styled-components";

export const CartWrapper = styled.div`
  background: #fff;
  z-index: 100;
  width: 300px;
  float: right;
  margin-top: 4rem;
  border-radius: 15px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.15);

  .box {
    overflow-y: visible;
    overflow-x: hidden;
    max-height: 220px;
    padding-right: 1rem;

    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #efefef;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #9e9e9e;
      border-radius: 10px;
    }
  }

  .product-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
`;
