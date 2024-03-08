"use client";
import { Button } from "antd";
import React, { useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoIosChatboxes, IoMdInformationCircleOutline } from "react-icons/io";
import Image from "next/image";
import { transformMoney } from "@/utils/function/transformMoney";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import ReviewModel from "../ui/modal/ReviewModel";

type Props = { item: IOrder };

const label: { [key: string]: string } = {
  Pending: "Chờ người bán chấp nhận đơn hàng",
  Processing: "Chờ người bán chuẩn bị hàng",
  Shipped: "Đơn hàng đang được vận chuyển ",
  Delivered: "Đơn hàng đã được giao thành công",
  Cancelled: "Đơn hàng đã được hủy",
};

function OrderItem({ item }: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
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

            <Button
              size="small"
              className="text-xs"
              onClick={() => {
                if (typeof item.seller === "object") {
                  router.push(`/shop/${item.seller._id}`);
                }
              }}
              icon={<IoStorefrontOutline />}
            >
              Xem shop
            </Button>
          </div>
          <div className="divide-x-[1px] divide-gray-200 flex items-center">
            <p className=" text-green-500 px-3 text-sm">{label[item.status]}</p>
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
          {item.status === "Delivered" && (
            <Button
              size="large"
              className=" bg-red-500 text-white"
              onClick={() => setOpen(true)}
            >
              Đánh giá sản phẩm
            </Button>
          )}
          <Button size="large" className=" bg-yellow-50">
            Liện hệ người bán
          </Button>
        </div>
      </div>
      <ReviewModel open={open} setOpen={setOpen} product_id={item.products} />
    </div>
  );
}

export default OrderItem;
