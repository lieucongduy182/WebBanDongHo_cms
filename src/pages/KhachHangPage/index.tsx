import {
  Box,
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
import { useEffect } from "react";

import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { selectIsLoading, selectListKH } from "../../stores/khachhang";
import { getListKH } from "../../stores/khachhang/khachhang.thunk";
import { KhachHangType } from "../../types/khachhang";

const KhachHangPage = () => {
  const listKH = useAppSelector(selectListKH);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListKH());
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
            <TableCaption>Danh sách khách hàng trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã khách hàng</Th>
                <Th>Username</Th>
                <Th>Họ tên</Th>
                <Th>Giới tính</Th>
                <Th>Email</Th>
                <Th>SĐT</Th>
                <Th>Địa chỉ</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listKH.map((khachhang: KhachHangType) => (
                <Tr key={khachhang.makh}>
                  <Td>{khachhang.makh}</Td>
                  <Td>{khachhang.taikhoan.username}</Td>
                  <Td>{khachhang.hoTen}</Td>
                  <Td>{khachhang.gioiTinh}</Td>
                  <Td>{khachhang.email}</Td>
                  <Td>{khachhang.sdt}</Td>
                  <Td>{khachhang.diaChi}</Td>
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
        <Flex direction={"column"} gap={10}>
          <Text fontWeight={700} fontSize={24}>
            Danh sách khách hàng
          </Text>
        </Flex>

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default KhachHangPage;
