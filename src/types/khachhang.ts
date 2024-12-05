import { TaiKhoanFormType } from "./nhanvien";

export interface KhachHangType {
  makh: string;
  hoTen: string;
  gioiTinh: string;
  sdt: string;
  diaChi: string;
  email: string;
  taikhoan: TaiKhoanFormType;
}
