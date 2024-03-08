export const calcPrice = (cartItems: CartItem[], shipfee: number) => {
  return (
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    shipfee
  );
};
