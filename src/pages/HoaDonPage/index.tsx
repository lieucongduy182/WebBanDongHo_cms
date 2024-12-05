import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";
import { useEffect } from "react";

import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { ConvertPrice } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { selectIsLoading, selectListHoaDon } from "../../stores/hoadon";
import { getListHoaDon } from "../../stores/hoadon/hoadon.thunk";
import { HoaDonType } from "../../types/hoadon";
import { HoaDonDocument } from "./HoaDonDocument";

const HoaDonPage = () => {
  const dispatch = useAppDispatch();
  const listHoaDon = useAppSelector(selectListHoaDon);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getListHoaDon());
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
            <TableCaption>Danh sách Hoá đơn trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã HĐơn</Th>
                <Th>Ngày lập</Th>
                <Th>Thành tiền</Th>
                <Th>Mã ĐHàng</Th>
                <Th>Họ tên</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listHoaDon.map((hoadon: HoaDonType, index) => (
                <Tr key={index}>
                  <Td>{hoadon.mahd}</Td>
                  <Td>{moment(hoadon.ngaylap).format("DD-MM-YYYY")}</Td>
                  <Td>{ConvertPrice(hoadon.thanhtien)}</Td>
                  <Td>{hoadon.donhang.madh}</Td>
                  <Td>{hoadon.donhang.khachhang.hoTen}</Td>
                  <Td>{hoadon.donhang.khachhang.email}</Td>
                  <Td>
                    <PDFDownloadLink
                      document={<HoaDonDocument hoadon={hoadon} />}
                      fileName={`hoadon-${hoadon.mahd}.pdf`}
                    >
                      <Button
                        color={"#5998e3"}
                        _hover={{
                          background: "transparent",
                        }}
                      >
                        Xuất hoá đơn
                      </Button>
                    </PDFDownloadLink>
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
    <PageWrapper>
      <Flex direction={"column"} gap={10}>
        <TitlePage title={"Danh sách Hoá đơn"} isShowButtonCreate={false} />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default HoaDonPage;
