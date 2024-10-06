import { Skeleton } from "antd";
import React, { Suspense } from "react";
import MainHeader from "../component/home/MainHeader";
import ListItems from "../component/ui/ListItems";

function page() {
  return (
    <main className=" bg-gray1">
      <MainHeader />
      
        <ListItems pagination={true} />
      
    </main>
  );
}

export default page;
