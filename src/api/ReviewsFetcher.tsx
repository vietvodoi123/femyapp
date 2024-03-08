import axiosClient from "./Fetcher";

export const ReviewsApi = {
  getAllReviewsForProduct(product_id: string): Promise<IReviews> {
    return axiosClient.get(`/reviews/${product_id}`);
  },
  createReview(body: ICreateReview): Promise<Message> {
    return axiosClient.post("/reviews/", body);
  },
};
