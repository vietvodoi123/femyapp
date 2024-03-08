"use client";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Menu } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store/store";

function UserNav() {
  const pathName = usePathname();
  const router = useRouter();

  const items: MenuItemType[] = [
    {
      label: (
        <Link href="/infor" className=" text-slate-300 text-base">
          Thông Tin Tài Khoản
        </Link>
      ),
      key: "me",
      icon: <FaUser />,
    },
    {
      label: (
        <Link href="order" className=" text-slate-300 text-base">
          Quản Lý Đơn Mua
        </Link>
      ),
      key: "order",
      icon: <IoMdReorder />,
    },
    {
      label: (
        <Link href="/mystore" className="text-slate-300 text-base">
          Cửa Hàng Của Tôi
        </Link>
      ),
      key: "mystore",
      icon: <FaStore />,
    },
    {
      label: (
        <Link href="/change_password" className="text-slate-300 text-base">
          Đổi Mật Khẩu
        </Link>
      ),
      key: "change_password",
      icon: <FaKey />,
    },
  ];

  return (
    <Menu
      selectedKeys={[pathName.split("/")[2]]}
      items={items}
      onClick={(item) => {
        router.push(`/user/${item.key}`);
      }}
      className=" border-none bg-gray1"
    />
  );
}

export default UserNav;
