'use client'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { Skeleton } from 'antd'
import { useRouter } from 'next/navigation'
import { transformMoney } from '@/utils/function/transformMoney'

type Props = {
  item: IItem
}

function Item({ item }: Props) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/product/${item._id}`)}
      key={item._id}
      className=" bg-white hover:border-solid hover:border-[0.3px] hover:border-blue-500 shadow-sm relative cursor-pointer border-solid border-[0.3px] border-gray-200"
    >
      <p className=" absolute left-[-3px] top-3 bg-red-500 text-[10px] text-white py-[2px] px-2">
        Yêu Thích
      </p>
      <p className=" absolute right-0 top-0 bg-yellow-300 text-white text-xs py-1 px-2 opacity-90">
        -20%
      </p>
      <div className="w-full h-[200px] flex items-center justify-center">
        <Image
          src={item.imageUrl[0]}
          alt={item.name}
          width={200}
          height={200}
          layout="fixed"
          objectFit="contain"
          className="h-full"
        />
      </div>

      <div className=" p-2 text-sm">
        <p className=" line-clamp-2 mb-1 min-h-[2em]">{item.name}</p>

        <div className="  h-[25px] flex justify-start items-center gap-2">
          <span className=" bg-orange-500 text-white text-[10px]  px-2">
            Giảm 30K
          </span>
          <span className=" text-red-500 border-solid border-red-500 border-[0.5px] text-[10px]  px-2">
            Flash Sale
          </span>
        </div>
        <div className=" relative h-[30px] flex items-center">
          <span className=" text-red-500">{transformMoney(item.price)}đ</span>
          <span className=" ml-auto text-xs">Đã Bán: {item.unitsSold}</span>
        </div>
      </div>
    </div>
  )
}

export default Item
