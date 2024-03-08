"use client";
import React, { useState } from "react";
import { IRootState } from "../store/store";
import { useSelector } from "react-redux";
import HeaderCheckout from "./checkout/HeaderCheckout";
import CheckoutItem from "./checkout/CheckoutItem";
import Payment from "./checkout/Payment";
type Props = {};

function MainCheckout({}: Props) {
  const items = useSelector((state: IRootState) => state.cart.checkout);
  const [address, setAddres] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [listBills, setListBills] = useState();
  const checkoutElements = Object.entries(items).map(([shopId, cartItems]) => (
    <CheckoutItem shopId={shopId} cartItems={cartItems.cart} />
  ));
  return (
    <main className=" w-[1280px] mx-auto ">
      <HeaderCheckout setAddress={setAddres} setPhone={setPhone} />
      {checkoutElements}
      <Payment address={address} phone={phone} />
    </main>
  );
}

export default MainCheckout;
