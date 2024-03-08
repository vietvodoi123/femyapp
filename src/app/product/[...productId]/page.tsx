import InforProduct from "@/app/component/product/InforProduct";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="bg-gray1">
      <div className="  w-[1280px] mx-auto py-4">
        <InforProduct />
      </div>
    </div>
  );
}

export default page;
