"use client";
import React, { Suspense, useEffect, useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaRegStar, FaUserEdit } from "react-icons/fa";
import Image from "next/image";
import { Button, Skeleton, message } from "antd";
import UpdateUser from "../ui/modal/UpdateUser";
import { UserApi } from "@/api/UserFetcher";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbUserPlus } from "react-icons/tb";
import { IRootState } from "@/app/store/store";
import { useRouter } from "next/navigation";

function User() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: IRootState) => state.user.userCurrent);
  const [shop, setShop] = useState<IShopInfor | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (user?.id) {
      UserApi.getInforShop(user.id)
        .then((d: IShopInfor) => {
          setShop(d);
        })
        .catch((e) => message.error(e))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  return (
    <header className="bg-white py-6 px-4 relative h-max flex justify-between items-center gap-4">
      <Button
        size="small"
        className="absolute text-slate-400 right-4 top-6"
        onClick={() => setOpen(true)}
      >
        <FaUserEdit />
      </Button>
      <Button
        size="small"
        className="absolute text-slate-400 right-12 top-6"
        onClick={() => router.push(`/shop/${user?.id}`)}
      >
        <IoStorefrontOutline />
      </Button>
      {loading && <Skeleton avatar />}
      {!loading && shop && user && (
        <>
          <div className="flex gap-5 justify-start items-center">
            <Image
              src={shop?.avatar || ""}
              width={100}
              height={100}
              alt="avatar"
              className="rounded-full bg-slate-200"
            />
            <div>
              <h2 className="font-medium text-xl">{shop?.name}</h2>
              <p className="text-slate-400">{user?.email}</p>
            </div>
          </div>
          <div className=" p-6 grid grid-cols-2 items-start text-sm gap-4">
            <div className="flex gap-5 items-start w-full">
              <AiOutlineShop className="text-xl" />
              <p>Số lượng sản phẩm:</p>
              <p className="text-red-500">{shop?.productCount}</p>
            </div>
            <div className="flex gap-5 items-center w-full">
              <HiOutlineShoppingCart className="text-xl" />
              <p>Số sản phẩm đã bán:</p>
              <p className="text-red-500">{shop?.totalUnitsSold}</p>
            </div>
            <div className="flex gap-5 items-start w-full">
              <TbUserPlus className="text-xl" />
              <p>Số người theo dõi:</p>
              <p className="text-red-500">0</p>
            </div>
            <div className="flex gap-5 items-center w-full">
              <FaRegStar className="text-xl" />
              <p>Điểm đánh giá:</p>
              <p className="text-red-500">0</p>
            </div>
          </div>
        </>
      )}

      {open && <UpdateUser open={open} setOpen={setOpen} user={user} />}
    </header>
  );
}

export default User;
