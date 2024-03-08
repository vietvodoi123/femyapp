import Link from "next/link";
import MainHeader from "./component/home/MainHeader";
import MainNav from "./component/home/MainNav";
import { Suspense } from "react";
import { Skeleton } from "antd";
import ListItems from "./component/ui/ListItems";

export default function Home() {
  return (
    <main className=" bg-gray1 h-full pb-9">
      <MainHeader />
      <div className=" bg-white w-[1280px] m-auto mt-8 p-6">
        <MainNav />
      </div>
      <div className=" bg-white w-[1280px] m-auto mt-8 pt-6 pb-0">
        <h3 className=" mb-3 py-3 border-b-[4px] border-b-solid text-center text-blue-500 border-b-blue-500 text-xl">
          GỢI Ý HÔM NAY
        </h3>
      </div>
      <Suspense fallback={<Skeleton />}>
        {/* <MainSuggest /> */}

        <ListItems pagination={true} />
      </Suspense>
    </main>
  );
}
