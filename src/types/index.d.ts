import { AuthStateType } from "../stores/auth";
import { BinhLuanStateType } from "../stores/binhluan";
import { DanhMucStateType } from "../stores/danhmuc";
import { DonDatHangStateType } from "../stores/dondathang";
import { DonHangStateType } from "../stores/donhang";
import { HoaDonStateType } from "../stores/hoadon";
import { KhachHangStateType } from "../stores/khachhang";
import { NhaCungCapStateType } from "../stores/nhacungcap";
import { NhanVienStateType } from "../stores/nhanvien";
import { PhieuNhapStateType } from "../stores/phieunhap";
import { SanPhamStateType } from "../stores/sanpham";
import { ThuongHieuStateType } from "../stores/thuonghieu";

type AppDispatch = typeof store.dispatch;

interface ApplicationRootState {
  readonly auth: AuthStateType;
  readonly danhmuc: DanhMucStateType;
  readonly thuonghieu: ThuongHieuStateType;
  readonly nhacungcap: NhaCungCapStateType;
  readonly nhanvien: NhanVienStateType;
  readonly khachhang: KhachHangStateType;
  readonly sanpham: SanPhamStateType;
  readonly donhang: DonHangStateType;
  readonly dondathang: DonDatHangStateType;
  readonly phieunhap: PhieuNhapStateType;
  readonly hoadon: HoaDonStateType;
  readonly binhluan: BinhLuanStateType;
}
