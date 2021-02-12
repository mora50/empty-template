import api from "@services/api";
import notification from "@utils/notification";
import { createContext, FC, useContext, useState } from "react";

interface ICart {
  items: Items[];
  formated_sub_total?: string;
  items_count: number;
  sellers?: {
    name: string;
    sellerId: number;
    items: Items[];
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
  changeCartLoading: Boolean;
  handleCart: () => Promise<void>;
  removeCart: () => Promise<void>;
  addItemCart: (item: IAddcart) => Promise<void>;
  clearCart: () => Promise<void>;
  removeItemCart: (id: number) => Promise<void>;

  updataQuantity: (qty: Qty) => Promise<void>;
}

const CartContext = createContext(null);

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<ICart>();
  const [loading, setLoading] = useState<boolean>(true);
  const [changeCartLoading, setChangeCartLoading] = useState<boolean>();

  const handleCart = async () => {
    setLoading(true);

    try {
      const response = await api.get("/customer/checkout/cart");

      let cart: ICart = response.data.data;

      if (cart) {
        const sellers = Object.entries(cart.sellers);

        cart.items = sellers.map(([key, value]) => value.items).flat();

        cart.sellers = sellers.map(([key, value]) => ({
          ...value,
          sellerId: parseInt(key),
        }));

        setCart(cart);
      }
    } finally {
      setLoading(false);
    }
  };

  const addItemCart = async (item: IAddcart) => {
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
  };

  async function removeItemCart(id: number) {
    setChangeCartLoading(true);
    try {
      await api.get(`/customer/checkout/cart/remove-item/${id}`);
      handleCart();
    } finally {
      setChangeCartLoading(false);
    }
  }

  async function updataQuantity(data: Qty) {
    setLoading(true);
    try {
      await api.put(`/customer/checkout/cart/update`, data);

      handleCart();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    setLoading(true);
    try {
      await api.get(`/customer/checkout/cart/empty`);

      setCart(null);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    cart,
    loading,
    changeCartLoading,
    addItemCart,
    removeItemCart,
    handleCart,
    updataQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext<State>(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
