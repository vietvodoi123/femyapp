import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
  checkout: { [shopId: string]: { cart: CartItem[]; comment: string } };
  delivery: { type: string; name: string; id: string; price: number };
}
const initDelevery = {
  type: "Vận chuyển nhanh",
  name: "MYSHOP express",
  id: "myshop_express",
  price: 14000,
};
const initialState: CheckoutState = {
  checkout: {},
  delivery: initDelevery,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckout: (state, action: PayloadAction<CartItem[]>) => {
      // Chia mảng cartItems thành các mảng theo shop và lưu vào state
      state.checkout = action.payload.reduce((acc, currentItem) => {
        const { shop } = currentItem;
        if (!acc[shop.name]) {
          acc[shop.name] = { cart: [], comment: "" };
        }
        acc[shop.name].cart.push(currentItem);
        return acc;
      }, {} as { [shopId: string]: { cart: CartItem[]; comment: string } }); // Chỉ định kiểu cho acc
    },
    finishCheckout: (state) => {
      state.checkout = {};
      state.delivery = initDelevery;
    },
    choseDelivery: (
      state,
      action: PayloadAction<{
        name: string;
        type: string;
        id: string;
        price: number;
      }>
    ) => {
      state.delivery = action.payload;
    },
    updateComment: (
      state,
      action: PayloadAction<{ shopId: string; comment: string }>
    ) => {
      const { shopId, comment } = action.payload;
      if (state.checkout[shopId]) {
        state.checkout[shopId].comment = comment;
      }
    },
  },
});

export const { setCheckout, choseDelivery, finishCheckout, updateComment } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
