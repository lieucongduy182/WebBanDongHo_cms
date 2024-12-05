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
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonDelete } from "../../components/ui/ButtonDelete";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { selectIsLoading, selectListDonDatHang } from "../../stores/dondathang";
import { getListDonDatHang } from "../../stores/dondathang/dondathang.thunk";
import { DonDatHangType } from "../../types/dondathang";

export const DonDatHangPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const listDonDatHang = useAppSelector(selectListDonDatHang);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getListDonDatHang());
  }, []);

  const handleEdit = (dondathang: DonDatHangType) => {
    navigate(`/admin/dondathang/${dondathang.mddh}`);
  };

  const handleDelete = async (dondathang: DonDatHangType) => {
    // try {
    //   const response = await DanhMucService.deleteDanhMuc(danhmuc.madm);
    //   await dispatch(getListDanhMuc());
    //   toast({
    //     title: "Xoá danh mục",
    //     description: response.data,
    //     status: "success",
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Xoá danh mục",
    //     description: (error as any).response.data,
    //     status: "error",
    //   });
    // }
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
            <TableCaption>Danh sách đơn đạt hàng trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã ĐĐH</Th>
                <Th>Ngày đặt</Th>
                <Th>Nhà cung cấp</Th>
                <Th>Nhân viên</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listDonDatHang.map((dondathang: DonDatHangType, index) => (
                <Tr key={index}>
                  <Td>{dondathang.mddh}</Td>
                  <Td>{moment(dondathang.ngaydat).format("DD-MM-YYYY")}</Td>
                  <Td>{dondathang.nhacungcap.tenncc}</Td>
                  <Td>{dondathang.nhanvien.hoten}</Td>
                  <Td>
                    <ButtonEdit onClick={() => handleEdit(dondathang)} />
                  </Td>
                  <Td>
                    <ButtonDelete onClick={() => handleDelete(dondathang)} />
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
          title={"Danh sách đơn đặt hàng"}
          titleButtonCreate="Thêm đơn đặt hàng"
          onClickCreate={() => {
            navigate("/admin/dondathang/create");
          }}
        />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};
