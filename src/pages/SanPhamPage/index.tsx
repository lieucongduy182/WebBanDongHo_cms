import {
  Box,
  Flex,
  Image,
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

import { SanPhamService } from "../../api/sanpham";
import { ButtonDelete } from "../../components/ui/ButtonDelete";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Loading } from "../../components/ui/Loading";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { ConvertPrice } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectIsLoading, selectListSanPham } from "../../stores/sanpham";
import { getListSanPham } from "../../stores/sanpham/sanpham.thunk";
import { SanPhamType } from "../../types/sanpham";

const SanPhamPage = () => {
  const listSP = useAppSelector(selectListSanPham);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const toast = useToastCustom();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListSanPham());
  }, []);

  const handleEdit = (sanpham: SanPhamType) => {
    navigate(`/admin/sanpham/${sanpham.masp}`);
  };

  const handleDelete = async (sanpham: SanPhamType) => {
    try {
      const response = await SanPhamService.deleteSanPham(sanpham.masp);

      await dispatch(getListSanPham());

      toast({
        title: "Xoá sản phẩm",
        description: response.data,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Xoá sản phẩm",
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
            <TableCaption>Danh sách sản phẩm trong hệ thống</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã sản phẩm</Th>
                <Th>Tên sản phẩm</Th>
                <Th>Số lượng</Th>
                <Th>Đơn giá</Th>
                <Th>Chi tiết</Th>
                <Th>Hình</Th>
                <Th>Trạng thái</Th>
                <Th>Thương hiệu</Th>
                <Th>Danh mục</Th>
                <Th>Nhà cung cấp</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listSP.map((sanpham: SanPhamType) => (
                <Tr key={sanpham.masp}>
                  <Td>{sanpham.masp}</Td>
                  <Td>{sanpham.tensp}</Td>
                  <Td>{sanpham.soluong}</Td>
                  <Td>{ConvertPrice(sanpham.dongia)}</Td>
                  <Td>{sanpham.chitietSP}</Td>
                  <Td>
                    <Image
                      src={sanpham.image}
                      alt=""
                      height={75}
                      objectFit={"contain"}
                      w={75}
                    />
                  </Td>
                  <Td>{sanpham.trangthai}</Td>
                  <Td>{sanpham.thuonghieu.tenth}</Td>
                  <Td>{sanpham.danhmuc.tendm}</Td>
                  <Td>{sanpham.nhacungcap.tenncc}</Td>

                  <Td>
                    <ButtonEdit onClick={() => handleEdit(sanpham)} />
                  </Td>
                  <Td>
                    <ButtonDelete onClick={() => handleDelete(sanpham)} />
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
          titleButtonCreate="Thêm sản phẩm"
          title={"Danh sách sản phẩm"}
          onClickCreate={() => {
            navigate("/admin/sanpham/create");
          }}
        />

        {renderData()}
      </Flex>
    </PageWrapper>
  );
};

export default SanPhamPage;
