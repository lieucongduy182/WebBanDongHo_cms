import { NhaCungCapFormType } from "../../types/nhacungcap";
import axiosClient from "..";

export const NhaCungCapService = {
  createNhaCungCap: (formData: NhaCungCapFormType) =>
    axiosClient.post("/nhacungcap", formData),
  updateNhaCungCap: (mancc: string, formData: NhaCungCapFormType) =>
    axiosClient.put(`/nhacungcap/${mancc}`, formData),
  getAllNhaCungCap: () => axiosClient.get("/nhacungcap"),
  getDetailNhaCungCap: (mancc: string) =>
    axiosClient.get(`/nhacungcap/${mancc}`),
  deleteNhaCungCap: (mancc: string) =>
    axiosClient.delete(`/nhacungcap/${mancc}`),
};
