import { Popconfirm, Skeleton } from "antd";
import React, { Suspense, useContext, useState } from "react";
import { Button, message } from "antd";
import { MdEditNote } from "react-icons/md";
import { ItemsApi } from "@/api/ItemsFetccher";
import UpdateItem from "./modal/UpdateItem";
import { transformMoney } from "@/utils/function/transformMoney";

type Props = {
  key?: string;
  item: IItem;
};

function ItemMana({ key, item }: Props) {
  const [open, setOpen] = useState(false);

  // xoa san pham
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    if (item._id) {
      ItemsApi.deleteItem(item._id)
        .then((data: ApiResponse<Message>) => {
          if ("message" in data) {
            message.success(`Xóa Thành Công ${item.name}!`);
          }
        })
        .catch((error) => {
          message.error(error);
        });
    }
  };

  return (
    <div
      key={key}
      className=" grid grid-cols-[3fr_3fr_1fr_1fr_1fr] items-center gap-2 py-4  "
    >
      <div className="flex flex-wrap relative">
        {item.imageUrl.slice(0, 4).map((img, i) => (
          <Suspense key={i} fallback={<Skeleton />}>
            <img width={60} alt={item.name} src={img} />
          </Suspense>
        ))}
        {item.imageUrl.length > 4 && (
          <div className=" absolute right-[72px] w-[60px] h-[60px] top-0 flex items-center justify-center bg-gray-300 text-gray-600 opacity-80">
            +{item.imageUrl.length - 4}
          </div>
        )}
      </div>

      <p className="text-slate-500 overflow-hidden max-h-12">{item.name}</p>
      <p className=" text-red-500">đ{transformMoney(item.price)}</p>
      <p>{item.countInStock}</p>
      <div className=" flex gap-5">
        <Popconfirm
          title="Xóa Sản Phẩm"
          description={`Bạn Muốn Xóa ${item.name}?`}
          onConfirm={confirm}
          // onCancel={cancel}
          okText="Xác Nhận"
          cancelText="Hủy"
          okButtonProps={{
            type: "primary",
            className: " bg-blue-500",
          }}
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
        <Button
          size="small"
          icon={<MdEditNote />}
          onClick={() => {
            setOpen(true);
          }}
        ></Button>
      </div>
      <UpdateItem open={open} setOpen={setOpen} item={item} />
    </div>
  );
}

export default ItemMana;
