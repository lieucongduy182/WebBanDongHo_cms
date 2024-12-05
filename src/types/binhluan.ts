import { KhachHangType } from "./khachhang";
import { SanPhamType } from "./sanpham";

export interface BinhLuanType {
  mabl: string;
  noidung: string;
  time: string;
  khachhang: KhachHangType;
  sanpham: SanPhamType;
}

export interface BinhLuanFormType {
  noidung: string;
  makh: string;
  masp: string;
}
