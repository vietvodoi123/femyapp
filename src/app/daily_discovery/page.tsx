import { Skeleton } from "antd";
import React, { Suspense } from "react";
import MainHeader from "../component/home/MainHeader";
import ListItems from "../component/ui/ListItems";

function page() {
  return (
    <main className=" bg-gray1">
      <MainHeader />
      <Suspense fallback={<Skeleton />}>
        <ListItems pagination={true} />
      </Suspense>
    </main>
  );
}

export default page;
