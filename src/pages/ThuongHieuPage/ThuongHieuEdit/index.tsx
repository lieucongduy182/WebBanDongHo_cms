import { Flex, Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import slugify from "slugify";

import { ThuongHieuService } from "../../../api/thuonghieu";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { ThuongHieuFormType } from "../../../types/thuonghieu";
import { toLowerCaseNonAccentVietnamese } from "../../SanPhamPage/SanPhamCreate";
import { ThuongHieuForm } from "../ThuongHieuForm";
import { validationThuongHieu } from "../ValidationThuongHieu";

export const ThuongHieuEdit = () => {
  const toast = useToastCustom();
  const { math: mathParams } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ThuongHieuFormType>({
    mode: "onChange",
    resolver: yupResolver(validationThuongHieu),
    defaultValues: {
      math: "",
      tenth: "",
    },
  });

  useEffect(() => {
    if (!mathParams) return;

    const fetchData = async () => {
      const response = await ThuongHieuService.getDetailThuongHieu(mathParams);
      const { math, tenth } = response.data;

      setValue("math", math);
      setValue("tenth", tenth);
      setIsLoading(false);
    };
    fetchData();
  }, [mathParams]);

  const onSubmit = async (data: ThuongHieuFormType) => {
    try {
      await ThuongHieuService.updateThuongHieu(data.math, {
        ...data,
        slug: slugify(
          toLowerCaseNonAccentVietnamese(data.tenth) || "",
        ).toLowerCase(),
      });

      toast({
        title: "Update thương hiệu",
        description: "Update thương hiệu thành công!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Update thương hiệu",
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
      <ThuongHieuForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Cập nhật thương hiệu"
        isEdit
      />
    );
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/thuonghieu"}
        isShowButtonCreate={false}
        title="Update thương hiệu"
      />

      {renderForm()}
    </PageWrapper>
  );
};

export default ThuongHieuEdit;
