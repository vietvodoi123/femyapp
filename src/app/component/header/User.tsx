"use client";
import { IRootState } from "@/app/store/store";
import { Dropdown, MenuProps, Skeleton } from "antd";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoMdReorder } from "react-icons/io";
import { logout } from "@/app/store/slice/UserSlice";
import { useRouter } from "next/navigation";
function User() {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user.userCurrent);
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: "Thông Tin Tài Khoản",
      key: "infor",
      icon: <FaUser />,
      className: " hover:text-blue-500",
      onClick: () => {
        router.push("/user/me");
      },
    },
    {
      label: "Giỏ Hàng Của Tôi",
      key: "cart",
      icon: <FaShoppingCart />,
      className: " hover:text-blue-500",
      onClick: () => {
        router.push("/cart");
      },
    },
    {
      label: "Cửa Hàng Của Tôi",
      key: "mystore",
      icon: <FaStore />,
      className: " hover:text-blue-500",
      onClick: () => {
        router.push("/user/mystore");
      },
    },
    {
      label: "Quản Lý Đơn Hàng",
      key: "order",
      className: " hover:text-blue-500",
      icon: <IoMdReorder />,
      onClick: () => {
        router.push("/user/order");
      },
    },
    {
      label: "Đăng Xuất",
      key: "logout",
      icon: <CiLogout />,
      danger: true,
      onClick: () => {
        router.push("/");
        dispatch(logout());
      },
    },
  ];

  return (
    <>
      {!user ? (
        <div className="flex justify-around items-center gap-3 text-white w-[500px]">
          <Link href="/login" className=" hover:text-red-500">
            Đăng Nhập
          </Link>
          |
          <Link href="/register" className=" hover:text-red-500">
            Đăng Ký
          </Link>
        </div>
      ) : (
        <Suspense fallback={<Skeleton avatar />}>
          <Dropdown menu={{ items }} className=" cursor-pointer">
            <p>{user?.email}</p>
          </Dropdown>
        </Suspense>
      )}
    </>
  );
}

export default User;
