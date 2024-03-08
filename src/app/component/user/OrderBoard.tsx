"use client";
import React, { useState } from "react";
import OrderNav from "./OrderNav";
import OrderList from "./OrderList";

type Props = {};

function OrderBoard({}: Props) {
  const [order, setOrder] = useState<string>("all");
  const [searchKey, setSearchKey] = useState<string>("");

  return (
    <div>
      <OrderNav setOrder={setOrder} setSearchKey={setSearchKey} />
      <OrderList typeOrder={order} searchKey={searchKey} />
    </div>
  );
}

export default OrderBoard;
