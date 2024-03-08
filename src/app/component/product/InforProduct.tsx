"use client";
import { ItemsApi } from "@/api/ItemsFetccher";
import { Skeleton, message } from "antd";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import ImageProduct from "./ImageProduct";
import DetailsProduct from "./DetailsProduct";
import InforShop from "./InforShop";
import ShortDetail from "./ShortDetail";
import Reviews from "./Reviews";

function InforProduct() {
  const param = useParams<{ productId: string[] }>();
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<IItemAndCreator>();
  useEffect(() => {
    setLoading(true);
    ItemsApi.getItemById(param.productId[0])
      .then((data: IItemAndCreator) => {
        setData(data as IItemAndCreator);
      })
      .catch((error) => {
        message.error(error);
      });
    setLoading(false);
  }, []);
  return (
    <>
      {loading && !data && <Skeleton loading={loading} />}
      {!loading && data && (
        <Suspense fallback={<p>loading...</p>}>
          <div className="flex justify-[2fr_3fr] gap-4 bg-white w-full p-5">
            <ImageProduct imageUrl={data.imageUrl} name={data.name} />
            <DetailsProduct item={data} />
          </div>
          <InforShop shop={data} />
          <ShortDetail
            creatorId={data.creatorId}
            category={data.category}
            long_desc={data.long_desc}
            short_desc={data.short_desc}
          />
          <Reviews id={data._id} />
        </Suspense>
      )}
    </>
  );
}

export default InforProduct;
