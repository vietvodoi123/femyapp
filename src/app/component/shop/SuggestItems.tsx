"use client";
import { Button, Spin, message } from "antd";
import React from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import ListItems from "../ui/ListItems";

function SuggestItems() {
  return (
    <div className="w-[1280px] mx-auto mt-10">
      <div className=" flex justify-between items-center my-2">
        <h3>GỢI Ý CHO BẠN</h3>
        <Button
          icon={<MdOutlineChevronRight />}
          type="text"
          size="small"
          className=" font-medium text-red-500 flex flex-row-reverse gap-3 items-center justify-center"
        >
          Xem tất cả
        </Button>
      </div>
      <ListItems category="" pagination={false} />
    </div>
  );
}

export default SuggestItems;
