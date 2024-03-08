import React from "react";
import { items } from "../../../utils/dummyData";
import Link from "next/link";

function MainNav() {
  const tag = (icon: React.ReactNode, key: string, label: string) => {
    return (
      <Link
        href={`/${key}`}
        key={key}
        className=" p-3 px-2 flex justify-center items-center flex-col w-[123.2px] border-solid border-[0.2px] border-[#ccc] h-[100px] cursor-pointer hover:bg-blue-100 hover:text-blue-500  hover:border-blue-500"
      >
        {icon}
        <p className=" mt-1 text-center text-wrap text-sm">{label}</p>
      </Link>
    );
  };

  return (
    <>
      <h3 className="text-xl mb-3 py-3 text-blue-500">DANH MỤC</h3>
      <div className="flex flex-wrap">
        {items.map((item) => {
          return tag(item.icon, item.key, item.label);
        })}
      </div>
    </>
  );
}

export default MainNav;
