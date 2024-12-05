import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { NhanVienService } from "../../../api/nhanvien";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { AddNhanVienFormType } from "../../../types/nhanvien";
import { NhanVienForm } from "../NhanVienForm";
import { validationNhanVien } from "../ValidationNhanVien";

const NhanVienCreate = () => {
  const toast = useToastCustom();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  const onSubmit = async (data: AddNhanVienFormType) => {
    try {
      const response = await NhanVienService.createNhanVien({
        ...data,
        password: "123456",
      });
      toast({
        title: "Tạo nhân viên",
        description: response.data,
        status: "success",
      });
      reset();
      setValue("gioitinh", "Nam");
    } catch (error) {
      toast({
        title: "Đã xảy ra lỗi, tạo nhân viên thất bại",
        description: (error as any).response.data,
        status: "error",
      });
    }
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/nhanvien"}
        isShowButtonCreate={false}
        title="Tạo nhân viên"
      />

      <NhanVienForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Tạo nhân viên"
      />
    </PageWrapper>
  );
};

export default NhanVienCreate;
