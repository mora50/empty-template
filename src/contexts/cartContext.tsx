import api from "@services/api";
import notification from "@utils/notification";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IAddresses } from "src/pages/profile/addresses";

export interface ICart {
  formated_sub_total?: string;
  formated_grand_total: string;
  formated_shipping_total: string;
  items: Items[];
  items_count: number;
  shipping_address: IAddresses;
  sellers?: {
    items: Items[];
    name: string;
    sellerId: number;
  }[];
}

export interface Items {
  name: string;
  formated_price: string;
  id: number;
  quantity: number;
  sku: string;
  stock: number & string;
  product: {
    url_key: string;
    images: [
      {
        url: string;
      }
    ];
  };
}

interface IAddcart {
  productId: number;
  sellerId: number;
  offerId: number;
  quantity: number;
}

type QtyType = { [key: string]: number };

type Qty = { qty: QtyType };

interface State {
  loading: boolean;
  cart: ICart;
  changeCartLoading: boolean;
  handleCart: () => Promise<void>;
  removeCart: () => Promise<void>;
  addItemCart: (item: IAddcart) => Promise<void>;
  clearCart: () => Promise<void>;
  removeItemCart: (id: number) => Promise<void>;
  setCart: Dispatch<SetStateAction<ICart>>;
  updataQuantity: (qty: Qty) => Promise<void>;
}

const CartContext = createContext(null);

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<ICart>();
  const [loading, setLoading] = useState<boolean>(true);
  const [changeCartLoading, setChangeCartLoading] = useState<boolean>();

  const organizeCart = (cart: ICart) => {
    const sellers = Object.entries(cart.sellers);

    cart.items = sellers.map(([key, value]) => value.items).flat();

    cart.sellers = sellers.map(([key, value]) => ({
      ...value,
      sellerId: parseInt(key),
    }));

    return cart;
  };

  const handleCart = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get("/customer/checkout/cart");

      let cart: ICart = response.data.data;

      if (cart) {
        cart = organizeCart(cart);

        setCart(cart);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addItemCart = useCallback(
    async (item: IAddcart) => {
      const { productId, sellerId, offerId, quantity } = item;

      const data = {
        product: productId,
        quantity: quantity,
        seller_info: {
          seller_id: sellerId,
          offer: offerId,
        },
      };

      setChangeCartLoading(true);
      try {
        await api.post("/customer/checkout/cart/add", data);
        handleCart();
        notification("Produto adicionado ao carrinho!", "success");
      } catch (err) {
      } finally {
        setChangeCartLoading(false);
      }
    },
    [handleCart]
  );

  const removeItemCart = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await api.get(`/customer/checkout/cart/remove-item/${id}`);
        handleCart();
      } finally {
        setLoading(false);
      }
    },
    [handleCart]
  );

  const updataQuantity = useCallback(async (data: Qty) => {
    setLoading(true);
    try {
      const response = await api.put(`/customer/checkout/cart/update`, data);

      let cart: ICart = response.data.data;

      if (cart) {
        cart = organizeCart(cart);

        setCart(cart);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = async () => {
    setLoading(true);
    try {
      await api.get(`/customer/checkout/cart/empty`);

      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      cart,
      loading,
      changeCartLoading,
      addItemCart,
      removeItemCart,
      handleCart,
      updataQuantity,
      clearCart,
      setCart,
    }),
    [
      cart,
      loading,
      changeCartLoading,
      addItemCart,
      removeItemCart,
      handleCart,
      updataQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext<State>(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
