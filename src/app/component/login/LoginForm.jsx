'use client'
import { Button, notification, Form } from 'antd'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserApi } from '@/api/UserFetcher'
import { useDispatch } from 'react-redux'
import { login } from '@/app/store/slice/UserSlice'
import Input1 from '@/app/component/ui/Input1'
import * as Yup from 'yup' // Import Yup for validation

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ!')
      .required('Vui lòng nhập địa chỉ email!'),
    password: Yup.string().required('Vui lòng nhập mật khẩu!'),
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      const data = {
        email: values.email,
        password: values.password,
      }
      console.log(data)

      UserApi.login(data)
        .then((data) => {
          console.log(data)

          if (data && 'status' in data && 'email' in data && 'token' in data) {
            dispatch(login(data))
            router.push('/')
            notification.success({
              message: 'Đăng Nhập Thành Công!',
              description: 'Bắt Đầu Mua Sắm Nào!',
            })
          }
        })
        .catch((err) => {
          notification.error({
            message: 'Có Lỗi Xảy Ra!',
          })
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })
  return (
    <Form onFinish={formik.handleSubmit}>
      <Form.Item
        name="email"
        validateStatus={
          formik.touched.email && formik.errors.email ? 'error' : ''
        }
        help={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null
        }
      >
        <Input1
          width={400}
          label="Tài Khoản"
          placeholder="Địa Chỉ Email"
          id="username"
          type="email"
          size="large"
          value={formik.values.email}
          setValue={(x) => formik.setFieldValue('email', x)}
        />
      </Form.Item>

      <Form.Item
        name="password"
        validateStatus={
          formik.touched.password && formik.errors.password ? 'error' : ''
        }
        help={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null
        }
      >
        <Input1
          width={400}
          label="Mật Khẩu"
          placeholder="Nhập Mật Khẩu"
          id="password"
          type="password"
          size="large"
          value={formik.values.password}
          setValue={(x) => formik.setFieldValue('password', x)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={loading}
          className="w-full mt-4 bg-white  "
          size="large"
        >
          {loading ? 'Đang Xử Lý...' : 'Đăng Nhập'}
        </Button>
      </Form.Item>
      <div className=" text-white text-sm">
        <p className=" w-full flex justify-start items-center gap-3 mb-1">
          Bạn Chưa Có Tài Khoản?{' '}
          <Link href="/register" className=" text-left">
            Đăng Ký
          </Link>
        </p>

        <p className=" text-nowrap flex justify-start items-center gap-3">
          Quên Mật Khẩu?{' '}
          <Link href="/forgetpassword" className=" text-left">
            Quên Mật Khẩu
          </Link>
        </p>
      </div>
    </Form>
  )
}

export default LoginForm
