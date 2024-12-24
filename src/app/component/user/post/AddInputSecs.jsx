'use client'
import React, { useState, useEffect } from 'react'
import PostDropdownOptions from './PostDropdownOptions'
import { Input } from 'antd'
import { BsThreeDotsVertical } from 'react-icons/bs'
import SubsContentOrImage from './SubsContentOrImage'

const AddInputSecs = ({ i, handleDeleSection, data, handleChangeSection }) => {
  // data gồm title, content
  const [addSub, setAddSub] = useState(0)
  // content = data.content

  const handleAddSub = () => {
    setAddSub(1)
    const sectionContent = data.content
    handleChangeSection([...sectionContent, { title: '', content: [] }], false)
  }

  const handleAddContent = () => {
    if (addSub != 2) {
      setAddSub(2)
    }
    const sectionContent = data.content
    handleChangeSection([...sectionContent, ''], false)
    // setContent([...content, ''])
  }
  const handleAddImage = () => {
    if (addSub != 3) {
      setAddSub(3)
    }
    const sectionContent = data.content
    handleChangeSection([...sectionContent, ''], false)
  }

  const handleDeleteSubs = (indexToRemove) => {
    if (indexToRemove > -1 && indexToRemove < content.length) {
      const newContent = [...content]
      newContent.splice(indexToRemove, 1)
      handleChangeSection(newContent, false)
      if (content.length == 1) {
        setAddSub(0)
      }
    }
  }

  const [itemsDropdown, setItemDropdown] = useState([
    {
      key: 'add substions',
      label: 'Thêm phân mục',
      onClick: handleAddSub,
    },
    {
      key: 'add content',
      label: 'Thêm nội dung',
      onClick: handleAddContent,
    },
    {
      key: 'add image',
      label: 'Thêm hình ảnh',
      onClick: handleAddImage,
    },

    {
      key: 'delete',
      label: 'Xóa',
      onClick: () => {
        handleDeleSection()
      },
    },
  ])

  useEffect(() => {
    if (addSub == 1) {
      setItemDropdown([
        {
          key: 'add substions',
          label: 'Thêm phân mục',
          onClick: handleAddSub,
        },

        {
          key: 'delete',
          label: 'Xóa',
          onClick: handleDeleSection,
        },
      ])
    }
    if (addSub > 1) {
      setItemDropdown([
        {
          key: 'add content',
          label: 'Thêm nội dung',
          onClick: handleAddContent,
        },
        {
          key: 'add image',
          label: 'Thêm hình ảnh',
          onClick: handleAddImage,
        },

        {
          key: 'delete',
          label: 'Xóa',
          onClick: handleDeleSection,
        },
      ])
    }
    if (addSub === 0) {
      setItemDropdown([
        {
          key: 'add substions',
          label: 'Thêm phân mục',
          onClick: handleAddSub,
        },
        {
          key: 'add content',
          label: 'Thêm nội dung',
          onClick: handleAddContent,
        },
        {
          key: 'add image',
          label: 'Thêm hình ảnh',
          onClick: handleAddImage,
        },

        {
          key: 'delete',
          label: 'Xóa',
          onClick: handleDeleSection,
        },
      ])
    }
  }, [addSub])

  const handleChangeSubs = (index, opt, obj) => {
    const sectionContent = data.content

    if (opt == 0) {
      // opt = 0 trong trường hợp thêm nội dung hoặc hình ảnh mà ko thêm mục
      sectionContent[index] = obj
    } else if (opt == 1) {
      //opt=1 khi thay đổi title mục
      sectionContent[index].title = obj
    }
    if (opt == 2) {
      sectionContent[index].content = obj
    }

    handleChangeSection(sectionContent, false)
  }

  return (
    <div className="mb-4 transition-all duration-500 transform">
      <div className="flex justify-between items-center mb-3">
        <Input
          id={`sections-${i}`}
          size="large"
          placeholder={`Hãy nhập tên thành phần ${i + 1} của bài viết`}
          className="border-none text-xl"
          // đây sẽ nhận vào title
          // handleChangeSection(string, opt) với opt=true tức là đang thay đổi title
          onChange={(e) => handleChangeSection(e.target.value, true)}
        />
        <PostDropdownOptions items={itemsDropdown}>
          <BsThreeDotsVertical size={24} />
        </PostDropdownOptions>
      </div>
      {/* đây sẽ nhận vào content */}
      <SubsContentOrImage
        content={data.content}
        addSub={addSub}
        handleChangeSubs={handleChangeSubs}
        handleDeleteSubs={handleDeleteSubs}
      />
    </div>
  )
}

export default AddInputSecs
