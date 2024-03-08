"use client";
import { choseDelivery } from "@/app/store/slice/CartSlice";
import { transformMoney } from "@/utils/function/transformMoney";
import { Button, Menu, MenuProps, Modal, Select, TreeSelect } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
type MenuItem = Required<MenuProps>["items"][number];
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function ExpressModel({ open, setOpen }: Props) {
  const dispatch = useDispatch();
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "myshop_express") {
      dispatch(
        choseDelivery({
          name: "MYSHOP express",
          id: "myshop_express",
          price: 14000,
          type: "Vận chuyển nhanh",
        })
      );
    }
  };

  const items: MenuProps["items"] = [
    getItem(<p className=" ">Vận chuyển nhanh</p>, "fast", null, [
      getItem(
        <div className=" flex justify-start items-center gap-3 text-sm py-4">
          <p className=" text-black font-medium">MYSHOP express</p>
          <p className=" text-red-500">đ {transformMoney(14000)}</p>
        </div>,
        "myshop_express",
        null
      ),
    ]),
  ];

  return (
    <Modal
      title={
        <h3 className=" font-medium text-lg text-gray-600">
          Chọn đơn vị vận chuyển
        </h3>
      }
      closable={false}
      onCancel={() => setOpen(false)}
      open={open}
      onOk={() => setOpen(false)}
      okText="Xác nhận"
      cancelText="Trở lại"
      okButtonProps={{ className: " bg-red-500", size: "large" }}
      cancelButtonProps={{ className: " bg-white", size: "large" }}
    >
      <div className=" min-h-[200px] pt-4">
        <Menu
          className=" w-full bg-gray1 relative after:contents=[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:w-1 after:h-full after:bg-red-500"
          defaultSelectedKeys={["myshop_express"]}
          defaultOpenKeys={["fast"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </div>
    </Modal>
  );
}

export default ExpressModel;
