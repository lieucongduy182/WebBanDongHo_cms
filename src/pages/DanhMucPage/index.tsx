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

import { DanhMucService } from "../../api/danhmuc";
import { ButtonDelete } from "../../components/ui/ButtonDelete";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectIsLoading, selectListDanhMuc } from "../../stores/danhmuc";
import { getListDanhMuc } from "../../stores/danhmuc/danhmuc.thunk";
import { DanhMucFormType } from "../../types/danhmuc";

const DanhMucPage = () => {
  const listDanhMuc = useAppSelector(selectListDanhMuc);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const toast = useToastCustom();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListDanhMuc());
  }, []);

  const handleEdit = (danhmuc: DanhMucFormType) => {
    navigate(`/admin/danhmuc/${danhmuc.madm}`);
  };

  const handleDelete = async (danhmuc: DanhMucFormType) => {
    try {
      const response = await DanhMucService.deleteDanhMuc(danhmuc.madm);

      await dispatch(getListDanhMuc());

      toast({
        title: "Xoá danh mục",
        description: response.data,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Xoá danh mục",
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
            <TableCaption>Danh sách danh mục trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã danh mục</Th>
                <Th>Tên danh mục</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listDanhMuc.map((danhmuc: DanhMucFormType) => (
                <Tr key={danhmuc.madm}>
                  <Td>{danhmuc.madm}</Td>
                  <Td>{danhmuc.tendm}</Td>
                  <Td>
                    <ButtonEdit onClick={() => handleEdit(danhmuc)} />
                  </Td>
                  <Td>
                    <ButtonDelete onClick={() => handleDelete(danhmuc)} />
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
          title={"Danh mục sản phẩm"}
          titleButtonCreate="Thêm danh mục"
          onClickCreate={() => {
            navigate("/admin/danhmuc/create");
          }}
        />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default DanhMucPage;
