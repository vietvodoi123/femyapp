'use client'
import { ItemsApi } from '@/api/ItemsFetccher'
import Loading from '@/app/Loading'
import { Skeleton, notification } from 'antd'
import React, { Suspense, useEffect, useState } from 'react'
import Item from '../ui/Item'

function ShortDetail({ long_desc, short_desc, category }) {
  return (
    <div className="p-5 bg-white text-sm  border-base-03">
      <div>
        <h3 className=" bg-gray1 p-3 text-lg font-medium border-base-03">
          CHI TIẾT SẢN PHẨM
        </h3>
        <div className="px-3 py-8">
          <p className=" flex justify-start items-center gap-7 mb-3">
            Loại sản phẩm: <span className=" text-blue-500">{category}</span>
          </p>
          <p className=" flex justify-start items-center gap-20">
            Chi tiết: <span>{short_desc}</span>
          </p>
        </div>
      </div>
      <div>
        <h3 className=" bg-gray1 p-3 text-lg font-medium border-base-03">
          MÔ TẢ SẢN PHẨM
        </h3>
        <p className="px-3 py-8 leading-[1.5]">{long_desc}</p>
      </div>
    </div>
  )
}

export default ShortDetail
