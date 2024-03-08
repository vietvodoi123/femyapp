"use client";
import { Form, Input, Modal, message } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import Upload from "../Upload";
import { UserApi } from "@/api/UserFetcher";
import { useDispatch } from "react-redux";
import { login } from "@/app/store/slice/UserSlice";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  user?: Auth;
};

function UpdateUser({ user, open, setOpen }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName ? user.fullName : undefined,
      avatar: user?.avatar,
    },
    onSubmit: (values) => {
      setLoading(true);
      const data: IUpdateMe = {};
      if (values.fullName) {
        data["fullName"] = values.fullName;
      }
      if (uploadedUrls.length > 0) {
        data.avatar = uploadedUrls[0];
      }
      if (user?.id) {
        UserApi.updateMe(user.id, data)
          .then((d: IUpdated) => {
            dispatch(login(d.user));
          })
          .catch((err) => {
            message.error(err);
          });
      }
      setLoading(false);
    },
  });
  return (
    <Modal
      title="Chỉnh Sửa Hồ Sơ"
      open={open}
      onOk={() => {
        formik.handleSubmit();
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
      okText="Xác Nhận"
      okButtonProps={{
        type: "primary",
        className: "bg-blue-500",
        loading: loading,
      }}
    >
      <Form>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Tên không được bỏ trống!",
            },
            {
              min: 6,
              message: "Tên tối thiểu 6 kí tự!",
            },
            {
              max: 50,
              message: "Tên tối đa 50 kí tự!",
            },
          ]}
        >
          <Input
            placeholder="Tên đầy đủ"
            type="text"
            size="large"
            value={formik.values.fullName}
            onChange={(e) => formik.setFieldValue("fullName", e.target.value)}
          />
        </Form.Item>

        <div className="flex items-center gap-7 ">
          <p className=" text-sm mb-4"> Avatar:</p>
          <Upload
            setUploadedUrls={setUploadedUrls}
            uploadedUrls={uploadedUrls}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateUser;
