import React from 'react'
import LoginFormOrOtpForm from '@/app/component/login/LoginFormOrOtpForm'
type Props = {}

function page({}: Props) {
  return (
    <main className=" py-3 min-h-[100vh] text-white ">
      <div className=" flex justify-start items-center gap-5 mx-auto w-[1280px]">
        <LoginFormOrOtpForm />

        <div className="mt-5 flex items-end justify-end flex-col w-full">
          <h3 className=" bg-green-600 p-3 w-max rounded-md text-7xl font-bold mb-3">
            My Shop
          </h3>
          <p className="text-sm bg-yellow-500 rounded-md border-solid border-[1px] border-gray1 p-4 w-[500px] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            tempore veritatis ad architecto hic iure quasi beatae sed dicta
            earum similique nobis sequi soluta itaque suscipit voluptates qui,
            doloribus magnam.
          </p>
        </div>
      </div>
    </main>
  )
}

export default page
