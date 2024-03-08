"use client";
import React, { useState } from "react";
import HeaderShop from "./HeaderShop";
import SuggestItems from "./SuggestItems";
import CategoryShop from "./CategoryShop";

type Props = {};
const itemsInit: { label: string; key: string }[] = [
  {
    label: "Tất cả sản phẩm",
    key: "all",
  },
];

function MainShop({}: Props) {
  const [navi, setNavi] = useState<string>("all");
  const [menu, setMenu] = useState<{ label: string; key: string }[]>(itemsInit);
  return (
    <main className=" bg-gray1">
      <HeaderShop setNavi={setNavi} setMenu={setMenu} menu={menu} />
      <SuggestItems />
      <CategoryShop menu={menu} setNavi={setNavi} navi={navi} />
    </main>
  );
}

export default MainShop;
