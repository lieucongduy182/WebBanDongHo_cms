import { NhaCungCapFormType } from "./nhacungcap";
import { NhanVienType } from "./nhanvien";
import { SanPhamType } from "./sanpham";

export interface ID_CT_DonDatHang {
  maddh: string;
  masp: string;
}

export interface DanhSachDonDatHangType {
  masp: string;
  soluong: number;
  gia: number;
}

export interface DonDatHangFormType {
  maddh: string;
  mancc: string;
  manv?: string;
  ds?: DanhSachDonDatHangType[];
}

export interface DonDatHangType {
  mddh: string;
  ngaydat: string;
  nhacungcap: NhaCungCapFormType;
  nhanvien: NhanVienType;
}

export interface DonDatHangDetail {
  id: ID_CT_DonDatHang;
  soluong: number;
  gia: number;
  sanpham: SanPhamType;
}
