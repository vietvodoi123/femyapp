import axiosClient from "./Fetcher";

export const BillApi = {
  createBill(body: IBill): Promise<Message> {
    return axiosClient.post("/bills/", body);
  },
  getAllMyBill(
    userId: string,
    query: IQueryOrder
  ): Promise<SuccessResponse<IOrder[]>> {
    return axiosClient.get(`/bills/user/${userId}`, { params: query });
  },
  getAllMyStoreBill(
    shopId: string,
    query: IQueryOrder
  ): Promise<SuccessResponse<IOrder[]>> {
    return axiosClient.get(`/bills/seller/${shopId}`, { params: query });
  },
  updateBill(billId: string, body: IQueryOrder): Promise<Message> {
    return axiosClient.put(`/bills/${billId}`, body);
  },
};
