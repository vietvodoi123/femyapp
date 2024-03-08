"use client";
import { UserApi } from "@/api/UserFetcher";
import { Button, Menu, Skeleton, Spin, message } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdChatboxes } from "react-icons/io";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbUserPlus } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";

const itemsInit: { label: string; key: string }[] = [
  {
    label: "Dạo",
    key: "dao",
  },
  {
    label: "Tất cả sản phẩm",
    key: "all",
  },
];
interface Props {
  menu: { label: string; key: string }[];
  setNavi: (values: string) => void;
  setMenu: (values: { label: string; key: string }[]) => void;
}
function HeaderShop({ setNavi, setMenu, menu }: Props) {
  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState<{ label: string; key: string }[]>(itemsInit);
  const [shop, setShop] = useState<IShopInfor | undefined>();
  const [key, setKey] = useState<string>("dao");

  const params = useParams();
  const shopId = params["shopId"][0];

  useEffect(() => {
    setLoading(true);
    UserApi.getInforShop(shopId)
      .then((d: IShopInfor) => {
        setShop(d);
        const arr = d.productCategories.map((category) => {
          return {
            label: category,
            key: category,
          };
        });
        if (nav) {
          setMenu(menu.concat(arr));
          setNav(nav.concat(arr));
        }
      })
      .catch((e) => message.error(e));
    setLoading(false);
  }, []);
  return (
    <>
      {loading && <Skeleton />}
      {!loading && shop && (
        <section className="bg-white">
          <div className=" w-[1280px] mx-auto pt-10">
            <div className=" flex items-center gap-7">
              <div className=" bg-gradient-to-br from-[#2b2f53] via-gray-900 to-[#504752] rounded-md px-6 py-4 w-[600px]">
                <div className=" flex items-start gap-5 mb-5">
                  <Image
                    src={shop.avatar}
                    alt={shop.name}
                    width={100}
                    height={100}
                    className=" rounded-full border-solid border-4 border-white"
                  />
                  <p className=" text-xl pt-3 text-white">{shop.name}</p>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <Button
                    icon={<IoMdAdd />}
                    className=" w-full text-white border-white"
                  >
                    Theo dõi
                  </Button>
                  <Button
                    icon={<IoMdChatboxes />}
                    className=" w-full text-white border-white"
                  >
                    Chat ngay
                  </Button>
                </div>
              </div>
              <div className=" w-full p-6 grid grid-cols-2 items-start text-sm gap-4">
                <div className=" flex gap-5 items-start w-full">
                  <AiOutlineShop className=" text-xl" />
                  <p>Số lượng sản phẩm:</p>
                  <p className=" text-red-500">{shop.productCount}</p>
                </div>
                <div className=" flex gap-5 items-center w-full">
                  <HiOutlineShoppingCart className=" text-xl" />
                  <p>Số sản phẩm đã bán:</p>
                  <p className=" text-red-500">{shop.totalUnitsSold}</p>
                </div>
                <div className=" flex gap-5 items-start w-full">
                  <TbUserPlus className=" text-xl" />
                  <p>Số người theo dõi:</p>
                  <p className=" text-red-500">0</p>
                </div>
                <div className=" flex gap-5 items-center w-full">
                  <FaRegStar className=" text-xl" />
                  <p>Điểm đánh giá:</p>
                  <p className=" text-red-500">0</p>
                </div>
              </div>
            </div>
            <Menu
              selectedKeys={[key]}
              mode="horizontal"
              onClick={(item) => {
                setKey(item.key);
                setNavi(item.key);
              }}
              className="flex justify-between mt-7 "
            >
              {nav.map((item) => (
                <Menu.Item
                  className="text-base text-center"
                  key={item.key}
                  style={{ flex: "1" }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </section>
      )}
    </>
  );
}

export default HeaderShop;
