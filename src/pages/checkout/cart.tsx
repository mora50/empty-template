import Image from "next/image";
import { useForm } from "react-hook-form";
import { useCart } from "src/contexts/cartContext";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Minus } from "@styled-icons/boxicons-regular/Minus";
import { useEffect, useState } from "react";
import LoadingAllScreen from "@components/LoadingAllScreen";
import useDebounce from "@hooks/useDebounce";
import CheckoutLayout from "@components/CheckoutLayout";
import { Button } from "@styles/components";
import cn from "classnames";

interface IQuantity {
  sku: string;
  id: number;
  stock: string;
}

export default function Cart() {
  const [deleteEffect, setDeleteEffect] = useState<number>();

  const {
    cart,
    loading,
    updataQuantity,
    clearCart,
    removeItemCart,
  } = useCart();
  const { setValue, register, getValues } = useForm();

  const debounceUpdate = useDebounce(updataQuantity, 500);

  const removeItem = async (id: number) => {
    setDeleteEffect(id);

    await removeItemCart(id);
  };

  const changeQuantity = async (
    method: "add" | "remove",
    product: IQuantity,
    sellerId: number
  ) => {
    const { sku, id } = product;

    const inputName = sku + sellerId;
    const stock = parseInt(product.stock) as number;

    let singleValue = parseInt(getValues(inputName));

    singleValue = method === "add" ? singleValue + 1 : singleValue - 1;

    if (singleValue < 1 || stock < singleValue) {
      return;
    }

    setValue(inputName, singleValue);

    const qty = { [id]: singleValue };

    return debounceUpdate({ qty });
  };

  return (
    <>
      {loading && <LoadingAllScreen />}

      {cart?.sellers.map((seller) => (
        <div
          key={seller.sellerId}
          className="grid grid-cols-12 animated fadeIn"
        >
          <div className=" col-span-full">
            <div key={seller.sellerId} className="lg:pb-4 animated ease-out">
              <div className="text-sm  pt-4 text-gray-500">
                <h3>
                  Vendido por: <span className="font-bold">{seller.name}</span>
                </h3>
              </div>

              <div className="divide-y">
                {seller.items.map((item) => (
                  <div
                    key={item.id}
                    className={cn("", {
                      "fadeInDown animated ease-out ": deleteEffect === item.id,
                    })}
                  >
                    <div className="grid relative   items-center grid-cols-12  gap-x-4 lg:my-2 mt-7 mb-5 bg-white p-3   rounded-md">
                      <div className="lg:col-span-5 col-span-full flex items-center mb-4 lg:mb-0">
                        <div className="table w-20">
                          <Image
                            width={100}
                            height={100}
                            src={
                              item.product.images
                                ? item.product.images[0].url
                                : null
                            }
                          />
                        </div>
                        <a
                          href={`/product/${item.product.url_key}`}
                          className="ml-4 text-sm"
                          target="_new"
                        >
                          {item.name} <br />
                          <span className="truncate table-cell text-gray-500">
                            <small>Cód do produto: {item.sku}</small>
                          </span>
                        </a>
                      </div>

                      <div className="lg:col-span-4 col-span-6  ">
                        <div className="text-gray-700 font-bold text-2xl flex lg:justify-center items-center ">
                          <button
                            className="bg-gray-200 flex items-center justify-center  w-6 h-6 rounded-full"
                            onClick={() =>
                              changeQuantity("add", item, seller.sellerId)
                            }
                          >
                            +
                          </button>
                          <input
                            className="w-8 lg:mr-2  text-sm text-center mx-1"
                            defaultValue={item.quantity}
                            name={item.sku + seller.sellerId}
                            ref={register}
                            readOnly
                            type="numeric"
                          />
                          <button
                            onClick={() =>
                              changeQuantity("remove", item, seller.sellerId)
                            }
                            className="bg-gray-200 flex items-center justify-center  w-6 h-6  rounded-full"
                          >
                            <Minus width={25} />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        {item.formated_price}
                      </div>

                      <div className="col-span-1 text-right  -top-3 right-0 absolute lg:relative lg:top-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="bg-gray-200 rounded-full"
                        >
                          <CloseOutline width={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="text-right mb-4">
        <Button onClick={clearCart} className="font-bold" bgColor="red">
          Limpar carrinho
        </Button>
      </div>
    </>
  );
}

Cart.CheckoutLayout = CheckoutLayout;
