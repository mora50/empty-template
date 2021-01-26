import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($url_key: String!, $postcode: String) {
    children(url_key: $url_key) {
      id
      name
      description
      easy_test_url
      sku
      short_description

      images {
        path
      }
      attributes {
        json_value
        text_value
        integer_value
        value
        attribute {
          code
          admin_name
        }
      }
      offers(postcode: $postcode) {
        price
        id
        marketplace_seller_id
        company_id

        distance
        marketplace_seller {
          shop_title
        }
      }
      parent {
        id
        description
        product_id
        url_key

        attributes {
          text_value
          value

          attribute {
            code

            admin_name
          }
        }
      }
    }
  }
`;
