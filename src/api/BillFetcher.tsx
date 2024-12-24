import axiosClient from './Fetcher'

export const BillApi = {
  createBill(body: IBill): Promise<Message> {
    return axiosClient.post('/bills/', body)
  },
  getAllMyBill(query: IQueryOrder): Promise<SuccessResponse<IOrder[]>> {
    return axiosClient.get(`/bills/user/ibuy`, { params: query })
  },
  getAllMyStoreBill(query: IQueryOrder): Promise<SuccessResponse<IOrder[]>> {
    return axiosClient.get(`/bills/isell`, { params: query })
  },
  updateBill(billId: string, body: IQueryOrder): Promise<Message> {
    return axiosClient.put(`/bills/${billId}`, body)
  },
}
