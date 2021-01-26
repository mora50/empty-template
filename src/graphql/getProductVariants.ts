import { gql } from "@apollo/client";

export const GET_PRODUCT_VARIANTS = gql`
  query GetProduct($id: Int!, $data: String) {
    variants(id: $id, data: $data) {
      name
      id
      product_id
      url_key
      images {
        path
        id
      }
    }
  }
`;
