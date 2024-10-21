'use client'
import React, { useState } from 'react'
import { Input, Form, Button, message } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SendOtpApi } from '@/api/SendOtp'
import { useRouter } from 'next/navigation'

const OtpForm = ({ email, isAbleButton }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, 'OTP must be 6 digits')
      .required('Please enter the OTP'),
  })

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      if (email) {
        SendOtpApi.verifyOtp({ email, otp: values.otp })
          .then((data) => {
            router.push('/login')
            message.success(data)
          })
          .catch((err) => {
            message.error(err)
          })
          .finally(() => setLoading(false))
      } else {
        setLoading(false)
        message.error('Có lỗi đã xảy ra! hãy thử lại sau')
      }
    },
  })
  return (
    <Form onFinish={formik.handleSubmit}>
      <Form.Item
        validateStatus={formik.errors.otp && formik.touched.otp ? 'error' : ''}
        help={
          formik.errors.otp && formik.touched.otp ? formik.errors.otp : null
        }
      >
        <Input.OTP
          disabled={loading || isAbleButton}
          length={6}
          size="large"
          onChange={(e) => formik.setFieldValue('otp', e)}
          className=" bg-gray3"
        />
      </Form.Item>
      {!isAbleButton && (
        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full mt-4 bg-white  "
            size="large"
          >
            Xác Nhận
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

export default OtpForm
