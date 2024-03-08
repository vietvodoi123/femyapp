"use client";
import { Button, message } from "antd";
import React, { useState } from "react";
import { TbTicket } from "react-icons/tb";
import VoucherModel from "../ui/modal/VoucherModel";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/app/store/store";
import { calcPrice } from "@/utils/function/calcFunc";
import { BillApi } from "@/api/BillFetcher";
import { useRouter } from "next/navigation";
import { finishCheckout } from "@/app/store/slice/CartSlice";
import { transformMoney } from "@/utils/function/transformMoney";

interface Props {
  address: string;
  phone: string;
}

function Payment({ address, phone }: Props) {
  const route = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<string>("cash");
  const checkout = useSelector((state: IRootState) => state.cart.checkout);
  const user = useSelector((state: IRootState) => state.user.userCurrent);
  const delivery = useSelector((state: IRootState) => state.cart.delivery);

  const handleCheckout = async () => {
    let bills: IBill[] = [];
    if (address && phone) {
      Object.keys(checkout).forEach((key) => {
        const items = checkout[key];
        const products = items.cart.map((item) => {
          return { product: item.name.id, quantity: item.quantity };
        });

        if (user?.id) {
          bills.push({
            buyer: user.id,
            seller: items.cart[0].shop.id,
            products: products,
            comment: items.comment,
            shippingMethod: delivery,
            totalPrice: calcGlobalPrice(),
            paymentMethod: "Thanh toán khi nhận hàng",
            status: "Pending",
            address: address,
            phone: phone,
          });
        }
      });

      try {
        const createdBills = await Promise.all(
          bills.map((bill) => BillApi.createBill(bill))
        );
        if (createdBills.every((d) => message.success(d.message))) {
          dispatch(finishCheckout());
          route.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Điện thoại và địa chỉ không được bỏ trống!");
    }
  };

  const calcGlobalPrice = () => {
    let totals = 0;
    Object.keys(checkout).forEach((key) => {
      const items = checkout[key];
      totals += calcPrice(items.cart, 0);
    });
    return totals;
  };

  return (
    <>
      <section className="bg-white ">
        <div className="flex justify-end items-center gap-16 py-3  relative border-solid border-b border-b-[#e5e7eb]">
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
        <div className=" flex items-center gap-5 p-6 border-solid border-b border-b-[#e5e7eb]">
          <h3 className=" text-lg font-medium">Phương thức thanh toán:</h3>
          <Button
            type="text"
            onClick={() => setTab("cash")}
            className={` border border-solid ${
              tab === "cash"
                ? "border-red-500 text-red-500"
                : "border-gray-500 text-gray-500"
            }`}
          >
            Thanh toán bằng tiền mặt
          </Button>
          <Button
            type="text"
            onClick={() => setTab("credit")}
            className={` border border-solid ${
              tab === "credit"
                ? "border-red-500 text-red-500"
                : "border-gray-500 text-gray-500"
            }`}
          >
            Thẻ tín dụng/ Ghi nợ
          </Button>
        </div>
        {tab === "cash" && (
          <div className=" p-6">
            <p>
              Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận
              chuyển (nếu có) áp dụng cả với phí thu hộ.
            </p>
          </div>
        )}
        {tab === "credit" && (
          <div className="p-6">
            <p>
              Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ - Tính năng đang phát
              triển
            </p>
          </div>
        )}
        <div className=" bg-yellow-50  divide-y divide-solid divide-[#e5e7eb]">
          <div className="flex justify-end  p-6">
            <div className=" w-[400px]">
              <div className="flex justify-between items-center w-full  mb-4">
                <p className="text-gray-500">Tổng tiền hàng:</p>
                <p>đ{transformMoney(calcGlobalPrice())}</p>
              </div>
              <div className="flex justify-between items-center w-full  mb-4">
                <p className="text-gray-500">Phí vận chuyển:</p>
                <p>đ{transformMoney(Object.keys(checkout).length * 14000)}</p>
              </div>
              <div className="flex justify-between items-center w-full  mb-4">
                <p className="text-gray-500">Voucher giảm giá:</p>
                <p>đ 0</p>
              </div>
              <div className="flex justify-between items-center w-full  mb-4">
                <p className="text-gray-500">Tổng thanh toán:</p>
                <p className=" text-2xl text-red-500">
                  đ
                  {transformMoney(
                    calcGlobalPrice() + Object.keys(checkout).length * 14000
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className=" p-6 flex justify-between items-center">
            <p className=" text-sm">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
              <span className=" text-blue-500">Điều khoản Shopee</span>
            </p>
            <button
              className=" bg-red-500 text-white px-10 py-1 text-lg"
              onClick={handleCheckout}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </section>
      <VoucherModel open={open} setOpen={setOpen} />
    </>
  );
}

export default Payment;
