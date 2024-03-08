import axiosClient from "./Fetcher";

interface AddCart {
  user_id: string;
  product_id: string;
  quantity: number;
}

export const CartApi = {
  addItemToCart(props: AddCart): Promise<Message> {
    return axiosClient.post(`/carts`, props);
  },
  getCartItems(user_id: string): Promise<ICart> {
    return axiosClient.get(`/carts/${user_id}`);
  },
  deleteItemInCart(user_id: string, item_id: string): Promise<Message> {
    return axiosClient.delete(`/carts/${user_id}/${item_id}`);
  },
  updateItemInCart(
    user_id: string,
    item_id: string,
    quantity: number
  ): Promise<Message> {
    return axiosClient.put(`/carts/${user_id}/${item_id}`, { quantity });
  },
};
