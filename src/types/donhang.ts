import { KhachHangType } from "./khachhang";
import { NhanVienType } from "./nhanvien";

export interface DonHangType {
  madh: string;
  hinhThucThanhToan: number;
  ngayDat: string;
  tongTien: number;
  trangThai: number;
  hoTen: string;
  diaChi: string;
  sdt: string;
  email: string;
  ghichu: string;
  nhanvien?: NhanVienType;
  giaohang?: NhanVienType;
  khachhang: KhachHangType;
}

export interface UpdateDonHangFormType {
  madh: string;
  manv?: string;
  manvgh?: string;
  trangthai: number;
  hinhThucThanhToan: number;
}
