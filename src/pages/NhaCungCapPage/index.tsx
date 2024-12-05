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

import { NhaCungCapService } from "../../api/nhacungcap";
import { ButtonDelete } from "../../components/ui/ButtonDelete";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectIsLoading, selectListNCC } from "../../stores/nhacungcap";
import { getListNCC } from "../../stores/nhacungcap/nhacungcap.thunk";
import { NhaCungCapFormType } from "../../types/nhacungcap";

const NhaCungCapPage = () => {
  const listNCC = useAppSelector(selectListNCC);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const toast = useToastCustom();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListNCC());
  }, []);

  const handleEdit = (nhacungcap: NhaCungCapFormType) => {
    navigate(`/admin/nhacungcap/${nhacungcap.mancc}`);
  };

  const handleDelete = async (nhacungcap: NhaCungCapFormType) => {
    try {
      const response = await NhaCungCapService.deleteNhaCungCap(
        nhacungcap.mancc,
      );

      await dispatch(getListNCC());

      toast({
        title: "Xoá nhà cung cấp",
        description: response.data,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Xoá nhà cung cấp",
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
            <TableCaption>Danh sách nhà cung cấp trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã nhà cung cấp</Th>
                <Th>Tên nhà cung cấp</Th>
                <Th>Địa chỉ nhà cung cấp</Th>
                <Th>Email nhà cung cấp</Th>
                <Th>SĐT nhà cung cấp</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listNCC.map((nhacungcap: NhaCungCapFormType) => (
                <Tr key={nhacungcap.mancc}>
                  <Td>{nhacungcap.mancc}</Td>
                  <Td>{nhacungcap.tenncc}</Td>
                  <Td>{nhacungcap.diachi}</Td>
                  <Td>{nhacungcap.email}</Td>
                  <Td>{nhacungcap.sdt}</Td>
                  <Td>
                    <ButtonEdit onClick={() => handleEdit(nhacungcap)} />
                  </Td>
                  <Td>
                    <ButtonDelete onClick={() => handleDelete(nhacungcap)} />
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
          titleButtonCreate="Thêm nhà cung cấp"
          title={"Nhà cung cấp sản phẩm"}
          onClickCreate={() => {
            navigate("/admin/nhacungcap/create");
          }}
        />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default NhaCungCapPage;
