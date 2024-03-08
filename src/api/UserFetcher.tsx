import axiosClient from "./Fetcher";

export const UserApi = {
  login(payload: ILoginBody): Promise<Auth | ErrorResponse> {
    return axiosClient.post("/users/signin", payload);
  },
  signup(payload: IUserCreate): Promise<ApiResponse<Message>> {
    return axiosClient.post("/users/signup", payload);
  },

  getUser(): Promise<ApiResponse<MeData>> {
    return axiosClient.get("/me");
  },
  updateMe(userId: string, payload: IUpdateMe): Promise<IUpdated> {
    return axiosClient.put(`/users/${userId}`, payload);
  },
  changePass(payload: FormData): Promise<ApiResponse<Message>> {
    return axiosClient.put("/users/password", payload);
  },
  getInforShop(shopId: string): Promise<IShopInfor> {
    return axiosClient.get(`/users/shop/${shopId}`);
  },
};
