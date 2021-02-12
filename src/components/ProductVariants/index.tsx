import { useQuery } from "@apollo/client";
import VariantsLoading from "@components/Loaders/ProductPage/VariantsLoading";

import { useRouter } from "next/router";

import { GET_PRODUCT_VARIANTS } from "src/graphql/getProductVariants";
import { Variant } from "./styles";

interface IVariants {
  variants: [
    {
      id: number;
      name: string;
      url_key: string;
      images: [
        {
          path: string;
        }
      ];
    }
  ];
}

function ProductVariants({ parentId }: { parentId: string }) {
  const router = useRouter();

  const { data, loading, error } = useQuery<IVariants>(GET_PRODUCT_VARIANTS, {
    variables: {
      id: parseInt(parentId),
      data: "[]",
      postcode: "null",
    },
  });

  const changeVariant = (url: string) => {
    router.push(`/product/${url}`);
  };

  return (
    <>
      <div className="mt-3  ">
        {loading ? (
          <VariantsLoading />
        ) : error ? (
          <div>Ocorreu um erro ao carregar as variantes do produto </div>
        ) : (
          data.variants.length > 1 && (
            <>
              <Variant>
                <div className="font-bold mb-2">Opções:</div>
                <select
                  defaultValue={router.query.slug}
                  onChange={(e) => changeVariant(e.target.value)}
                >
                  {data.variants.map((variant) => (
                    <option key={variant.id} value={variant.url_key}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </Variant>
            </>
          )
        )}
      </div>
    </>
  );
}

export default ProductVariants;
