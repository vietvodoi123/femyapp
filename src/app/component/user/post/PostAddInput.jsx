'use client'
import React, { useEffect, useState } from 'react'
import { Form, Button, Input, Dropdown } from 'antd'

import AddInputSecs from './AddInputSecs'

const PostAddInput = () => {
  const [content, setContent] = useState([])

  const handleAddSection = () => {
    setContent([...content, { title: '', content: [] }])
  }

  const handleDeleSection = (indexToRemove) => {
    if (indexToRemove > -1 && indexToRemove < content.length) {
      const newContent = [...content]
      newContent.splice(indexToRemove, 1)
      setContent(newContent)
    }
  }

  const handleChangeInput = (indexInput, opt, obj) => {
    const newContent = [...content]
    if (opt) {
      // opt=true thì title đang được thay đổi
      newContent[indexInput].title = obj
    } else {
      // opt bằng false thì content đang thay đổi
      newContent[indexInput].content = obj
    }
    setContent(newContent)
  }

  useEffect(() => {
    console.log(content)
  }, [content])

  // section gồm tên section và content

  return (
    <div>
      {content.map((secstion, i) => (
        <AddInputSecs
          key={i}
          i={i}
          data={secstion}
          handleChangeSection={(string, opt) =>
            handleChangeInput(i, opt, string)
          }
          handleDeleSection={() => handleDeleSection(i)}
        />
      ))}
      <div>
        <Button
          className="w-full py-3"
          htmlType="button"
          onClick={handleAddSection}
        >
          Thêm Thành Phần
        </Button>
      </div>
    </div>
  )
}

export default PostAddInput
