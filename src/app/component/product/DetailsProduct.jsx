import React from 'react'
import AddAndBuyProduct from '@/app/component/product/AddAndBuyProduct'
import { transformMoney } from '@/utils/function/transformMoney'
import Rating from '@/app/component/ui/Rating'

function DetailsProduct({ item }) {
  return (
    <div className=" w-[65%]">
      <h3 className=" font-medium text-xl mb-2 px-3">{item.name}</h3>
      <div className=" flex justify-start gap-8 py-2 px-3 text-sm">
        <div className="text-red-500 flex items-center">
          <span className=" font-medium mr-2 text-base underline">
            {item.rating === 0 ? 5 : item.rating}
          </span>
          <Rating rating={item.rating} />
        </div>
        <div>
          <span className=" font-medium mr-2 text-base">{item.unitsSold}</span>
          Đã bán
        </div>
      </div>
      <p className=" text-red-600 text-xl py-3 px-5 bg-gray1 border-base-03">
        {transformMoney(item.price)} vnđ
      </p>
      <AddAndBuyProduct item={item} />
    </div>
  )
}

export default DetailsProduct
