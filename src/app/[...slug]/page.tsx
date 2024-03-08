"use client";
import React, { Suspense, useState } from "react";
import MainHeader from "../component/home/MainHeader";
import { Skeleton } from "antd";
import ListItems from "../component/ui/ListItems";

type Props = {};

function page({}: Props) {
  const [reRender, setReRender] = useState<{
    sortBy: string;
    sortOrder?: "asc" | "desc";
    page?: number;
  }>({ sortBy: "unitsSold", sortOrder: "asc" });

  return (
    <main className=" bg-gray1 h-full pb-9">
      <MainHeader />

      <Suspense fallback={<Skeleton />}>
        <ListItems />
      </Suspense>
    </main>
  );
}

export default page;
