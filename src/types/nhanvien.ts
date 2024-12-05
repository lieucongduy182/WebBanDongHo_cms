export interface TaiKhoanFormType {
  username: string;
  password: string;
}

export interface NhanVienType {
  manv: string;
  hoten: string;
  gioitinh: string;
  sdt: string;
  diachi: string;
  email: string;
  luong: number;
  taikhoan: TaiKhoanFormType;
  quyen: number;
}

export interface AddNhanVienFormType {
  manv?: string;
  username: string;
  email: string;
  sdt: string;
  hoten: string;
  gioitinh: string;
  diachi: string;
  luong: number;
  password?: string;
}
