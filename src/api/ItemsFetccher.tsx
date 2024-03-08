import axiosClient from "./Fetcher";

export const ItemsApi = {
  getItems(params: IGetItems): Promise<SuccessResponse<IItem[]>> {
    return axiosClient.get("/products", { params });
  },
  createItems(body: ICreateItem): Promise<IMes | IError> {
    // Chuyển đối tượng body thành dạng JSON
    const jsonBody = JSON.stringify(body);

    // Gửi request POST với dữ liệu JSON
    return axiosClient.post("/products", jsonBody, {
      headers: {
        "Content-Type": "application/json", // Đảm bảo set header là application/json
      },
    });
  },
  deleteItem(id: string): Promise<ApiResponse<Message>> {
    return axiosClient.delete(`/products/${id}`);
  },
  getItemById(id: string): Promise<IItemAndCreator> {
    return axiosClient.get(`/products/${id}`);
  },
  updateItem(
    id: string,
    body: IItem
  ): Promise<{
    message: string;
    item: IItem;
  }> {
    return axiosClient.put(`/products/${id}`, body);
  },
};
