import axiosClient from "..";

export const binhLuanService = {
  getListBinhLuan: () => axiosClient.get("/binhluan"),
  deleteBinhLuan: (mabl: string) => axiosClient.delete(`/binhluan/${mabl}`),
};
