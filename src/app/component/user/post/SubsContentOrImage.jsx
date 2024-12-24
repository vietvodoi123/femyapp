'use client'
import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import Upload1 from '../../ui/Upload1'
import SubsInput from './SubsInput'
const SubsContentOrImage = ({
  content,
  addSub,
  handleChangeSubs,
  handleDeleteSubs,
}) => {
  return (
    <div>
      {addSub == 1 &&
        content.map((subs, i) => {
          return (
            <SubsInput
              key={i}
              index={i}
              // opt là tùy chọn 1,2,3. obj là giá trị
              handleChangeSubs={(opt, obj) => handleChangeSubs(i, opt, obj)}
            />
          )
        })}
      {addSub > 1 &&
        content.map((x, i) => {
          if (typeof x === 'string') {
            return (
              <div key={i} className="flex justify-between items-center">
                <Input
                  placeholder={`Hãy nhập nội dung`}
                  className="border-none text-lg"
                  onChange={(e) => handleChangeSubs(i, 0, e.target.value)}
                />
                <Button htmlType="button">Xóa</Button>
              </div>
            )
          } else {
            return <Upload1 key={i} />
          }
        })}
    </div>
  )
}

export default SubsContentOrImage
