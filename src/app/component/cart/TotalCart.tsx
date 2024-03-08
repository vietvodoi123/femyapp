"use client";
import { Button, Empty, Input, Modal, Popover } from "antd";
import React, { useState } from "react";
import { TbTicket } from "react-icons/tb";

import VoucherModel from "../ui/modal/VoucherModel";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCheckout } from "@/app/store/slice/CartSlice";
import { transformMoney } from "@/utils/function/transformMoney";

type Props = {
  total: ITotal;
};

function TotalCart({ total }: Props) {
  const route = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  return (
    <>
      <div className=" px-5 bg-white w-[1280px] mx-auto text-base sticky bottom-0 shadow-xl z-10 ">
        <div className="absolute h-6 w-full -top-6 left-0 right-0 bg-gradient-to-b from-transparent to-gray-200 opacity-6"></div>
        <div className="flex justify-end items-center gap-16 py-3 relative">
          <p className=" flex justify-between items-center gap-2">
            <TbTicket className=" text-red-500 text-base" /> MyShop Voucher
          </p>
          <Button
            type="text"
            className=" text-blue-500 "
            onClick={() => setOpen(true)}
          >
            Chọn hoặc nhập mã
          </Button>
        </div>
        <div className=" py-3 flex justify-between items-center border-t-2 border-gray1">
          <p>Đã chọn {`(${total.total})`}</p>
          <div className="flex items-center justify-between gap-3">
            <p>Tổng thanh toán {`(${total.total} Sản phẩm)`}</p>
            <p className=" text-red-500 font-medium text-xl">
              đ{transformMoney(total.totalPrice)}
            </p>
            <Button
              onClick={() => {
                if (total.total !== 0) {
                  dispatch(setCheckout(total.items));
                  route.push("/checkout");
                } else {
                  setOpenNoti(true);
                }
              }}
              size="large"
              className=" bg-red-500 text-white"
            >
              Mua Hàng
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={openNoti}
        onCancel={() => setOpenNoti(false)}
        footer={
          <Button
            onClick={() => setOpenNoti(false)}
            className=" bg-red-500 w-full text-white"
            size="large"
          >
            OK
          </Button>
        }
        closable={false}
      >
        <p className=" pt-7 pb-20 text-lg">
          Bạn vẫn chưa chọn sản phẩm nào để mua.
        </p>
      </Modal>
      <VoucherModel open={open} setOpen={setOpen} />
    </>
  );
}

export default TotalCart;
