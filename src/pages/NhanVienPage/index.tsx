import {
  Box,
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NhanVienService } from "../../api/nhanvien";
import { ButtonDelete } from "../../components/ui/ButtonDelete";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectIsLoading, selectListNV } from "../../stores/nhanvien";
import { getListNV } from "../../stores/nhanvien/nhanvien.thunk";
import { NhanVienType } from "../../types/nhanvien";

const NhanVienPage = () => {
  const listNV = useAppSelector(selectListNV);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const toast = useToastCustom();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListNV());
  }, []);

  const handleEdit = (nhanvien: NhanVienType) => {
    navigate(`/admin/nhanvien/${nhanvien.manv}`);
  };

  const handleDelete = async (nhanvien: NhanVienType) => {
    try {
      const response = await NhanVienService.deleteNhanVien(nhanvien.manv);

      await dispatch(getListNV());

      toast({
        title: "Xoá nhân viên",
        description: response.data,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Xoá nhân viên",
        description: (error as any).response.data,
        status: "error",
      });
    }
  };

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
            <TableCaption>Danh sách nhân viên trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã nhân viên</Th>
                <Th>Username</Th>
                <Th>Họ tên</Th>
                <Th>Giới tính</Th>
                <Th>Email</Th>
                <Th>SĐT</Th>
                <Th>Địa chỉ</Th>
                <Th>Lương</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listNV.map((nhanvien: NhanVienType) => (
                <Tr key={nhanvien.manv}>
                  <Td>{nhanvien.manv}</Td>
                  <Td>{nhanvien.taikhoan.username}</Td>
                  <Td>{nhanvien.hoten}</Td>
                  <Td>{nhanvien.gioitinh}</Td>
                  <Td>{nhanvien.email}</Td>
                  <Td>{nhanvien.sdt}</Td>
                  <Td>{nhanvien.diachi}</Td>
                  <Td>{nhanvien.luong}</Td>
                  <Td>
                    <ButtonEdit onClick={() => handleEdit(nhanvien)} />
                  </Td>
                  <Td>
                    <ButtonDelete onClick={() => handleDelete(nhanvien)} />
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
        <TitlePage
          titleButtonCreate="Thêm nhân viên"
          title={"Danh sách nhân viên"}
          onClickCreate={() => {
            navigate("/admin/nhanvien/create");
          }}
        />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default NhanVienPage;
