"use client";
import { ItemsApi } from "@/api/ItemsFetccher";
import { IRootState } from "@/app/store/store";
import { Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemMana from "../ui/ItemMana";

type Props = {};

function ProductsBoard({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<IItem[]>([]);
  const [page, setPage] = useState<IPage>({
    pageSize: 10,
    totalPages: 0,
    page: 1,
    totalRecords: 0,
  });
  const userId = useSelector((state: IRootState) => state.user.userCurrent?.id);
  useEffect(() => {
    setLoading(true);

    ItemsApi.getItems({
      creatorId: userId,
      page: page.page,
      pageSize: page.pageSize,
    }).then((data: SuccessResponse<IItem[]>) => {
      if ("data" in data) {
        setItems(data.data);
        setPage({
          pageSize: data.pageSize,
          totalPages: data.totalPages,
          page: data.page,
          totalRecords: data.totalRecords,
        });
      }
    });
    setLoading(false);
  }, [page.page]);
  return (
    <div className=" w-full min-h-[300px] mt-8  divide-y divide-solid divide-gray-300 bg-white">
      <div className=" grid grid-cols-[3fr_3fr_1fr_1fr_1fr] items-center gap-2 font-medium bg-white p-3">
        <div>Hình Ảnh Mô Tả</div>
        <div>Tên Sản Phẩm</div>
        <div>Giá</div>
        <div>Số Lượng</div>
        <div>#</div>
      </div>
      {loading && <Spin />}
      {!loading &&
        items &&
        items.map((item) => <ItemMana key={item._id} item={item} />)}
      {!loading && items && (
        <div className=" flex justify-center items-center w-full py-6">
          <Pagination
            defaultCurrent={1}
            total={page.totalRecords}
            onChange={(pages, pageSize) => {
              setPage({
                page: pages,
                pageSize: pageSize,
                totalPages: page.totalPages,
                totalRecords: page.totalRecords,
              });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductsBoard;
