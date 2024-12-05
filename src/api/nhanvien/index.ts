import { AddNhanVienFormType } from "../../types/nhanvien";
import axiosClient from "..";

export const NhanVienService = {
  createNhanVien: (formData: AddNhanVienFormType) =>
    axiosClient.post("/nhanvien", formData),
  updateNhanVien: (manv: string, formData: AddNhanVienFormType) =>
    axiosClient.put(`/nhanvien/${manv}`, formData),
  getAllNhanVien: () => axiosClient.get("/nhanvien"),
  getDetailNhanVienByMaNV: (manv: string) =>
    axiosClient.get(`/nhanvien/${manv}`),
  getDetailNhanVienByUsername: (username: string) =>
    axiosClient.get(`/nhanvien/profile/${username}`),
  deleteNhanVien: (manv: string) => axiosClient.delete(`/nhanvien/${manv}`),
};
