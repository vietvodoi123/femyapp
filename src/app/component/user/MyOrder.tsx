"use client";
import React, { useState } from "react";
import OrderNav from "./OrderNav";
import OrderList from "./OrderList";

type Props = {};

function MyOrder({}: Props) {
  const [typeOrder, setTypeOrder] = useState<string>("all");
  const [searchKey, setSearchKey] = useState<string>("");
  return (
    <main>
      <OrderNav setOrder={setTypeOrder} setSearchKey={setSearchKey} />
      <OrderList typeOrder={typeOrder} searchKey={searchKey} />
    </main>
  );
}

export default MyOrder;
