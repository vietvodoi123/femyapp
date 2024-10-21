'use client'
import { Button, Form, notification } from 'antd'

import React, { useState } from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { UserApi } from '@/api/UserFetcher'

import Input1 from '../ui/Input1'
import * as Yup from 'yup'

const RegisterForm = ({ nextStep }) => {
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Vui lòng nhập Tên Người Dùng!'),
    email: Yup.string()
      .email('Email không hợp lệ!')
      .required('Vui lòng nhập địa chỉ email!'),
    password: Yup.string().required('Vui lòng nhập mật khẩu!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp!')
      .required('Vui lòng nhập lại mật khẩu!'),
  })

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      const create = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      }
      console.log(create)

      UserApi.signup(create)
        .then((data) => {
          notification.success({
            message: 'Đăng Ký Thành Công!',
            description: 'Hãy Xác Thực Tài Khoản Của Bạn!',
          })
          nextStep(create.email)
        })
        .catch((err) => {
          console.log(err)
          notification.error({
            message: 'Có Lỗi Xảy Ra!',
            description: 'Hãy Kiểm Tra Lại!',
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
        name="fullName"
        validateStatus={
          formik.errors.fullName && formik.touched.fullName ? 'error' : ''
        }
        help={
          formik.errors.fullName && formik.touched.fullName
            ? formik.errors.fullName
            : null
        }
      >
        <Input1
          width={400}
          label="Họ và Tên"
          placeholder="Họ và tên đầy đủ"
          id="ho-ten"
          size="large"
          value={formik.values.fullName}
          setValue={(x) => {
            formik.setFieldValue('fullName', x)
          }}
        />
      </Form.Item>
      <Form.Item
        name="email"
        validateStatus={
          formik.errors.email && formik.touched.email ? 'error' : ''
        }
        help={
          formik.errors.email && formik.touched.email
            ? formik.errors.email
            : null
        }
      >
        <Input1
          width={400}
          label="Email"
          placeholder="Địa Chỉ Email"
          id="email"
          type="email"
          size="large"
          value={formik.values.email}
          setValue={(x) => formik.setFieldValue('email', x)}
        />
      </Form.Item>

      <Form.Item
        name="password"
        validateStatus={
          formik.errors.password && formik.touched.password ? 'error' : ''
        }
        help={
          formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null
        }
      >
        <Input1
          width={400}
          label=" Mật Khẩu"
          placeholder="Hãy nhập mật khẩu"
          id="password"
          type="password"
          size="large"
          value={formik.values.password}
          setValue={(x) => formik.setFieldValue('password', x)}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        validateStatus={
          formik.errors.confirmPassword && formik.touched.confirmPassword
            ? 'error'
            : ''
        }
        help={
          formik.errors.confirmPassword && formik.touched.confirmPassword
            ? formik.errors.confirmPassword
            : null
        }
      >
        <Input1
          width={400}
          label="Xác Nhận Mật Khẩu"
          placeholder="Hãy nhập lại mật khẩu"
          id="confirmPassword"
          type="password"
          size="large"
          value={formik.values.confirmPassword}
          setValue={(x) => formik.setFieldValue('confirmPassword', x)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          className="w-full mt-4 bg-white  "
          size="large"
          loading={loading}
        >
          {loading ? 'Đang Xử Lý...' : 'Đăng Ký'}
        </Button>
      </Form.Item>
      <p className=" text-white flex items-center gap-3">
        Bạn Đã Có Tài Khoản? <Link href="/login">Đăng Nhập</Link>
      </p>
    </Form>
  )
}

export default RegisterForm
