import { Navigate, RouteObject } from "react-router-dom";

import App from "../App";
import { DefaultLayout } from "../components/ui/DefaultLayout";
import BinhLuanPage from "../pages/BinhLuanPage";
import DanhMucPage from "../pages/DanhMucPage";
import DanhMucCreate from "../pages/DanhMucPage/DanhMucCreate";
import DanhMucEdit from "../pages/DanhMucPage/DanhMucEdit";
import DoiMatKhauPage from "../pages/DoiMatKhauPage";
import { DonDatHangPage } from "../pages/DonDatHangPage";
import DonDatHangCreate from "../pages/DonDatHangPage/DonDatHangCreate";
import DonHangUserPage from "../pages/DonHangUserPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import HoaDonPage from "../pages/HoaDonPage";
import KhachHangPage from "../pages/KhachHangPage";
import LoginPage from "../pages/LoginPage";
import NhaCungCapPage from "../pages/NhaCungCapPage";
import NhaCungCapCreate from "../pages/NhaCungCapPage/NhaCungCapCreate";
import NhaCungCapEdit from "../pages/NhaCungCapPage/NhaCungCapEdit";
import NhanVienPage from "../pages/NhanVienPage";
import NhanVienCreate from "../pages/NhanVienPage/NhanVienCreate";
import NhanVienEdit from "../pages/NhanVienPage/NhanVienEdit";
import PhieuNhapPage from "../pages/PhieuNhapPage";
import SanPhamPage from "../pages/SanPhamPage";
import SanPhamCreate from "../pages/SanPhamPage/SanPhamCreate";
import SanPhamEdit from "../pages/SanPhamPage/SanPhamEdit";
import ThongKePage from "../pages/ThongKePage";
import ThongTinTaiKhoanPage from "../pages/ThongTinTaiKhoanPage";
import ThuongHieuPage from "../pages/ThuongHieuPage";
import ThuongHieuCreate from "../pages/ThuongHieuPage/ThuongHieuCreate";
import ThuongHieuEdit from "../pages/ThuongHieuPage/ThuongHieuEdit";

const routesConfig: RouteObject[] = [
  {
    path: "admin/login",
    element: <LoginPage />,
  },
  {
    path: "admin/forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/",
    element: <Navigate to="admin/login" replace />,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "/admin/danhmuc",
            element: <DanhMucPage />,
          },
          {
            path: "/admin/danhmuc/create",
            element: <DanhMucCreate />,
          },
          {
            path: "/admin/danhmuc/:madm",
            element: <DanhMucEdit />,
          },
          {
            path: "/admin/thuonghieu",
            element: <ThuongHieuPage />,
          },
          {
            path: "/admin/thuonghieu/create",
            element: <ThuongHieuCreate />,
          },
          {
            path: "/admin/thuonghieu/:math",
            element: <ThuongHieuEdit />,
          },
          {
            path: "/admin/nhanvien",
            element: <NhanVienPage />,
          },
          {
            path: "/admin/nhanvien/create",
            element: <NhanVienCreate />,
          },
          {
            path: "/admin/nhanvien/:manv",
            element: <NhanVienEdit />,
          },
          {
            path: "/admin/khachhang",
            element: <KhachHangPage />,
          },
          {
            path: "/admin/nhacungcap",
            element: <NhaCungCapPage />,
          },
          {
            path: "/admin/nhacungcap/create",
            element: <NhaCungCapCreate />,
          },
          {
            path: "/admin/nhacungcap/:mancc",
            element: <NhaCungCapEdit />,
          },
          {
            path: "/admin/sanpham",
            element: <SanPhamPage />,
          },
          {
            path: "/admin/sanpham/create",
            element: <SanPhamCreate />,
          },
          {
            path: "/admin/sanpham/:masp",
            element: <SanPhamEdit />,
          },
          {
            path: "/admin/donhanguser",
            element: <DonHangUserPage />,
          },
          {
            path: "/admin/donnhaphang",
            element: <DonDatHangPage />,
          },
          {
            path: "/admin/donnhaphang/create",
            element: <DonDatHangCreate />,
          },
          {
            path: "/admin/phieunhap",
            element: <PhieuNhapPage />,
          },
          {
            path: "/admin/hoadon",
            element: <HoaDonPage />,
          },
          {
            path: "/admin/doimatkhau",
            element: <DoiMatKhauPage />,
          },
          {
            path: "/admin/thongtintaikhoan",
            element: <ThongTinTaiKhoanPage />,
          },
          {
            path: "/admin/binhluan",
            element: <BinhLuanPage />,
          },
          // {
          //   path: "/admin/thongke",
          //   element: <ThongKePage />,
          // },
        ],
      },
    ],
  },
];

export default routesConfig;
