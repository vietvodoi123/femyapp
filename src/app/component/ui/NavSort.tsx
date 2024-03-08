"use client";
import { Button, Pagination, Select } from "antd";

import React from "react";

type Props = {
  page: number;
  totalPages: number;
  button?: string;
  setButton: (value: string | undefined) => void;
  setOrder: (values: string) => void;
  setPage: (value: number, pageSize: number) => void;
  width?: number;
};

function NavSort({
  page,
  width,
  totalPages,
  button,
  setButton,
  setOrder,
  setPage,
}: Props) {
  return (
    <div
      className={` bg-white w-[${
        width || "1280"
      }px] mx-auto flex justify-start items-center p-5 gap-5 text-sm`}
    >
      <p>Sắp xếp theo:</p>
      <Button
        size="large"
        onClick={() => setButton(undefined)}
        className={
          !button
            ? " bg-red-100 border-solid border-[3px] border-red-500 text-red-500"
            : ""
        }
      >
        Phổ Biến
      </Button>
      <Button
        size="large"
        onClick={() => {
          setButton("unitsSold");
          setOrder("desc");
        }}
        className={
          button
            ? " bg-red-100 border-solid border-[3px] border-red-500 text-red-500"
            : ""
        }
      >
        Bán Chạy
      </Button>
      <div className=" flex justify-start items-center gap-5">
        <p>Giá: </p>
        <Select
          defaultValue="1"
          onChange={(e: string) => setOrder(e)}
          options={[
            { value: "1", label: "Sắp xếp theo giá" },
            { value: "asc", label: "Giá: Thấp đến cao" },
            { value: "desc", label: "Giá: Cao đến thấp" },
          ]}
          style={{ width: "200px" }}
          size="large"
        />
      </div>
      <Pagination
        simple
        defaultCurrent={1}
        pageSize={18}
        current={page}
        total={totalPages * 10}
        onChange={(pages: number, pageSize: number) => {
          setPage(pages, pageSize);
        }}
        className="ml-auto"
      />
    </div>
  );
}

export default NavSort;
