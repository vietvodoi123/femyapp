import { Menu } from 'antd'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineContactSupport } from 'react-icons/md'
import { IoIosGlobe } from 'react-icons/io'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import React from 'react'

function List() {
  const items: MenuItemType[] = [
    {
      label: 'Thông Báo',
      key: 'thongbao',
      icon: <IoMdNotificationsOutline />,
      style: { marginLeft: 'auto' },
    },
    { label: 'Hỗ Trợ', key: 'hotro', icon: <MdOutlineContactSupport /> },
    {
      label: 'Ngôn Ngữ',
      key: 'ngonngu',
      icon: <IoIosGlobe />,
    },
  ]

  return (
    <Menu
      items={items}
      mode="horizontal"
      className=" border-none w-full bg-inherit !text-white"
    ></Menu>
  )
}

export default List
