import { DanhMucFormType } from "./danhmuc";
import { NhaCungCapFormType } from "./nhacungcap";
import { ThuongHieuFormType } from "./thuonghieu";

export interface SanPhamType {
  masp: string;
  tensp: string;
  slug: string;
  soluong: number;
  dongia: number;
  chitietSP: string;
  image: string;
  image2: string;
  image3: string;
  trangthai: number;
  thuonghieu: ThuongHieuFormType;
  danhmuc: DanhMucFormType;
  nhacungcap: NhaCungCapFormType;
}

export interface AddSanPhamFormType {
  masp: string;
  tensp: string;
  slug?: string;
  soluong: number;
  dongia: number;
  chitietSP: string;
  image?: any;
  image2?: any;
  image3?: any;
  math: string;
  madm: string;
  mancc: string;
}

export interface EditSanPhamFormType {
  masp: string;
  tensp: string;
  slug?: string;
  soluong: number;
  dongia: number;
  chitietSP: string;
  image?: any;
  image2?: any;
  image3?: any;
  thuonghieu: any;
  danhmuc: any;
  nhacungcap: any;
}
