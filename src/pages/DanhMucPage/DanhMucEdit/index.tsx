import { Flex, Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import slugify from "slugify";

import { DanhMucService } from "../../../api/danhmuc";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { DanhMucFormType } from "../../../types/danhmuc";
import { toLowerCaseNonAccentVietnamese } from "../../SanPhamPage/SanPhamCreate";
import { DanhMucForm } from "../DanhMucForm";
import { validationDanhMuc } from "../ValidationDanhMuc";

const DanhMucEdit = () => {
  const toast = useToastCustom();
  const { madm: madmParams } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<DanhMucFormType>({
    mode: "onChange",
    resolver: yupResolver(validationDanhMuc),
    defaultValues: {
      madm: "",
      tendm: "",
    },
  });

  useEffect(() => {
    if (!madmParams) return;

    const fetchData = async () => {
      const response = await DanhMucService.getDetailDanhMuc(madmParams);
      const { madm, tendm } = response.data;

      setValue("madm", madm);
      setValue("tendm", tendm);
      setIsLoading(false);
    };
    fetchData();
  }, [madmParams]);

  const onSubmit = async (data: DanhMucFormType) => {
    try {
      await DanhMucService.updateDanhMuc(data.madm, {
        ...data,
        slug: slugify(
          toLowerCaseNonAccentVietnamese(data.tendm) || "",
        ).toLowerCase(),
      });

      toast({
        title: "Update danh mục",
        description: "Update danh mục thành công!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Update danh mục",
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
      <DanhMucForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Cập nhật danh mục"
        isEdit
      />
    );
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/danhmuc"}
        isShowButtonCreate={false}
        title="Update danh mục"
      />

      {renderForm()}
    </PageWrapper>
  );
};

export default DanhMucEdit;
