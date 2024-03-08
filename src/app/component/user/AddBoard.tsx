"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, Space, notification } from "antd";
import { useFormik } from "formik";
import Upload from "../ui/Upload";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store/store";
import { items } from "@/utils/dummyData";
import { ItemsApi } from "@/api/ItemsFetccher";

const AddBoard = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const userId = useSelector((state: IRootState) => state.user.userCurrent?.id);
  const formik = useFormik({
    initialValues: {
      name: "",
      long_desc: "",
      short_desc: "",
      price: 0,
      category: "thoitrang",
      countInStock: 0,
      imageUrl: [],
      unitsSold: 0,
      creatorId: userId,
    },
    onSubmit: (values) => {
      setLoading(true);
      const data: ICreateItem = {
        name: values.name,
        long_desc: values.long_desc,
        short_desc: values.short_desc,
        category: values.category ? values.category : "thoitrang",
        price: values.price,
        countInStock: values.countInStock,
        imageUrl: uploadedUrls,
        creatorId: values.creatorId,
      };
      ItemsApi.createItems(data)
        .then((mes: IMes | IError) => {
          if ("message" in mes) {
            notification.success({
              message: mes.message,
            });
          } else {
            notification.error({
              message: mes.error,
            });
          }
        })
        .catch((err: IError) => {
          notification.error({
            message: err.error,
          });
        });
      setLoading(false);
    },
  });

  return (
    <Form onFinish={formik.handleSubmit} className=" mt-8 bg-white p-6">
      <Form.Item name="name">
        <Space.Compact className="w-full grid grid-cols-[1fr_5fr] items-center">
          <label htmlFor="name" className=" font-medium text-lg ">
            Tên Sản Phẩm
          </label>
          <Input
            placeholder="Tên Sản Phẩm"
            type="text"
            size="large"
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
        </Space.Compact>
      </Form.Item>
      <Form.Item name="long_desc">
        <Space.Compact className="w-full grid grid-cols-[1fr_5fr] items-center">
          <label htmlFor="long_desc" className=" font-medium text-lg ">
            Mô Tả Sản Phẩm
          </label>
          <Input.TextArea
            placeholder="Mô Tả Sản Phẩm"
            size="large"
            value={formik.values.long_desc}
            onChange={(e) => formik.setFieldValue("long_desc", e.target.value)}
          />
        </Space.Compact>
      </Form.Item>
      <Form.Item name="short_desc">
        <Space.Compact className="w-full grid grid-cols-[1fr_5fr] items-center">
          <label htmlFor="short_desc" className=" font-medium text-lg ">
            Ghi Chú
          </label>
          <Input.TextArea
            placeholder="Ghi Chú"
            size="large"
            value={formik.values.short_desc}
            onChange={(e) => formik.setFieldValue("short_desc", e.target.value)}
          />
        </Space.Compact>
      </Form.Item>
      <Space wrap className="w-full grid grid-cols-[1fr_5fr] items-center mb-5">
        <label htmlFor="category" className=" font-medium text-lg ">
          Loại Sản Phẩm
        </label>
        <Select
          id="category"
          defaultValue={"thoitrang"}
          style={{ width: 200 }}
          onChange={(value: string) => formik.setFieldValue("category", value)}
          options={items.map((item) => ({
            label: item.label,
            value: item.key,
          }))}
        />
      </Space>

      <div className="grid grid-cols-2 gap-5">
        <Form.Item name="price">
          <Space.Compact className="w-full grid grid-cols-[2.5fr_5fr] items-center gap-2 ">
            <label htmlFor="price" className=" font-medium text-lg ">
              Giá Sản Phẩm
            </label>
            <Input
              placeholder="Giá Sản Phẩm"
              type="number"
              size="large"
              value={formik.values.price}
              defaultValue={0}
              onChange={(e) =>
                formik.setFieldValue("price", parseInt(e.target.value))
              }
            />
          </Space.Compact>
        </Form.Item>

        <Form.Item name="countInStock">
          <Space.Compact className="w-full grid grid-cols-[2.5fr_5fr] items-center gap-2 ">
            <label htmlFor="countInStock" className=" font-medium text-lg ">
              Số Lượng Hiện Có
            </label>
            <Input
              placeholder="Sản Phẩm Hiện Có"
              type="number"
              size="large"
              defaultValue={0}
              value={formik.values.countInStock}
              onChange={(e) => {
                console.log(
                  e.target.value,
                  typeof e.target.value,
                  parseInt(e.target.value),
                  typeof parseInt(e.target.value)
                );

                formik.setFieldValue("countInStock", parseInt(e.target.value));
              }}
            />
          </Space.Compact>
        </Form.Item>
      </div>
      <Form.Item>
        <Space.Compact className="w-full grid grid-cols-[1fr_5fr] items-center">
          <label className=" font-medium text-lg mb-5">Hình Ảnh Mô Tả</label>
          <Upload
            setUploadedUrls={setUploadedUrls}
            uploadedUrls={uploadedUrls}
          />
        </Space.Compact>
      </Form.Item>
      <div className=" flex justify-end">
        <Button
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
          className=" bg-blue-500"
        >
          Thêm Sản Phẩm
        </Button>
      </div>
    </Form>
  );
};

export default AddBoard;
