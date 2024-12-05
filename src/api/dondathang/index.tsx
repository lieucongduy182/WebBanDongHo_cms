import { DonDatHangFormType } from "../../types/dondathang";
import axiosClient from "..";

export const DonDatHangService = {
  createDonDatHang: (formData: DonDatHangFormType) =>
    axiosClient.post("/dondathang", formData),
  updateDonDatHang: (maddh: string, formData: DonDatHangFormType) =>
    axiosClient.put(`/dondathang/${maddh}`, formData),
  getAllDonDatHang: () => axiosClient.get("/dondathang"),
  getDetailCTDDH: (maddh: string) =>
    axiosClient.get(`/dondathang/chitiet/${maddh}`),
};
