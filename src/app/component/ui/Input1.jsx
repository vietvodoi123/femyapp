import React from 'react'
import { Input } from 'antd'
const Input1 = ({
  label,
  placeholder,
  id,
  type,
  value,
  size,
  setValue,
  width,
}) => {
  return (
    <div className={`w-[${width}px] flex flex-col gap-2 text-base`}>
      <label htmlFor="username" className=" text-white">
        {label}
      </label>
      <Input
        placeholder={placeholder}
        id={id}
        type={type ? type : 'text'}
        size={size}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className=" bg-gray3 placeholder:text-gray-400 text-white py-2 focus:bg-gray3 hover:bg-gray3"
      />
    </div>
  )
}

export default Input1
