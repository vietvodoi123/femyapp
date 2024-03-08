"use client";
import { CartApi } from "@/api/CartFetcher";
import { IRootState } from "@/app/store/store";
import { Button, Checkbox, InputNumber, Table, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { totalInit } from "./MainCart";
import { transformMoney } from "@/utils/function/transformMoney";

type Props = {
  setTotal: (total: ITotal) => void;
};

function Cart({ setTotal }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>();
  const [reload, setReload] = useState<number>(1);
  const [listItems, setListItems] = useState<CartItem[] | undefined>();
  const route = useRouter();
  const user_id = useSelector(
    (state: IRootState) => state.user.userCurrent?.id
  );

  useEffect(() => {
    setLoading(true);
    if (user_id) {
      CartApi.getCartItems(user_id)
        .then((d: ICart) => {
          const arr = d.data.map((item): CartItem => {
            return {
              key: item._id,
              name: {
                id: item._id,
                name: item.name,
                imageUrl: item.imageUrl,
              },
              shop: {
                id: item.shop.id,
                name: item.shop.name,
              },
              price: item.price,
              quantity: item.quantity,
              totals: item.price * item.quantity,
              category: item.category,
            };
          });

          setListItems(arr);
        })
        .catch((e) => message.error(e));
    } else {
      route.push("/login");
    }
    setLoading(false);
  }, [reload]);

  useEffect(() => {
    if (selectedItems?.length && selectedItems.length !== 0) {
      const price = selectedItems.reduce(
        (s, item) => s + item.price * item.quantity,
        0
      );
      setTotal({
        total: selectedItems.length,
        totalPrice: price,
        items: selectedItems,
      });
    } else {
      setTotal(totalInit);
    }
  }, [selectedItems]);

  const handleQuantityChange = (value: number | null, item: CartItem) => {
    if (!value) return;

    const updatedListItems = listItems?.map((listItem) => {
      if (listItem.name.id === item.name.id) {
        return {
          ...listItem,
          quantity: value,
          totals: value * listItem.price,
        };
      }
      return listItem;
    });
    if (user_id && item.name.id) {
      CartApi.updateItemInCart(user_id, item.name.id, value)
        .then((d: Message) => message.success(d.message))
        .catch((e) => message.error(e));
    } else {
      message.error("Có lỗi xảy ra!");
    }
    setListItems(updatedListItems);
  };

  const handleDelete = (item: CartItem) => {
    setLoading(true);
    if (item.name.id && user_id) {
      CartApi.deleteItemInCart(user_id, item.name.id)
        .then((d: Message) => {
          message.success(d.message);
          setReload(reload + 1);
        })
        .catch((e) => message.error(e));
    }
    setLoading(false);
  };
  const columns = [
    {
      title: <p>Sản phẩm</p>,
      dataIndex: "name",
      key: "name",
      render: (item: { id?: string; name: string; imageUrl: string[] }) => {
        return (
          <Link
            className=" flex justify-start items-center gap-5 max-w-[500px]"
            href={`/product/${item.id}`}
          >
            <Image
              src={item.imageUrl[0]}
              width={100}
              height={100}
              alt={item.name}
            />
            <p className=" text-sm font-medium text-gray-700">{item.name}</p>
          </Link>
        );
      },
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
      render: (shop: { id: string; name: string }) => {
        return (
          <Link href="/" className="text-sm font-medium text-gray-700">
            {shop.name}
          </Link>
        );
      },
    },
    {
      title: <p>Đơn giá</p>,
      dataIndex: "price",
      key: "price",
      render: (price: number) => {
        return (
          <p className=" font-medium text-gray-500">{transformMoney(price)}</p>
        );
      },
    },
    {
      title: <p>Số lượng</p>,
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, item: CartItem) => {
        return (
          <InputNumber
            min={1}
            value={quantity}
            onChange={(e) => handleQuantityChange(e, item)}
          />
        );
      },
    },
    {
      title: <p>Số tiên</p>,
      dataIndex: "totals",
      key: "totals",
      render: (totals: number) => {
        return (
          <span className=" text-red-500 font-medium">
            đ{transformMoney(totals)}
          </span>
        );
      },
    },
    {
      title: <p className=" text-center">Thao tác</p>,

      dataIndex: "category",
      key: "category",
      render: (category: string, item: CartItem) => {
        return (
          <div className=" flex flex-col items-center justify-between ">
            <Button
              type="text"
              className=" w-20  text-gray-500 text-xs"
              size="small"
              onClick={() => handleDelete(item)}
            >
              Xóa
            </Button>
            <Button
              type="text"
              className=" w-20 text-xs  text-wrap whitespace-pre-wrap text-center text-blue-500"
              size="small"
              onClick={() => route.push(`/${category}`)}
            >
              Sản phẩm tương tự
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <main className=" bg-white w-[1280px] mx-auto p-5 my-5">
      <Table
        dataSource={listItems}
        loading={loading}
        columns={columns}
        pagination={false}
        rowSelection={{
          onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: CartItem[]
          ) => {
            setSelectedItems(selectedRows);
          },
        }}
      />
    </main>
  );
}

export default Cart;
