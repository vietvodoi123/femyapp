"use client";
import { Table } from "antd";
import React from "react";
import Image from "next/image";
import { transformMoney } from "@/utils/function/transformMoney";

type Props = {
  cartItems: CartItem[];
};

function TableProduct({ cartItems }: Props) {
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (item: { id?: string; name: string; imageUrl: string[] }) => {
        return (
          <div className=" flex justify-start items-center gap-5 ">
            <Image
              src={item.imageUrl[0]}
              width={100}
              height={100}
              alt={item.name}
            />
            <p className=" text-sm font-medium text-gray-700 w-[400px]">
              {item.name}
            </p>
          </div>
        );
      },
      with: 700,
    },

    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => {
        return (
          <p className=" font-medium text-gray-500">đ{transformMoney(price)}</p>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, item: CartItem) => {
        return <p>{quantity}</p>;
      },
    },
    {
      title: "Thành tiên",
      dataIndex: "totals",
      key: "totals",
      render: (totals: number) => {
        return <span className=" text-red-500 font-medium">đ{totals}</span>;
      },
    },
  ];
  return <Table pagination={false} dataSource={cartItems} columns={columns} />;
}

export default TableProduct;
