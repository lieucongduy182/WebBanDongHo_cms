import { DanhMucFormType } from "../../types/danhmuc";
import axiosClient from "..";

export const DanhMucService = {
  createDanhMuc: (formData: DanhMucFormType) =>
    axiosClient.post("/danhmuc", formData),
  updateDanhMuc: (madm: string, formData: DanhMucFormType) =>
    axiosClient.put(`/danhmuc/${madm}`, formData),
  getAllDanhMuc: () => axiosClient.get("/danhmuc"),
  getDetailDanhMuc: (madm: string) => axiosClient.get(`/danhmuc/${madm}`),
  deleteDanhMuc: (madm: string) => axiosClient.delete(`/danhmuc/${madm}`),
};
