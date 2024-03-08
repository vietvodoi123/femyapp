"use client";
import { ItemsApi } from "@/api/ItemsFetccher";
import Loading from "@/app/Loading";
import { Skeleton, notification } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import Item from "../ui/Item";

type Props = {
  long_desc: string;
  short_desc: string;
  category: string;
  creatorId?: string;
};

function ShortDetail({ long_desc, short_desc, category, creatorId }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IItem[]>();
  useEffect(() => {
    setLoading(true);
    ItemsApi.getItems({ creatorId: creatorId }).then(
      (data: ApiResponse<IItem[]>) => {
        if ("data" in data) {
          setData(data.data);
        } else {
          notification.error({
            message: "Có Lỗi Xảy Ra!",
            description: "Lỗi Items Gợi Ý Hôm Nay",
          });
        }
      }
    );
    setLoading(false);
  }, []);
  return (
    <div className="w-full mt-5  flex justify-[4fr_1fr] gap-5">
      <div className=" w-[1080px] p-5 bg-white text-sm">
        <div>
          <h3 className=" bg-gray1 p-3 text-lg font-medium">
            CHI TIẾT SẢN PHẨM
          </h3>
          <div className="px-3 py-8">
            <p className=" flex justify-start items-center gap-7 mb-3">
              Loại sản phẩm: <span className=" text-blue-500">{category}</span>
            </p>
            <p className=" flex justify-start items-center gap-20">
              Chi tiết: <span>{short_desc}</span>
            </p>
          </div>
        </div>
        <div>
          <h3 className=" bg-gray1 p-3 text-lg font-medium">MÔ TẢ SẢN PHẨM</h3>
          <p className="px-3 py-8 leading-[1.5]">{long_desc}</p>
        </div>
      </div>
      <div className=" w-[200px] flex flex-col gap-3">
        <h3 className="bg-white p-3 text-sm font-medium">CÁC SẢN PHẨM KHÁC</h3>
        <Suspense fallback={<Skeleton loading={loading} />}>
          {data && data.slice(0, 2).map((item) => <Item item={item} />)}
        </Suspense>
      </div>
    </div>
  );
}

export default ShortDetail;
