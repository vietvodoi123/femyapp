'use client'
import React from 'react'
import { Dropdown, Menu } from 'antd'

const PostDropdownOptions = ({ items, children }) => {
  // Tạo menu từ items
  const menu = <Menu items={items}></Menu>

  return <Dropdown overlay={menu}>{children}</Dropdown>
}

export default PostDropdownOptions
