"use client";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { IoPricetagsOutline, IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import Image from "next/image";
import { transformMoney } from "@/utils/function/transformMoney";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BillApi } from "@/api/BillFetcher";
type Props = { item: IOrder };

function OrderShopItem({ item }: Props) {
  const label: { [key: string]: { message: string; render: React.ReactNode } } =
    {
      Pending: {
        message: "Chờ người bán chấp nhận đơn hàng",
        render: (
          <div className=" flex items-center gap-5">
            <Button
              onClick={() => fetcherData("Processing")}
              size="large"
              className=" bg-red-500 text-white"
            >
              Chấp nhận
            </Button>
            <Button
              onClick={() => fetcherData("Cancelled")}
              size="large"
              className=" bg-yellow-50"
            >
              Hủy
            </Button>
          </div>
        ),
      },
      Processing: {
        message: "Chờ người bán chuẩn bị hàng",
        render: (
          <div className=" flex items-center gap-5">
            <Button
              onClick={() => fetcherData("Shipped")}
              size="large"
              className=" bg-red-500 text-white"
            >
              Bắt đầu vận chuyển
            </Button>
          </div>
        ),
      },
      Shipped: {
        message: "Đơn hàng đang được vận chuyển ",
        render: (
          <div className=" flex items-center gap-5">
            <Button
              onClick={() => fetcherData("Delivered")}
              size="large"
              className=" bg-red-500 text-white"
            >
              Đã giao hàng
            </Button>
          </div>
        ),
      },
      Delivered: {
        message: "Đơn hàng đã được giao thành công",
        render: <div className=" flex items-center gap-5"></div>,
      },
      Cancelled: {
        message: "Đơn hàng đã được hủy",
        render: <div className=" flex items-center gap-5"></div>,
      },
    };

  const fetcherData = (
    values: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  ) => {
    BillApi.updateBill(item._id, { status: values })
      .then((d: Message) => {
        console.log(d);
        message.success(d.message);
      })
      .catch((e) => message.error(e));
  };

  return (
    <div className=" mt-4 divide-y-[1px] divide-solid divide-gray-200">
      <div className=" bg-white py-4 px-6 divide-y-[1px] divide-solid divide-gray-200">
        <div className=" flex items-center justify-between py-3">
          <div className=" flex items-center gap-4">
            {typeof item.seller === "object" ? (
              <IoStorefrontOutline className=" text-xl" />
            ) : (
              <MdOutlineShoppingCart className=" text-xl" />
            )}
            <p className=" text-sm font-medium">
              {(() => {
                if (typeof item.seller === "object") {
                  return item.seller.fullName;
                } else {
                  if (typeof item.buyer === "object") {
                    return item.buyer.fullName;
                  } else {
                    return "errr";
                  }
                }
              })()}
            </p>
            <Button
              size="small"
              className=" bg-red-500 text-white text-xs"
              icon={<IoIosChatboxes />}
            >
              Chat
            </Button>
          </div>
          <div className="divide-x-[1px] divide-gray-200 flex items-center">
            <p className=" text-green-500 px-3 text-sm">
              {label[item.status].message}
            </p>
            <p className=" text-red-500 px-3">{item.status}</p>
          </div>
        </div>
        {item.products.map((pro) => (
          <div
            key={pro.product._id}
            className=" flex justify-between items-center py-3"
          >
            <div className=" flex items-center gap-3">
              <Image
                src={pro.product.imageUrl[0]}
                width={100}
                height={100}
                alt={pro.product.name}
              />
              <div className="">
                <p className=" text-lg mb-2 text-wrap">{pro.product.name}</p>
                <p className=" text-sm">x{pro.quantity}</p>
              </div>
            </div>
            <p className=" text-red-500 text-sm">
              đ{transformMoney(pro.product.price * pro.quantity)}
            </p>
          </div>
        ))}
        <div className=" flex justify-between items-center pt-3">
          <div className=" flex items-center gap-7">
            <div>
              <p className=" font-medium">{item.shippingMethod.name}</p>
              <p className=" text-sm">{item.shippingMethod.type}</p>
            </div>
            <p className=" text-red-500 text-sm">
              đ{transformMoney(item.shippingMethod.price)}
            </p>
          </div>
          <div className=" text-sm">
            <p>{item.phone || "err"}</p>
            <p>{item.address || "err"}</p>
          </div>
        </div>
      </div>
      <div className=" bg-yellow-100 p-6">
        <div className="flex justify-between items-center">
          <div className=" text-sm bg-yellow-50 w-[500px] p-3">
            <p className=" flex items-center gap-2">
              <IoMdInformationCircleOutline />
              Ghi chú:
            </p>
            <p>{item.comment}</p>
          </div>
          <div className=" flex justify-end items-center gap-3">
            <IoPricetagsOutline className=" text-red-500 text-xl" />
            <p className=" text-sm">Thành tiền:</p>
            <p className=" text-red-500 text-2xl">
              đ{transformMoney(item.totalPrice)}
            </p>
          </div>
        </div>
        <div className=" flex justify-end items-center gap-3 mt-6">
          {label[item.status].render}
          <Button size="large" className=" bg-yellow-50">
            Liện hệ người mua
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderShopItem;
