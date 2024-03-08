"use client";
import { ReviewsApi } from "@/api/ReviewsFetcher";
import { Empty, Pagination, Spin, message } from "antd";
import React, { useEffect, useState } from "react";

type Props = { id?: string };

function Reviews({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [pages, setPages] = useState<{
    page: number;
    pageSize: number;
    totalPages: number;
  }>({
    page: 1,
    pageSize: 10,
    totalPages: 1,
  });

  useEffect(() => {
    setLoading(true);
    if (id) {
      ReviewsApi.getAllReviewsForProduct(id)
        .then((d: IReviews) => {
          setReviews(d.data);
          setPages({
            page: d.page,
            pageSize: d.pageSize,
            totalPages: d.totalPages,
          });
        })
        .catch((err) => message.error(err));
    }
    setLoading(false);
  }, [pages.page]);
  return (
    <div className=" bg-white mt-5 p-5 w-[1060px]">
      <h3 className=" p-3 text-lg font-medium">ĐÁNH GIÁ SẢN PHẨM</h3>
      <div>
        {loading && <Spin />}
        {!loading && reviews.length === 0 && <Empty />}
        {!loading &&
          reviews.length !== 0 &&
          reviews.map((item) => <div key={item.reviewId}>{item.comment}</div>)}
      </div>
      {!loading && reviews.length !== 0 && (
        <div className=" flex justify-center items-center mt-3">
          <Pagination
            pageSize={pages.pageSize}
            total={pages.totalPages * 10}
            current={pages.page}
          />
        </div>
      )}
    </div>
  );
}

export default Reviews;
