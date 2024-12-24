'use client'
import { Button, Input, Menu } from 'antd'

import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'

type Props = {
  setOrder: (vlaue: string) => void
  setSearchKey: (vlaue: string) => void
}

function OrderNav({ setOrder, setSearchKey }: Props) {
  const [selectKey, setSelectKey] = useState<string>('all')
  useEffect(() => {
    setOrder(selectKey)
  }, [selectKey])

  const items = [
    {
      label: (
        <Button type="text" className="">
          Tất cả
        </Button>
      ),
      key: 'all',
    },
    {
      label: (
        <Button type="text" className="">
          Chờ Xử lý
        </Button>
      ),
      key: 'Pending',
    },
    {
      label: (
        <Button type="text" className="">
          Đang chuẩn bị hàng
        </Button>
      ),
      key: 'Processing',
    },
    {
      label: (
        <Button type="text" className="">
          Đang vận chuyển
        </Button>
      ),
      key: 'Shipped',
    },

    {
      label: (
        <Button type="text" className="">
          Đã giao thành công
        </Button>
      ),
      key: 'Delivered',
    },
    {
      label: (
        <Button type="text" className="">
          Đã hủy
        </Button>
      ),
      key: 'Cancelled',
    },
  ]
  return (
    <header>
      <Menu
        selectedKeys={[selectKey]}
        onClick={(item) => {
          setSelectKey(item.key)
        }}
        items={items}
        mode="horizontal"
        className=""
      />
      <Input
        className=" mt-3"
        size="large"
        addonBefore={<IoMdSearch />}
        placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </header>
  )
}

export default OrderNav
