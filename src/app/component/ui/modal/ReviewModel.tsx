"use client";
import { ReviewsApi } from "@/api/ReviewsFetcher";
import { IRootState } from "@/app/store/store";
import { Button, Form, Input, Modal, Rate, message } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import { useSelector } from "react-redux";

type Props = {
  open: boolean;
  setOpen: (values: boolean) => void;
  product_id: {
    product: IItem;
    quantity: number;
  }[];
};

function ReviewModel({ open, setOpen, product_id }: Props) {
  const [rate, setRate] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const products = product_id.map((item) => item.product._id);

  const user_id = useSelector(
    (state: IRootState) => state.user.userCurrent?.id
  );
  let initialValues: ICreateReview = {
    user_id: "",
    product_id: products,
    comment: comment,
    rating: rate,
  };
  if (user_id) {
    initialValues.user_id = user_id;
  } else {
    message.error("Lỗi người dùng, thử lại sau!");
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value: ICreateReview, { setSubmitting }) => {
      handleOk(value, setSubmitting);
    },
  });
  const handleOk = (
    value: ICreateReview,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    ReviewsApi.createReview(value).then((d) => {
      console.log(d);
      message.success(d.message);
      setOpen(false);
    });
    setSubmitting(false);
  };
  return (
    <Modal
      title={
        <h3 className=" flex items-center gap-3 text-xl">
          <FiStar />
          Đánh giá sản phẩm
        </h3>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={[]}
    >
      <Form onFinish={formik.handleSubmit}>
        <Form.Item className=" mt-3">
          <p className=" text-base mb-3">Đánh giá:</p>
          <Rate
            className=" text-3xl"
            allowHalf
            value={rate}
            onChange={(e) => setRate(e)}
          />
        </Form.Item>
        <Form.Item
          name="comment"
          rules={[
            { required: true, message: "Trương đánh giá không được bỏ trống" },
            { min: 10, message: "Đánh giá của bạn quá ngắn" },
            { max: 200, message: "Đánh giá của bạn quá dài" },
          ]}
        >
          <Input.TextArea
            name="comment"
            rows={4}
            placeholder="Hãy nhập đánh giá của bạn"
            onChange={(e) => {
              setComment(e.target.value);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
          />
        </Form.Item>
        <Button
          htmlType="submit"
          className=" bg-red-500 text-white"
          loading={formik.isSubmitting}
        >
          Đánh giá
        </Button>
      </Form>
    </Modal>
  );
}

export default ReviewModel;
