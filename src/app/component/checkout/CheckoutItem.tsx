"use client";
import React, { useState } from "react";
import TableProduct from "./TableProduct";
import { IoTicketOutline } from "react-icons/io5";
import { Button, Input } from "antd";
import { BsQuestionCircle } from "react-icons/bs";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import ExpressModel from "../ui/modal/ExpressModel";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/app/store/store";
import { calcPrice } from "@/utils/function/calcFunc";
import { transformMoney } from "@/utils/function/transformMoney";
import { updateComment } from "@/app/store/slice/CartSlice";

type Props = { shopId: string; cartItems: CartItem[] };

function CheckoutItem({ shopId, cartItems }: Props) {
  const dispatch = useDispatch();
  const [openModelExpress, setOpenExpress] = useState(false);
  const [comment, setComment] = useState<string>("");
  const delivery = useSelector((state: IRootState) => state.cart.delivery);

  return (
    <section key={shopId} className=" bg-white pt-6 my-5">
      <div className=" px-6">
        <div className=" flex items-center gap-5 mb-4">
          <h4 className=" text-base text-gray-600  ">{shopId}</h4>
          <Button
            icon={<HiMiniChatBubbleLeftRight />}
            type="text"
            className=" text-green-500"
          >
            Chat ngay
          </Button>
        </div>
        <TableProduct cartItems={cartItems} />
        <div className="flex justify-end items-center gap-24 py-2 border-b border-[#e5e7eb]">
          <p className=" flex justify-start items-center gap-3 text-sm">
            <IoTicketOutline className=" text-red-500 text-xl" />
            Voucher của Shop
          </p>
          <Button type="text" className=" text-blue-500 text-sm">
            Chọn Voucher
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 divide-y-2 divide-dashed divide-[#e5e7eb] text-sm">
        <div className=" flex items-center  divide-x-2 divide-dashed divide-[#e5e7eb]">
          <div className=" flex justify-between items-center gap-5 w-[600px] p-6">
            <span className=" w-[90px]">Lời nhắn:</span>
            <Input
              size="large"
              placeholder="Lời nhắn cho người bán...."
              className="w-full"
              onChange={(e) => {
                dispatch(
                  updateComment({ shopId: shopId, comment: e.target.value })
                );
              }}
            />
          </div>
          <div className="w-full divide-y-2 divide-dashed divide-[#e5e7eb]">
            <div className=" flex justify-between items-center gap-5 py-4 px-6">
              <p className="">Đơn vị vận chuyển:</p>
              <div>
                <p className=" font-medium text-base w-[150px] whitespace-pre-wrap">
                  {delivery.type}
                </p>
                <p>{delivery.name}</p>
              </div>
              <Button
                type="text"
                className=" text-blue-400"
                onClick={() => setOpenExpress(true)}
              >
                THAY ĐỔI
              </Button>
              <p>đ {transformMoney(delivery.price)}</p>
            </div>
            <p className="py-3 px-6 flex items-center gap-4">
              Được đồng kiểm bởi
              <BsQuestionCircle />
            </p>
          </div>
        </div>
        <div className=" flex justify-end items-center gap-20 p-6">
          <p>Tổng số tiền {`(${cartItems.length} sản phẩm):`}</p>
          <p className=" text-red-500 text-lg">
            đ{" " + calcPrice(cartItems, 14000).toString()}
          </p>
        </div>
      </div>
      <ExpressModel open={openModelExpress} setOpen={setOpenExpress} />
    </section>
  );
}

export default CheckoutItem;
