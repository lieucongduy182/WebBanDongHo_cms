import { ThuongHieuFormType } from "../../types/thuonghieu";
import axiosClient from "..";

export const ThuongHieuService = {
  createThuongHieu: (formData: ThuongHieuFormType) =>
    axiosClient.post("/thuonghieu", formData),
  updateThuongHieu: (math: string, formData: ThuongHieuFormType) =>
    axiosClient.put(`/thuonghieu/${math}`, formData),
  getAllThuongHieu: () => axiosClient.get("/thuonghieu"),
  getDetailThuongHieu: (math: string) => axiosClient.get(`/thuonghieu/${math}`),
  deleteThuongHieu: (math: string) => axiosClient.delete(`/thuonghieu/${math}`),
};
