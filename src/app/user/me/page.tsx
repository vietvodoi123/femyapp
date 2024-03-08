import User from "@/app/component/user/User";
import { Skeleton } from "antd";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <section>
      <User />
    </section>
  );
}

export default page;
