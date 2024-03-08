import React from "react";
import UserNav from "../component/user/UserNav";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <main className=" bg-gray1 min-h-[90vh]">
      <div className="w-[1280px] grid grid-cols-[1fr_4fr] mx-auto py-9 gap-4">
        <UserNav />
        {children}
      </div>
    </main>
  );
}

export default layout;
