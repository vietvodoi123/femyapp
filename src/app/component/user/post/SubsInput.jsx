'use client'
import React from 'react'
import { Input, Button } from 'antd'
import PostDropdownOptions from './PostDropdownOptions'
import { BsThreeDotsVertical } from 'react-icons/bs'

const SubsInput = ({}) => {
  const itemsDropdown = [
    {
      key: 'add content',
      label: 'Thêm nội dung',
      // onClick: handleAddContent,
    },
    {
      key: 'add image',
      label: 'Thêm hình ảnh',
      // onClick: handleAddImage,
    },
    {
      key: 'delete',
      label: 'Xóa',
      // onClick: () => {
      //   handleDeleSection()
      // },
    },
  ]
  return (
    <div className="flex justify-between items-center">
      <Input
        id={`substions-${index}`}
        placeholder={`Hãy nhập tên mục thứ ${index + 1} của bài viết`}
        className="border-none"
        // onChange={(e) => handleChangeInputSub(i, e.target.value)}
      />
      <PostDropdownOptions items={itemsDropdown}>
        <BsThreeDotsVertical size={24} />
      </PostDropdownOptions>
    </div>
  )
}

export default SubsInput
