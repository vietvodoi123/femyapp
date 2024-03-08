"use client";
import { Button, InputNumber, Rate, message, notification } from "antd";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { CartApi } from "@/api/CartFetcher";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { setCheckout } from "@/app/store/slice/CartSlice";
import { transformMoney } from "@/utils/function/transformMoney";

type Props = {
  item: IItemAndCreator;
};

function DetailsProduct({ item }: Props) {
  const dispatch = useDispatch();
  const route = useRouter();
  const user = useSelector((state: IRootState) => state.user.userCurrent);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantyti] = useState<number>(1);
  const user_id = useSelector(
    (state: IRootState) => state.user.userCurrent?.id
  );
  const addItemToCart = () => {
    setLoading(true);
    if (user_id && item._id) {
      CartApi.addItemToCart({
        user_id: user_id,
        product_id: item._id,
        quantity: quantity || 1,
      })
        .then((d: Message) => {
          message.success(d.message);
        })
        .catch((e) => {
          message.error(e);
        });
    } else {
      message.warning("Hãy đăng nhập để tiếp tục");
      setTimeout(() => {
        route.push("/login");
      }, 1000);
    }
    setLoading(false);
  };

  const handleBuying = () => {
    if (user) {
      dispatch(
        setCheckout([
          {
            key: item.name,
            name: { id: item._id, name: item.name, imageUrl: item.imageUrl },
            shop: { id: item.creatorInfo.id, name: item.creatorInfo.fullName },
            quantity: quantity,
            price: item.price,
            totals: item.price * quantity,
            category: item.category,
          },
        ])
      );
      route.push("/checkout");
    }
  };
  return (
    <div className=" w-[65%]">
      <h3 className=" font-medium text-lg mb-2">{item.name}</h3>
      <div className=" flex justify-start gap-8 py-2 px-3 text-sm">
        <div className="text-red-500 flex items-center">
          <span className=" font-medium mr-2 text-base underline">
            {item.rating === 0 ? 5 : item.rating}
          </span>
          <Rate allowHalf defaultValue={item.rating === 0 ? 5 : item.rating} />
        </div>
        <div>
          <span className=" font-medium mr-2 text-base">{item.unitsSold}</span>
          Đã bán
        </div>
      </div>
      <p className=" text-red-600 text-xl py-3 px-5 bg-gray1">
        {transformMoney(item.price)} vnđ
      </p>
      <div className=" mt-10">
        <div className="flex items-center gap-5 text-sm mb-7">
          <p>Số Lượng:</p>
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={(e) => {
              if (e) {
                setQuantyti(e);
              }
            }}
            size="large"
          />
          <span>{item.countInStock} sản phẩm có sẵn</span>
        </div>
        <div>
          <Button
            icon={<BsCartPlus />}
            size="large"
            onClick={addItemToCart}
            loading={loading}
            className=" bg-red-100 mr-5 border-red-500 border-solid border-[2px] text-red-500"
          >
            Thêm Sản Phẩm Vào Giỏ
          </Button>
          <Button
            className=" bg-red-500 text-white hover:text-white"
            size="large"
            onClick={handleBuying}
          >
            Mua Ngay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsProduct;
