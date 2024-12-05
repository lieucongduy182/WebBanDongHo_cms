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

import { ThuongHieuService } from "../../api/thuonghieu";
import { ButtonDelete } from "../../components/ui/ButtonDelete";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectIsLoading, selectListThuongHieu } from "../../stores/thuonghieu";
import { getListThuongHieu } from "../../stores/thuonghieu/thuonghieu.thunk";
import { ThuongHieuFormType } from "../../types/thuonghieu";

const ThuongHieuPage = () => {
  const listThuongHieu = useAppSelector(selectListThuongHieu);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const toast = useToastCustom();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListThuongHieu());
  }, []);

  const handleEdit = (thuonghieu: ThuongHieuFormType) => {
    navigate(`/admin/thuonghieu/${thuonghieu.math}`);
  };

  const handleDelete = async (thuonghieu: ThuongHieuFormType) => {
    try {
      const response = await ThuongHieuService.deleteThuongHieu(
        thuonghieu.math,
      );

      await dispatch(getListThuongHieu());

      toast({
        title: "Xoá thương hiệu",
        description: response.data,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Xoá thương hiệu",
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
            <TableCaption>Danh sách thương hiệu trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã thương hiệu</Th>
                <Th>Tên thương hiệu</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listThuongHieu.map((thuonghieu: ThuongHieuFormType) => (
                <Tr key={thuonghieu.math}>
                  <Td>{thuonghieu.math}</Td>
                  <Td>{thuonghieu.tenth}</Td>
                  <Td>
                    <ButtonEdit onClick={() => handleEdit(thuonghieu)} />
                  </Td>
                  <Td>
                    <ButtonDelete onClick={() => handleDelete(thuonghieu)} />
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
          titleButtonCreate="Thêm thương hiệu"
          title={"Thương hiệu sản phẩm"}
          onClickCreate={() => {
            navigate("/admin/thuonghieu/create");
          }}
        />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default ThuongHieuPage;
