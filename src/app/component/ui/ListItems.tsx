"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Empty, Pagination, Skeleton, message } from "antd";
import { ItemsApi } from "@/api/ItemsFetccher";
import Item from "./Item";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NavSort from "./NavSort";

interface Props {
  pagination?: boolean;
  pageSize?: number;
  nav?: boolean;
  col?: number;
  width?: number;
  category?: string;
}

function ListItems({ pagination, nav, pageSize, col, width, category }: Props) {
  const isPagi = pagination ? true : false;

  const param = useParams();
  const searchParams = useSearchParams();
  const searchKey = searchParams.get("search");

  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<string>("");
  const [items, setItems] = useState<SuccessResponse<IItem[]>>({
    data: [],
    page: 1,
    pageSize: pageSize || 18,
    totalPages: 0,
    totalRecords: 0,
  });
  const fetchData = useCallback(async () => {
    setLoading(true);
    const query: IGetItems = {
      page: items.page,
      pageSize: items.pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    if (param && "slug" in param) {
      query["category"] = decodeURIComponent(param["slug"][0]);
    } else {
      if (typeof category === "string") {
        if (category === "all") {
          query["category"] = "";
        } else {
          query["category"] = category;
        }
      }
    }
    if (param && "shopId" in param) {
      query["creatorId"] = param["shopId"][0];
      query.sortBy = "unitsSold";
      query.sortOrder = "desc";
      if (!pageSize) {
        query.pageSize = 12;
      }
    }
    if (searchKey) {
      query["name"] = decodeURIComponent(searchKey);
    }

    ItemsApi.getItems(query)
      .then((d: SuccessResponse<IItem[]>) => {
        console.log(d);

        setItems(d);
      })
      .catch((e) => {
        message.error(e);
        console.log(e);
      });
    setLoading(false);
  }, [items.page, sortBy, sortOrder, searchParams.get("search")]);

  useEffect(() => {
    fetchData();
  }, [fetchData, category]);

  const handleChangePage = (page: number, pageSize: number) => {
    const d: SuccessResponse<IItem[]> = {
      ...items,
      page: page,
      pageSize: pageSize,
    };
    setItems(d);
  };

  return (
    <section>
      {(param["slug"] || nav) && (
        <NavSort
          setPage={handleChangePage}
          page={items.page}
          totalPages={items.totalPages}
          button={sortBy}
          setButton={setSortBy}
          setOrder={setSortOrder}
          width={width}
        />
      )}
      {searchKey && (
        <div className="w-[1280px] m-auto flex items-center gap-3  my-5 text-lg">
          <p className=" flex items-center gap-3">
            <IoIosInformationCircleOutline className=" text-xl" />
            Kết quả tìm kiếm cho từ khóa:
          </p>
          <span className=" text-red-500">"{searchKey}"</span>
        </div>
      )}
      {loading && <Skeleton />}
      {!loading && items.data && items.data.length === 0 && <Empty />}
      {!loading && items.data && items.data.length !== 0 && (
        <div
          className={`w-[${width || 1280}px] grid ${
            col ? `grid-cols-5` : "grid-cols-6"
          } gap-3 mt-8 mx-auto`}
        >
          {items.data.map((item) => (
            <Item item={item} />
          ))}
        </div>
      )}
      {isPagi && (
        <div
          className={` w-[${
            width || 1280
          }px] mx-auto flex justify-center items-center mt-5 `}
        >
          <Pagination
            pageSize={18}
            total={items.totalPages * 10}
            current={items.page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </section>
  );
}

export default ListItems;
