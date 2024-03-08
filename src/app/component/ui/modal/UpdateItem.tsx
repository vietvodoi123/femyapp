"use client";
import { Button, Form, Input, Modal, Select, Space, message } from "antd";
import React, { useState } from "react";
import Upload from "../Upload";
import { useFormik } from "formik";
import { items } from "@/utils/dummyData";
import { ItemsApi } from "@/api/ItemsFetccher";

type Props = { open: boolean; setOpen: (value: boolean) => void; item: IItem };

function UpdateItem({ open, setOpen, item }: Props) {
  const [loading, setLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: item,
    onSubmit: (values) => {
      setLoading(true);
      if (item._id) {
        ItemsApi.updateItem(item._id, values)
          .then((d: { message: string; item: IItem }) => {
            message.success(d.message);
            setOpen(false);
          })
          .catch((err) => console.log(err));
      }

      setLoading(false);
    },
  });

  return (
    <Modal
      title={
        <h3 className=" text-lg font-medium  text-blue-500">
          Cập nhật sản phẩm
        </h3>
      }
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => formik.handleSubmit()}
      okButtonProps={{
        type: "primary",
        className: "bg-blue-500",
        loading: loading,
      }}
    >
      <Form>
        <Form.Item name="name">
          <Space.Compact className="w-full grid grid-cols-[1fr_5fr] items-center">
            <label htmlFor="name" className=" font-medium text-sm w-[120px]">
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
            <label
              htmlFor="long_desc"
              className=" font-medium text-sm w-[120px] "
            >
              Mô Tả Sản Phẩm
            </label>
            <Input.TextArea
              placeholder="Mô Tả Sản Phẩm"
              size="large"
              value={formik.values.long_desc}
              onChange={(e) =>
                formik.setFieldValue("long_desc", e.target.value)
              }
            />
          </Space.Compact>
        </Form.Item>
        <Form.Item name="short_desc">
          <Space.Compact className="w-full grid grid-cols-[1fr_5fr] items-center">
            <label
              htmlFor="short_desc"
              className=" font-medium text-sm w-[120px] "
            >
              Ghi Chú
            </label>
            <Input.TextArea
              placeholder="Ghi Chú"
              size="large"
              value={formik.values.short_desc}
              onChange={(e) =>
                formik.setFieldValue("short_desc", e.target.value)
              }
            />
          </Space.Compact>
        </Form.Item>
        <Space
          wrap
          className="w-full grid grid-cols-[1fr_5fr] items-center mb-5"
        >
          <p className=" font-medium text-sm w-[120px] h-3">Loại Sản Phẩm</p>
          <Select
            id="category"
            defaultValue={item.category}
            style={{ width: 200 }}
            onChange={(value: string) =>
              formik.setFieldValue("category", value)
            }
            options={items.map((item) => ({
              label: item.label,
              value: item.key,
            }))}
          />
        </Space>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item name="price">
            <Space.Compact className="w-full grid grid-cols-[2.5fr_5fr] items-center gap-2 ">
              <label
                htmlFor="price"
                className=" font-medium text-sm w-[120px] "
              >
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
              <label
                htmlFor="countInStock"
                className=" font-medium text-sm w-[120px] "
              >
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

                  formik.setFieldValue(
                    "countInStock",
                    parseInt(e.target.value)
                  );
                }}
              />
            </Space.Compact>
          </Form.Item>
        </div>
        <Form.Item>
          <Space.Compact className="w-full grid grid-cols-[1fr_5fr] items-center">
            <label className=" font-medium text-sm w-[120px] mb-5">
              Hình Ảnh Mô Tả
            </label>
            <Upload
              setUploadedUrls={setUploadedUrls}
              uploadedUrls={uploadedUrls}
            />
          </Space.Compact>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateItem;
