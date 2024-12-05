import { AddSanPhamFormType, EditSanPhamFormType } from "../../types/sanpham";
import axiosClient from "..";

export const SanPhamService = {
  createSanPham: (formData: AddSanPhamFormType) =>
    axiosClient.post("/sanpham", formData),
  updateSanPham: (masp: string, formData: EditSanPhamFormType) =>
    axiosClient.put(`/sanpham/${masp}`, formData),
  getAllSanPham: () => axiosClient.get("/sanpham"),
  getDetailSanPham: (masp: string) => axiosClient.get(`/admin/sanpham/${masp}`),
  deleteSanPham: (masp: string) => axiosClient.delete(`/sanpham/${masp}`),
};
