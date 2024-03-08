"use client";
import { Menu, Skeleton } from "antd";
import React, { FormEvent, useEffect, useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import ListItems from "../ui/ListItems";
type Props = {
  menu: { label: string; key: string }[];
  navi: string;
  setNavi: (values: string) => void;
};

function CategoryShop({ menu, navi, setNavi }: Props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Thực hiện các hành động khi biến navi thay đổi
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [navi]);
  return (
    <section className="w-[1280px] mx-auto mt-8 flex gap-7">
      <div>
        <h3 className=" font-medium text-lg flex items-center gap-4 px-6 py-7 border-b-[1px] border-gray-300 border-solid">
          <TfiMenuAlt />
          Danh mục
        </h3>
        <Menu
          selectedKeys={[navi]}
          items={menu}
          mode="inline"
          onClick={(item) => {
            setNavi(item.key);
          }}
          className="w-[250px] bg-gray1"
        />
      </div>
      {loading && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {!loading && (
        <ListItems
          nav={true}
          col={5}
          pageSize={30}
          width={1000}
          pagination={true}
          category={navi}
        />
      )}
    </section>
  );
}

export default CategoryShop;
