import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

import { OptionSelect } from "../../components/form/SelectCustom";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { PaymentEnum } from "../../enum/payment";
import { ConvertPrice } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { selectIsLoading, selectListDonHang } from "../../stores/donhang";
import { getListDonHang } from "../../stores/donhang/donhang.thunk";
import { DonHangType } from "../../types/donhang";
import { ModalCTGH } from "./ModalCTDH";
import { ModalDCGH } from "./ModalDCGH";
import { ModalTrangThai } from "./ModalTrangThai";

export const listOptionTrangThai: OptionSelect[] = [
  {
    value: 0,
    label: "Chưa xác nhận",
  },
  {
    value: 1,
    label: "Đã xác nhận",
  },
  {
    value: 2,
    label: "Đang giao hàng",
  },
  {
    value: 3,
    label: "Hoàn thành",
  },
  {
    value: 4,
    label: "Đã huỷ",
  },
];

const textTrangthai = (trangthai: number) => {
  const findTrangThai = listOptionTrangThai.find(
    (item) => Number(item.value) === trangthai,
  );

  return findTrangThai?.label || "Chưa xác nhận";
};

export const textHinhThucThanhThoan = (hinhthuc: number) => {
  if (hinhthuc === PaymentEnum.ThanhToanKhiNhanHang) {
    return "Thanh toán khi nhận hàng";
  }

  return "Paypal";
};

const initialDonHang: DonHangType = {
  madh: "",
  hinhThucThanhToan: 0,
  ngayDat: "",
  tongTien: 0,
  trangThai: 0,
  hoTen: "",
  diaChi: "",
  sdt: "",
  email: "",
  ghichu: "",
  nhanvien: undefined,
  giaohang: undefined,
  khachhang: {
    diaChi: "",
    email: "",
    gioiTinh: "",
    hoTen: "",
    makh: "",
    sdt: "",
    taikhoan: {
      password: "",
      username: "",
    },
  },
};

const DonHangUserPage = () => {
  const listDonHang = useAppSelector(selectListDonHang);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const [isOpenModalTrangThai, setIsOpenModalTrangThai] =
    useState<boolean>(false);

  const [isOpenModalCTDH, setIsOpenModalCTDH] = useState<boolean>(false);

  const [isOpenModalDCGH, setIsOpenModalDCGH] = useState<boolean>(false);

  const [selectedDH, setSelectedDH] = useState<DonHangType>(initialDonHang);

  useEffect(() => {
    dispatch(getListDonHang());
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <Box
        width={"100%"}
        height={"100%"}
        border={"1px solid #e2e8f0"}
        borderRadius={"8px"}
        p="8px"
      >
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>Danh sách đơn hàng trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã đơn hàng</Th>
                <Th>Tổng tiền</Th>
                <Th>Trạng thái</Th>
                <Th>Ngày đặt</Th>
                <Th>Thanh Toán</Th>
                <Th>NV duyệt</Th>
                <Th>NV giao hàng</Th>
                <Th>Mã KH</Th>
                <Th>Tên KH</Th>
                <Th>Chi tiết ĐH</Th>
                <Th>Địa chỉ GH</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listDonHang.map((donhang: DonHangType) => (
                <Tr
                  onClick={() => {
                    setSelectedDH(donhang);
                  }}
                  key={donhang.madh}
                >
                  <Td>{donhang.madh}</Td>
                  <Td>{ConvertPrice(donhang.tongTien)}</Td>
                  <Td>
                    <Button
                      background={"#6e9c92"}
                      color={"white"}
                      _hover={{
                        backgroundColor: "#6e9c92",
                        transform: "scale(1.1)",
                      }}
                      transition="transform 0.2s ease-in-out"
                      onClick={() => {
                        setIsOpenModalTrangThai(true);
                      }}
                    >
                      {textTrangthai(donhang.trangThai)}
                    </Button>
                  </Td>
                  <Td>{moment(donhang.ngayDat).format("DD/MM/YYYY")}</Td>
                  <Td>{textHinhThucThanhThoan(donhang.hinhThucThanhToan)}</Td>
                  <Td>{(donhang.nhanvien && donhang.nhanvien.hoten) || ""}</Td>
                  <Td>{(donhang.giaohang && donhang.giaohang.hoten) || ""}</Td>
                  <Td>{donhang.khachhang.makh}</Td>
                  <Td>{donhang.khachhang.hoTen || ""}</Td>
                  <Td>
                    <Button
                      color={"#5998e3"}
                      _hover={{
                        background: "transparent",
                      }}
                      onClick={() => {
                        setIsOpenModalCTDH(true);
                      }}
                    >
                      Xem sản phẩm
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      color={"#5998e3"}
                      _hover={{
                        background: "transparent",
                      }}
                      onClick={() => {
                        setIsOpenModalDCGH(true);
                      }}
                    >
                      Xem địa chỉ
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  return (
    <>
      <PageWrapper>
        <Flex direction={"column"} gap={10}>
          <Flex direction={"column"} gap={10}>
            <Text fontWeight={700} fontSize={24}>
              Danh sách đơn hàng
            </Text>
          </Flex>

          {renderData()}
        </Flex>
      </PageWrapper>

      {selectedDH.madh && (
        <ModalTrangThai
          isOpen={isOpenModalTrangThai}
          onClose={() => {
            setIsOpenModalTrangThai(false);
          }}
          selectedDH={selectedDH}
        />
      )}

      {selectedDH.madh && (
        <ModalDCGH
          isOpen={isOpenModalDCGH}
          onClose={() => {
            setIsOpenModalDCGH(false);
            setSelectedDH(initialDonHang);
          }}
          selectedDH={selectedDH}
        />
      )}

      {selectedDH.madh && (
        <ModalCTGH
          isOpen={isOpenModalCTDH}
          onClose={() => {
            setIsOpenModalCTDH(false);
            setSelectedDH(initialDonHang);
          }}
          selectedDH={selectedDH}
        />
      )}
    </>
  );
};

export default DonHangUserPage;
