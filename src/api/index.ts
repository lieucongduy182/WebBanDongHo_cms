import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:8080";

const axiosClient: AxiosInstance = axios.create({
  baseURL,
});

export default axiosClient;

//tồn kho lâu năm, tồn kho mới nhập
//ngày hết hạn trong sản phẩm => hiển thi danh sách => Lọc theo tháng
// Lọc theo tự động hạn
