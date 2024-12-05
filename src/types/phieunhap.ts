import { DonDatHangType } from "./dondathang";
import { NhanVienType } from "./nhanvien";
import { SanPhamType } from "./sanpham";

export interface DanhSachSanPhamPhieuNhapType {
  masp: string;
  soluong: number;
  gia: number;
}

export interface PhieuNhapFormType {
  mapn: string;
  maddh: string;
  manv: string;
  ds: DanhSachSanPhamPhieuNhapType;
}

export interface ID_CT_PhieuNhap {
  mapn: string;
  masp: string;
}

export interface PhieuNhapType {
  dondathang: DonDatHangType;
  ngaydat: string;
  mapn: string;
  nhanvien: NhanVienType;
}

export interface DonDatHangDetail {
  id: ID_CT_PhieuNhap;
  soluong: number;
  gia: number;
  sanpham: SanPhamType;
}

export interface PhieuNhapDetailType {
  id: {
    mapn: string;
    masp: string;
  };
  soluong: number;
  gia: number;
  sanpham: SanPhamType;
}
