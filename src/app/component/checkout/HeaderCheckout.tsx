"use client";
import { IRootState } from "@/app/store/store";
import { Input } from "antd";
import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

type Props = {
  setAddress: (value: string) => void;
  setPhone: (values: string) => void;
};

function HeaderCheckout({ setAddress, setPhone }: Props) {
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setPhoneError("Số điện thoại không được bỏ trống!");
    } else {
      setPhoneError("");
    }
    setPhone(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setAddressError("Địa chỉ không được bỏ trống!");
    } else {
      setAddressError("");
    }
    setAddress(value);
  };
  const user_name = useSelector(
    (state: IRootState) => state.user.userCurrent?.fullName
  );
  return (
    <section className=" bg-white p-6 border-t-2 border-dashed border-blue-500 my-5">
      <h3 className=" text-blue-500 text-xl flex justify-start items-center gap-3 mb-5">
        <FaMapMarkerAlt className=" text-blue-500" />
        Địa Chỉ Nhận Hàng
      </h3>
      <div className=" flex justify-between items-center gap-5">
        <p className=" w-[200px] font-medium text-base">{user_name}</p>
        <div className="w-[300px] relative">
          <Input
            required
            type="phone"
            placeholder="Vui lòng nhập số điện thoại"
            onChange={handlePhoneChange}
          />
          <p className=" absolute top-full text-red-500 text-sm">
            {phoneError}
          </p>
        </div>
        <div className=" w-full relative">
          <Input
            required
            type="text"
            placeholder="Vui lòng nhập địa chỉ"
            onChange={handleAddressChange}
          />
          <p className="absolute top-full text-red-500 text-sm">
            {addressError}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeaderCheckout;
