import axiosClient from "..";

export const hoaDonService = {
  getAllHoaDon: () => axiosClient.get("/hoadon"),
};
