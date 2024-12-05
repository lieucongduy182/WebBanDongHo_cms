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
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { selectIsLoading, selectListPhieuNhap } from "../../stores/phieunhap";
import { getListPhieuNhap } from "../../stores/phieunhap/phienhap.thunk";
import { PhieuNhapType } from "../../types/phieunhap";
import { PhieuNhapDocument } from "./PhieuNhapDocument";

const PhieuNhapPage = () => {
  const dispatch = useAppDispatch();
  const listPhieuNhap = useAppSelector(selectListPhieuNhap);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getListPhieuNhap());
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
            <TableCaption>Danh sách phiếu nhập trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã PN</Th>
                <Th>Ngày nhập</Th>
                <Th>Mã ĐĐH</Th>
                <Th>Nhà cung cấp</Th>
                <Th>Nhân viên</Th>
                <Th>Xem</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listPhieuNhap.map((phieunhap: PhieuNhapType, index) => (
                <Tr key={index}>
                  <Td>{phieunhap.mapn}</Td>
                  <Td>{moment(phieunhap.ngaydat).format("DD-MM-YYYY")}</Td>
                  <Td>{phieunhap.dondathang.mddh}</Td>
                  <Td>{phieunhap.dondathang.nhacungcap.tenncc}</Td>
                  <Td>{phieunhap.nhanvien.hoten}</Td>
                  <Td>
                    <PDFDownloadLink
                      document={<PhieuNhapDocument phieunhap={phieunhap} />}
                      fileName={`phieunhap-${phieunhap.mapn}.pdf`}
                    >
                      <Button
                        color={"#5998e3"}
                        _hover={{
                          background: "transparent",
                        }}
                      >
                        Xuất phiếu nhập
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
        <TitlePage title={"Danh sách phiếu nhập"} isShowButtonCreate={false} />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default PhieuNhapPage;
