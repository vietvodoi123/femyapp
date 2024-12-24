'use client'
import { Segmented } from 'antd'
import { SegmentedLabeledOption, SegmentedValue } from 'antd/es/segmented'
import React, { Suspense, useState } from 'react'
import ProductsBoard from './ProductsBoard'
import OrderBoard from './OrderBoard'
import AddBoard from './AddBoard'
import UpdateItemContexProvider from '@/app/context/UpdateItemContext'
import AddPost from './AddPost'

function Board() {
  const [key, setKey] = useState<SegmentedValue>('my_products')

  const options: (SegmentedValue | SegmentedLabeledOption)[] = [
    {
      label: 'Sản Phẩm Của Tôi',
      value: 'my_products',
      className: ' py-2 px-4',
    },
    {
      label: 'Quản Lý Đơn Hàng',
      value: 'my_order',
      className: ' py-2 px-4',
    },
    {
      label: 'Thêm Sản Phẩm',
      value: 'add_product',
      className: ' py-2 px-4',
    },
    {
      label: 'Quản Lý Bài Viết',
      value: 'my_posts',
      className: ' py-2 px-4',
    },
    {
      label: 'Thêm Bài Viết',
      value: 'add_post',
      className: ' py-2 px-4',
    },
  ]
  return (
    <section>
      <div className=" bg-white mt-5 p-5 mb-8 border-base-03 rounded-md">
        <Segmented
          value={key}
          onChange={(e) => {
            setKey(e)
          }}
          options={options}
          className=" text-base bg-gray1 mb-3"
        />
      </div>
      <UpdateItemContexProvider>
        <Suspense fallback={<p>loading!!</p>}>
          {key === 'my_products' && <ProductsBoard />}
          {key === 'my_order' && <OrderBoard />}
          {key === 'add_product' && <AddBoard />}
          {key === 'add_post' && <AddPost />}
          {key === 'my_posts' && <div>my_posts</div>}
        </Suspense>
      </UpdateItemContexProvider>
    </section>
  )
}

export default Board
