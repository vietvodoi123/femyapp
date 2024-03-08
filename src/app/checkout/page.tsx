import React from "react";
import MainCheckout from "../component/MainCheckout";

type Props = {};

function page({}: Props) {
  return (
    <main className=" bg-gray1 min-h-[90vh] pb-10">
      <header className=" bg-white">
        <div className=" w-[1280px] mx-auto p-5 flex gap-5">
          <h3 className=" text-2xl text-start font-medium p-3  text-blue-500">
            Thanh toán
          </h3>
          <div className="relative after:absolute after:contents-[''] after:top-[10px] after:right-0 after:bottom-0 after:w-[3px] after:h-[70%] after:bg-blue-500"></div>
        </div>
      </header>
      <MainCheckout />
    </main>
  );
}

export default page;
