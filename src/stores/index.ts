import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import binhluanReducer from "./binhluan";
import danhmucReducer from "./danhmuc";
import dondathangReducer from "./dondathang";
import donhangReducer from "./donhang";
import hoadonReducer from "./hoadon";
import khachhangReducer from "./khachhang";
import nhacungcapReducer from "./nhacungcap";
import nhanvienReducer from "./nhanvien";
import phieunhapReducer from "./phieunhap";
import sanphamReducer from "./sanpham";
import thuonghieuReducer from "./thuonghieu";

const rootReducers = {
  auth: authReducer,
  danhmuc: danhmucReducer,
  thuonghieu: thuonghieuReducer,
  nhacungcap: nhacungcapReducer,
  nhanvien: nhanvienReducer,
  khachhang: khachhangReducer,
  sanpham: sanphamReducer,
  donhang: donhangReducer,
  dondathang: dondathangReducer,
  phieunhap: phieunhapReducer,
  hoadon: hoadonReducer,
  binhluan: binhluanReducer,
};

const store = configureStore({
  reducer: rootReducers,
});

export default store;
