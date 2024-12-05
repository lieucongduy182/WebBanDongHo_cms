import { Flex, Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { NhanVienService } from "../../../api/nhanvien";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { AddNhanVienFormType } from "../../../types/nhanvien";
import { NhanVienForm } from "../NhanVienForm";
import { validationNhanVien } from "../ValidationNhanVien";

const NhanVienEdit = () => {
  const toast = useToastCustom();
  const { manv: manvParams } = useParams();

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
    if (!manvParams) return;

    const fetchData = async () => {
      const response =
        await NhanVienService.getDetailNhanVienByMaNV(manvParams);
      const { manv, hoten, gioitinh, sdt, diachi, email, luong, taikhoan } =
        response.data;

      setValue("manv", manv);
      setValue("hoten", hoten);
      setValue("diachi", diachi);
      setValue("sdt", sdt);
      setValue("email", email);
      setValue("gioitinh", gioitinh);
      setValue("luong", luong);
      setValue("username", taikhoan.username);
      setIsLoading(false);
    };
    fetchData();
  }, [manvParams]);

  const onSubmit = async (data: AddNhanVienFormType) => {
    try {
      await NhanVienService.updateNhanVien(data.manv as string, data);

      toast({
        title: "Update nhân viên",
        description: "Update nhân viên thành công!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Update nhân viên",
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
        titleButton="Cập nhật nhân viên"
        isEdit
      />
    );
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/nhanvien"}
        isShowButtonCreate={false}
        title="Update nhân viên"
      />

      {renderForm()}
    </PageWrapper>
  );
};

export default NhanVienEdit;
