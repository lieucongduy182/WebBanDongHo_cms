import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import avatar from "../../../assets/images/avatar.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/app-hook";
import { selectUsername } from "../../../stores/auth";
import { selectDetailNV, selectIsLoading } from "../../../stores/nhanvien";
import { getDetailNVByUsername } from "../../../stores/nhanvien/nhanvien.thunk";
import { Header } from "../Header";
import { Loading } from "../Loading";

interface SidebarType {
  link: string;
  name: string;
  id: string;
  quyen: number[];
}

const listSidebar: SidebarType[] = [
  {
    link: "/admin/danhmuc",
    name: "Danh sách danh mục",
    id: "danh-sach-danh-muc",
    quyen: [1, 3],
  },
  {
    link: "/admin/nhacungcap",
    name: "Nhà cung cấp",
    id: "danh-sach-nha-cung-cap",
    quyen: [1, 3],
  },
  {
    link: "/admin/thuonghieu",
    name: "Danh sách thương hiệu",
    id: "danh-sach-thuong-hieu",
    quyen: [1, 3],
  },
  {
    link: "/admin/khachhang",
    name: "Danh sách khách hàng",
    id: "danh-sach-khachhang",
    quyen: [1, 3],
  },
  {
    link: "/admin/nhanvien",
    name: "Danh sách nhân viên",
    id: "danh-sach-nhan-vien",
    quyen: [1],
  },
  {
    link: "/admin/sanpham",
    name: "Danh sách sản phẩm",
    id: "danh-sach-san-pham",
    quyen: [1, 3],
  },
  {
    link: "/admin/donhanguser",
    name: "Danh sách đơn hàng",
    id: "danh-sach-don-hang",
    quyen: [1, 3],
  },
  {
    link: "/admin/dondathang",
    name: "Danh sách ĐĐH",
    id: "danh-sach-don-dat-hang",
    quyen: [1, 3],
  },
  {
    link: "/admin/phieunhap",
    name: "Danh sách phiếu nhập",
    id: "danh-sach-phieu-nhap",
    quyen: [1, 3],
  },
  {
    link: "/admin/hoadon",
    name: "Danh sách hoá đơn",
    id: "danh-sach-hoa-don",
    quyen: [1, 3],
  },
  {
    link: "/admin/binhluan",
    name: "Danh sách bình luận",
    id: "danh-sach-binh-luan",
    quyen: [1, 3],
  },
  {
    link: "/admin/thongke",
    name: "Danh sách thống kê",
    id: "danh-sach-thong-ke",
    quyen: [1, 3],
  },
];

export const DefaultLayout = () => {
  const username =
    useAppSelector(selectUsername) || localStorage.getItem("username");
  const detailNV = useAppSelector(selectDetailNV);

  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (detailNV.manv !== "") return;
    if (!username) return;
    dispatch(getDetailNVByUsername(username));
  }, [username, detailNV.manv]);

  return (
    <>
      <Header />

      <Flex gap={20}>
        <Box
          minW={"280px"}
          height={"180vh"}
          backgroundColor={"#2e3836"}
          p={"32px 12px"}
        >
          <Flex direction={"column"} gap={10}>
            {isLoading ? (
              <Loading />
            ) : (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                gap={5}
                direction={"column"}
              >
                <Box maxH={200} maxW={200}>
                  <Image src={avatar} alt="" />
                </Box>
                <Text
                  textAlign={"center"}
                  color={"white"}
                  fontWeight={700}
                  fontSize={24}
                >
                  {detailNV.hoten}
                </Text>
              </Flex>
            )}
            <Flex direction={"column"} gap={10}>
              {listSidebar.map((sidebar) => {
                if (!sidebar.quyen.includes(detailNV.quyen)) {
                  return <Fragment key={sidebar.id} />;
                }
                return (
                  <Button
                    key={sidebar.id}
                    background={"transparent"}
                    _hover={{
                      background: "transparent",
                      transition: "all 0.3s ease",
                      scale: 1.5,
                    }}
                    color={"white"}
                    fontWeight={700}
                    fontSize={18}
                    onClick={() => {
                      navigate(sidebar.link);
                    }}
                  >
                    {sidebar.name}
                  </Button>
                );
              })}
            </Flex>
          </Flex>
        </Box>
        <Outlet />
      </Flex>
    </>
  );
};
