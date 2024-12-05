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

import { binhLuanService } from "../../api/binhluan";
import { ButtonDelete } from "../../components/ui/ButtonDelete";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectIsLoading, selectListBinhLuan } from "../../stores/binhluan";
import { getListBinhLuan } from "../../stores/binhluan/binhluan.thunk";
import { BinhLuanType } from "../../types/binhluan";

const BinhLuanPage = () => {
  const listBinhLuan = useAppSelector(selectListBinhLuan);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const toast = useToastCustom();

  useEffect(() => {
    dispatch(getListBinhLuan());
  }, []);

  const handleDelete = async (binhluan: BinhLuanType) => {
    try {
      const response = await binhLuanService.deleteBinhLuan(binhluan.mabl);

      await dispatch(getListBinhLuan());

      toast({
        title: "Xoá bình luận",
        description: response.data,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Xoá bình luận",
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
            <TableCaption>Danh sách bình luận trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã bình luận</Th>
                <Th>Thời gian</Th>
                <Th>Tên SP</Th>
                <Th>Username</Th>
                <Th>Nội dung</Th>
                <Th>Xoá</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listBinhLuan.map((binhluan: BinhLuanType) => (
                <Tr key={binhluan.mabl}>
                  <Td>{binhluan.mabl}</Td>
                  <Td>{moment(binhluan.time).format("DD/MM/YYYY hh:ss")}</Td>
                  <Td>{binhluan.sanpham.tensp}</Td>
                  <Td>{binhluan.khachhang.taikhoan.username}</Td>
                  <Td>
                    <p
                      style={{
                        maxWidth: "200px",
                        whiteSpace: "pre-line",
                        // textOverflow: "ellipsis",
                        // overflow: "hidden",
                      }}
                    >
                      {binhluan.noidung}
                    </p>
                  </Td>

                  <Td>
                    <ButtonDelete onClick={() => handleDelete(binhluan)} />
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
        <TitlePage title={"Bình luận sản phẩm"} isShowButtonCreate={false} />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default BinhLuanPage;
