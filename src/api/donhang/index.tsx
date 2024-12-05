import { UpdateDonHangFormType } from "../../types/donhang";
import axiosClient from "..";

export const DonHangService = {
  updateDonHang: (formData: UpdateDonHangFormType) =>
    axiosClient.put(`/donhang/user`, formData),
  getAllDonHang: () => axiosClient.get("/admin/donhang"),
  getCTDH: (madh: string) => axiosClient.get(`/donhang/detail/${madh}`),
  getThongKe: () => axiosClient.get(`/donhang/thongke`),
};
