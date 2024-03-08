"use client";
import React, { useState } from "react";
import Cart from "./Cart";
import TotalCart from "./TotalCart";

export const totalInit: ITotal = {
  total: 0,
  totalPrice: 0,
  items: [],
};

function MainCart() {
  const [total, setTotal] = useState<ITotal>(totalInit);
  return (
    <div>
      <Cart setTotal={setTotal} />
      <TotalCart total={total} />
    </div>
  );
}

export default MainCart;
