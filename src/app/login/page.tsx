"use client";
import { Button, Form, Input, Skeleton, Space, notification } from "antd";
import { FaLock } from "react-icons/fa";
import React, { useState } from "react";
import { useFormik } from "formik";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserApi } from "@/api/UserFetcher";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/UserSlice";

function page() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      const data: ILoginBody = {
        email: values.email,
        password: values.password,
      };
      UserApi.login(data)
        .then((data: Auth | ErrorResponse) => {
          console.log(data);

          if (data && "status" in data && "email" in data && "token" in data) {
            dispatch(login(data));
            router.push("/");
            notification.success({
              message: "Đăng Nhập Thành Công!",
              description: "Bắt Đầu Mua Sắm Nào!",
            });
          }
        })
        .catch((err: ApiResponse<UserData>) => {
          notification.error({
            message: "Có Lỗi Xảy Ra!",
          });
        });
      setLoading(false);
    },
  });
  return (
    <main className="mx-auto w-[1280px] py-10">
      <h2 className=" text-xl font-bold mb-3">Đăng Nhập Vào MyShop</h2>
      <div className=" grid grid-cols-2 gap-5">
        {loading ? (
          <Skeleton />
        ) : (
          <Form
            onFinish={formik.handleSubmit}
            className="mt-5 p-5 bg-gray-100 rounded-lg border-[1px] border-solid border-[#ccc]"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email!",
                  type: "email",
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
                    formik.setFieldValue("email", e.target.value)
                  }
                />
              </Space.Compact>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
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
                    formik.setFieldValue("password", e.target.value)
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
                Đăng Nhập
              </Button>
            </Form.Item>
            <p>
              Bạn Chưa Có Tài Khoản? <Link href="/register">Đăng Ký</Link>
            </p>
            <p>
              Quên Mật Khẩu? <Link href="/forgetpassword">Quên Mật Khẩu</Link>
            </p>
          </Form>
        )}
        <div className="mt-5">
          <p className="text-sm bg-[#d1ecf1] rounded-md border-solid border-[1px] border-gray1 p-4">
            Sau khi đăng ký thành công. Chúng tôi sẽ gửi mã xác minh đến email
            của bạn. Kích hoạt nó bằng cách nhấp vào liên kết được gửi trong
            email của bạn.
          </p>
        </div>
      </div>
    </main>
  );
}

export default page;
