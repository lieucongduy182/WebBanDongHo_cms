import { Flex, Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { NhanVienService } from "../../api/nhanvien";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectUsername } from "../../stores/auth";
import { selectDetailNV } from "../../stores/nhanvien";
import { AddNhanVienFormType } from "../../types/nhanvien";
import { NhanVienForm } from "../NhanVienPage/NhanVienForm";
import { validationNhanVien } from "../NhanVienPage/ValidationNhanVien";

const ThongTinTaiKhoanPage = () => {
  const toast = useToastCustom();

  const username =
    useAppSelector(selectUsername) || localStorage.getItem("username");
  const detailNV = useAppSelector(selectDetailNV);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<AddNhanVienFormType>({
    mode: "onChange",
    resolver: yupResolver(validationNhanVien),
    defaultValues: {
      diachi: "",
      email: "",
      gioitinh: "Nam",
      hoten: "",
      luong: 0,
      sdt: "",
      username: "",
    },
  });

  useEffect(() => {
    if (!username || !detailNV.manv) return;

    setValue("manv", detailNV.manv);
    setValue("hoten", detailNV.hoten);
    setValue("diachi", detailNV.diachi);
    setValue("sdt", detailNV.sdt);
    setValue("email", detailNV.email);
    setValue("gioitinh", detailNV.gioitinh);
    setValue("luong", detailNV.luong);
    setValue("username", detailNV.taikhoan.username);
    setIsLoading(false);
  }, [username, detailNV.manv]);

  const onSubmit = async (data: AddNhanVienFormType) => {
    try {
      await NhanVienService.updateNhanVien(data.manv as string, data);

      toast({
        title: "Cập nhật thông tin",
        description: "Cập nhật thông tin thành công!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Cập nhật thông tin",
        description: "Đã xảy ra lỗi, vui lòng thử lại sau!",
        status: "error",
      });
    }
  };

  const renderForm = () => {
    if (isLoading) {
      return (
        <Flex height={"500px"} justifyContent={"center"} alignItems={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#6e9c92"
            size="xl"
          />
        </Flex>
      );
    }

    return (
      <NhanVienForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Cập nhật thông tin"
        isEdit
        isDisableLuong
      />
    );
  };
  return (
    <PageWrapper>
      <Flex direction={"column"} gap={10}>
        <TitlePage title={"Thông tin tài khoản"} isShowButtonCreate={false} />

        {renderForm()}
      </Flex>
    </PageWrapper>
  );
};

export default ThongTinTaiKhoanPage;
