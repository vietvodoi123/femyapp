'use client'
import { Button, Form, Input, Skeleton, Space, notification } from 'antd'
import { FaLock } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { IoMdMail } from 'react-icons/io'
import Link from 'next/link'
import { UserApi } from '@/api/UserFetcher'
import { useRouter } from 'next/navigation'
type Props = {}

function page({}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      setLoading(true)
      const create: IUserCreate = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      }
      UserApi.signup(create)
        .then((data) => {
          console.log(data)
          notification.success({
            message: 'Đăng Ký Thành Công!',
            description: 'Hãy Đăng Nhập Để Tiếp Tục!',
          })
          router.push('/login')
        })
        .catch((err) => {
          console.log(err)
          notification.error({
            message: 'Có Lỗi Xảy Ra!',
            description: 'Hãy Kiểm Tra Lại!',
          })
        })
      setLoading(false)
    },
  })
  return (
    <main className="mx-auto w-[1280px] py-10 h-[90vh]">
      <h2 className=" text-xl font-bold mb-3">Đăng Ký Tài Khoản</h2>
      <p className=" text-sm">Bắt Đầu Tạo Tài Khoản Miễn Phí!</p>
      <div className=" grid grid-cols-2 gap-5">
        {loading ? (
          <Skeleton />
        ) : (
          <Form
            onFinish={formik.handleSubmit}
            className="mt-5 p-5 bg-gray-100 rounded-lg border-[1px] border-solid border-[#ccc]"
          >
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Tên Người Dùng!',
                },
              ]}
            >
              <Space.Compact className="w-full">
                <Input
                  addonBefore={<FaUser />}
                  placeholder="Nhập Tên Người Dùng"
                  type="text"
                  size="large"
                  value={formik.values.fullName}
                  onChange={(e) =>
                    formik.setFieldValue('fullName', e.target.value)
                  }
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ email!',
                  type: 'email',
                },
              ]}
            >
              <Space.Compact className="w-full">
                <Input
                  addonBefore={<IoMdMail />}
                  placeholder="Địa Chỉ Email"
                  type="email"
                  size="large"
                  value={formik.values.email}
                  onChange={(e) =>
                    formik.setFieldValue('email', e.target.value)
                  }
                />
              </Space.Compact>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
            >
              <Space.Compact className="w-full">
                <Input
                  addonBefore={<FaLock />}
                  placeholder="Nhập Mật Khẩu"
                  type="password"
                  size="large"
                  value={formik.values.password}
                  onChange={(e) =>
                    formik.setFieldValue('password', e.target.value)
                  }
                />
              </Space.Compact>
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                },
                {
                  validator: (_, value) => {
                    if (value !== formik.values.password) {
                      return Promise.reject('Mật khẩu không khớp!')
                    }
                    return Promise.resolve()
                  },
                },
              ]}
            >
              <Space.Compact className="w-full">
                <Input
                  addonBefore={<FaLock />}
                  placeholder="Nhập Lại Mật Khẩu"
                  type="password"
                  size="large"
                  value={formik.values.confirmPassword}
                  onChange={(e) =>
                    formik.setFieldValue('confirmPassword', e.target.value)
                  }
                />
              </Space.Compact>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full mt-4 bg-blue-500 relative before:absolute before:left-0 before:right-0 before:-top-4 before:contents=[''] before:w-full before:h-[1.5px] before:bg-[#ccc]"
                size="large"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <p>
              Bạn Đã Có Tài Khoản? <Link href="/login">Đăng Nhập</Link>
            </p>
          </Form>
        )}
        <div className="mt-5">
          <p className=" text-sm bg-[#d1ecf1] rounded-md border-solid border-[1px] border-gray1 p-4">
            Sau khi đăng ký thành công. Chúng tôi sẽ gửi mã xác minh đến email
            của bạn. Kích hoạt nó bằng cách nhấp vào liên kết được gửi trong
            email của bạn.
          </p>
        </div>
      </div>
    </main>
  )
}

export default page
