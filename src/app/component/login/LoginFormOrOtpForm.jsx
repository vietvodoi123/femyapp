'use client'
import React, { useEffect, useState } from 'react'
import RegisterForm from './RegisterForm'
import { SendOtpApi } from '@/api/SendOtp'
import { Statistic, Button } from 'antd'
import OtpForm from './OtpForm'

const { Countdown } = Statistic

const LoginFormOrOtpForm = () => {
  let deadline = Date.now() + 1000 * 60*5
  const [step, setStep] = useState(undefined)
  const [isAbleButton, setIsAbleButton] = useState(false)
  const sendOtp = () => {
    console.log(step)
    setIsAbleButton(false)
    deadline = Date.now() + 1000 * 60
    if (step) {
      SendOtpApi.sendOtp({ email: step })
        .then((d) => {
          console.log(d)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    sendOtp()
  }, [step])
  return (
    <div className="mt-5  p-10 rounded-lg bg-gray2 border-white border-[1px] border-solid shadow-2xl relative">
      <div className=" mb-6">
        <h2 className=" text-3xl mb-2 text-center text-nowrap">
          {!step ? 'Đăng Ký Tài Khoản' : 'Xác Thực Tài Khoản'}
        </h2>
        <p className=" text-sm  text-center">
          {!step ? 'Bắt Đầu Tạo Tài Khoản Miễn Phí!' : `Mã OTP đã được gửi vào`}{' '}
          {step && <span className=" font-bold">{step.split('@')[0]}</span>}
        </p>
      </div>
      {!step ? (
        <RegisterForm nextStep={(x) => setStep(x)} />
      ) : (
        <>
          <OtpForm email={step} isAbleButton={isAbleButton} />
          {!isAbleButton ? (
            <p className="flex items-center justify-start gap-4 text-sm">
              OTP có hiệu lực trong:
              <Countdown
                value={deadline}
                format="mm:ss"
                onFinish={() => setIsAbleButton(true)}
                valueStyle={{ fontSize: '14px' }}
                className=" w-min  h-min"
              />
            </p>
          ) : (
            <Button
              className="w-full mt-4 bg-white  "
              size="large"
              onClick={() => sendOtp()}
            >
              Gửi lại otp
            </Button>
          )}
        </>
      )}

      <div className=" absolute -z-[1] w-[300px] h-[300px] -right-[150px] -top-[50px] bg-orange-500 rounded-full"></div>
      <div className=" absolute -z-[1] w-[200px] h-[200px] -right-[70px] top-[150px] bg-blue-500 rounded-full"></div>
    </div>
  )
}

export default LoginFormOrOtpForm
