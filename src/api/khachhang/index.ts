import axiosClient from "..";

export const KhachHangService = {
  getAllKhachHang: () => axiosClient.get("/user"),
};
