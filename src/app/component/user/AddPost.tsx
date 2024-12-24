'use client'
import { Form, Input, Button } from 'antd'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Uppload1 from '@/app/component/ui/Upload1'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { LuShoppingBag } from 'react-icons/lu'
import { LuImagePlus } from 'react-icons/lu'
import { MdDeleteForever } from 'react-icons/md'
import Image from 'next/image'
import PostAddInput from './post/PostAddInput'

const AddPost = () => {
  const [imageUrl, setImageUrl] = useState(undefined)
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Hãy Nhập Tiêu Đề Của Bài Viết!')
      .min(10, 'Tiêu đề của bạn quá ngắn'),
    introduction: Yup.string()
      .required('Hãy nhập tổng quan bài viết')
      .min(10, 'Tổng quan bài viết của bạn quá ngắn'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema,
    onSubmit: (values) => {},
  })
  return (
    <div className=" bg-white border-base-03 rounded-md p-6">
      <Form>
        <Form.Item>
          {!imageUrl ? (
            <Uppload1 imageUrl={imageUrl} setImageUrl={setImageUrl} />
          ) : (
            <div className="relative">
              <Image
                src={imageUrl}
                layout="responsive"
                width={100}
                height={60}
                alt=""
                className="peer"
              />
              <div className="absolute hidden peer-hover:flex peer-hover:bg-black opacity-60 z-20 w-full h-full top-0  justify-center items-center">
                <Button
                  htmlType="button"
                  size="large"
                  className="h-[100px] border-none text-white cursor-pointer text-[74px]"
                >
                  <MdDeleteForever />
                </Button>
              </div>
            </div>
          )}
        </Form.Item>
        <Form.Item name="title">
          <Input
            id="title"
            size="large"
            placeholder="Hãy Nhập Têu Đề Của Bài Viết"
            className=" border-none text-2xl"
          />
        </Form.Item>
        <Form.Item name="introduction">
          <Input
            id="introduction"
            placeholder="Nội dung giới thiệu bài viết"
            className=" border-none "
          />
        </Form.Item>
        <PostAddInput />
        {/* <Form.Item>
          <div className=" flex items-center gap-2">
            <Button
              htmlType="button"
              title="Thêm Hình Ảnh"
              className=" border-2 border-solid border-gray-200 py-1 !hover:border-primary hover:text-primary"
            >
              <LuImagePlus size={18} className=" text-gray-300 " />
            </Button>
            <Button
              htmlType="button"
              title="Đính Kém Sản Phẩm"
              className=" border-2 border-solid border-gray-200 py-1 !hover:border-primary hover:text-primary"
            >
              <LuShoppingBag size={18} className=" text-gray-300 " />
            </Button>
           
          </div>
        </Form.Item> */}
      </Form>
    </div>
  )
}

export default AddPost
