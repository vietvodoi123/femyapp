"use client";
import { Button } from "antd";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoChatboxEllipses } from "react-icons/io5";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  shop: IItemAndCreator;
};

function InforShop({ shop }: Props) {
  const router = useRouter();
  return (
    <div className=" mt-4 bg-white flex justify-start items-center p-5">
      <div className=" flex justify-between items-center gap-5 border-r-[3px] border-r-gray1 pr-5">
        <img
          src={shop?.creatorInfo?.avatar || ""}
          alt={shop?.creatorInfo?.fullName || ""}
          className=" rounded-full bg-gray1"
          width={75}
          height={75}
        />
        <div>
          <p className=" font-medium">
            {shop.creatorInfo && shop.creatorInfo.fullName
              ? shop.creatorInfo.fullName
              : "myshop"}
          </p>
          <p className=" text-xs mb-3">
            {shop.creatorInfo && shop.creatorInfo.email
              ? shop.creatorInfo.email
              : "myshop@gmail.com"}
          </p>
          <div>
            <Button
              icon={<IoChatboxEllipses />}
              className=" border-solid border-red-500 border-[2px] text-red-500 bg-red-100 mr-4"
            >
              Nhắn Tin
            </Button>
            <Button
              onClick={() => router.push(`/shop/${shop.creatorInfo.id}`)}
              icon={<IoStorefrontOutline />}
            >
              Xem Shop
            </Button>
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center gap-14 text-sm p-5">
        <div>
          <p className=" flex justify-between items-center gap-12 mb-3">
            Đánh giá: <span className=" text-red-500">0</span>
          </p>
          <p className=" flex justify-between items-center gap-12">
            Sản phẩm: <span className=" text-red-500">0</span>
          </p>
        </div>
        <div>
          <p className=" flex justify-between items-center gap-12 mb-3">
            Đã bán: <span className=" text-red-500">0</span>
          </p>
          <p className=" flex justify-between items-center gap-12">
            Lượt thích: <span className=" text-red-500">0</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InforShop;
