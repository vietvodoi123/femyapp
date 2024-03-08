import React, { createContext, useState } from "react";

export const UpdateItemContex = createContext<IUpdateItemOptions>({
  setItemUpdate: () => {},
  setItemForUpdate: () => {},
});

export default function UpdateItemContexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [itemUpdate, setItemUpdate] = useState<IItem | undefined>();

  const setItemForUpdate = (item: IItem) => {
    setItemUpdate(item);
  };

  const sharedData: IUpdateItemOptions = {
    itemUpdate,
    setItemUpdate,
    setItemForUpdate,
  };
  return (
    <UpdateItemContex.Provider value={sharedData}>
      {children}
    </UpdateItemContex.Provider>
  );
}
