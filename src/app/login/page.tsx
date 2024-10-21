import React from 'react'
import LoginForm from '@/app/component/login/LoginForm'

function page() {
  return (
    <main className=" py-10 h-[90vh] text-white ">
      <div className=" flex justify-start items-center gap-5 mx-auto w-[1280px]">
        <div className="mt-5  p-10 rounded-lg bg-gray2 border-white border-[1px] border-solid shadow-2xl relative">
          <h2 className=" text-3xl  mb-3  text-center">Đăng Nhập </h2>
          <LoginForm />
          <div className=" absolute -z-[1] w-[300px] h-[300px] -right-[150px] -top-[50px] bg-orange-500 rounded-full"></div>
          <div className=" absolute -z-[1] w-[200px] h-[200px] -right-[70px] top-[150px] bg-blue-500 rounded-full"></div>
        </div>
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
