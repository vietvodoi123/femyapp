import Board from "@/app/component/user/Board";
import User from "@/app/component/user/User";
import UserNav from "@/app/component/user/UserNav";
import { Skeleton } from "antd";
import React, { Suspense } from "react";

type Props = {};

function page({}: Props) {
  return (
    <Suspense fallback={<Skeleton />}>
      <div>
        <User />
        <Board />
      </div>
    </Suspense>
  );
}

export default page;
