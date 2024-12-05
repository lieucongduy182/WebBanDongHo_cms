import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import slugify from "slugify";

import { NhaCungCapService } from "../../../api/nhacungcap";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { NhaCungCapFormType } from "../../../types/nhacungcap";
import { toLowerCaseNonAccentVietnamese } from "../../SanPhamPage/SanPhamCreate";
import { NhaCungCapForm } from "../NhaCungCapForm";
import { validationNhaCungCap } from "../ValidationNhaCungCap";

const NhaCungCapCreate = () => {
  const toast = useToastCustom();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<NhaCungCapFormType>({
    mode: "onChange",
    resolver: yupResolver(validationNhaCungCap),
    defaultValues: {
      mancc: "",
      tenncc: "",
      diachi: "",
      email: "",
      sdt: "",
    },
  });

  const onSubmit = async (data: NhaCungCapFormType) => {
    try {
      const response = await NhaCungCapService.createNhaCungCap({
        ...data,
        slug: slugify(
          toLowerCaseNonAccentVietnamese(data.tenncc) || "",
        ).toLowerCase(),
      });

      toast({
        title: "Tạo nhà cung cấp",
        description: response.data,
        status: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Đã xảy ra lỗi, tạo nhà cung cấp thất bại",
        description: (error as any).response.data,
        status: "error",
      });
    }
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/nhacungcap"}
        isShowButtonCreate={false}
        title="Tạo nhà cung cấp"
      />

      <NhaCungCapForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Tạo nhà cung cấp"
      />
    </PageWrapper>
  );
};

export default NhaCungCapCreate;
