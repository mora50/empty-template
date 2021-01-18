import styled from "styled-components";

export const CartWrapper = styled.div`
  background: #fff;
  z-index: 100;
  width: 350px;
  float: right;
  margin-top: 4rem;
  border-radius: 15px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.15);
  padding: 0.7rem;

  .product-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
`;
