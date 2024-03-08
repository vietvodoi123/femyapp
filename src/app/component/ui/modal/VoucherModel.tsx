"use client";
import { Button, Empty, Input, Modal, Popover } from "antd";
import React from "react";
import { CiCircleQuestion } from "react-icons/ci";

type Props = {
  open: boolean;
  setOpen: (vlaue: boolean) => void;
};

const content = (
  <div className="w-[200px]">
    <h5 className=" text-gray-500 font-medium text-sm mb-3">
      Cách Sử Dụng Voucher
    </h5>
    <p className=" text-[11px] mb-6">
      Để có thể áp dụng mã Shopee voucher, bạn hãy chọn nút "Lưu" để lấy voucher
      về mục ví voucher của bạn nhé.
    </p>
    <h5 className=" text-gray-500 font-medium text-sm mb-3">
      Cách Tìm Voucher
    </h5>
    <p className=" text-[11px]">
      Bạn có thể tìm thấy Shopee Voucher xuyên suốt trang shopee.vn và ứng dụng
      shopee. Mẹo riêng cho bạn nè, hãy bắt đầu với những trang chương trình
      khuyến mãi và trang chủ của shop nhé!
    </p>
  </div>
);
function VoucherModel({ open, setOpen }: Props) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      okText="Xác nhận"
      cancelText="Trở lại"
      okButtonProps={{ className: " bg-red-500", size: "large" }}
      cancelButtonProps={{ className: " bg-white", size: "large" }}
      width={500}
      closable={false}
    >
      <header className=" flex justify-between items-center gap-2 mb-4">
        <h4 className=" font-medium text-xl text-gray-600">
          Chọn MyShop Voucher
        </h4>
        <Popover
          title={
            <p className=" text-center text-base font-medium text-gray-600">
              Hỗ trợ
            </p>
          }
          content={content}
          placement="bottomRight"
          trigger="click"
        >
          <Button
            type="text"
            className=" flex justify-between items-center gap-2 "
          >
            Hỗ trợ <CiCircleQuestion className="text-lg" />
          </Button>
        </Popover>
      </header>
      <main>
        <nav className=" bg-gray1 p-3 flex justify-between items-center gap-3 mb-5">
          <p className=" w-[180px] text-base">Mã Voucher</p>
          <Input className="w-full" placeholder="Mã MyShop Voucher" />
          <Button className=" bg-white border-none text-gray-500">
            Áp Dụng
          </Button>
        </nav>
        <p className=" leading-5 text-gray-500">
          Mã Miễn Phí Vận Chuyển
          <br />
          Có thể chọn 1 Voucher
        </p>
        <div className=" py-8">
          <Empty />
        </div>
      </main>
    </Modal>
  );
}

export default VoucherModel;
