import { Flex, Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import slugify from "slugify";

import { NhaCungCapService } from "../../../api/nhacungcap";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { NhaCungCapFormType } from "../../../types/nhacungcap";
import { toLowerCaseNonAccentVietnamese } from "../../SanPhamPage/SanPhamCreate";
import { NhaCungCapForm } from "../NhaCungCapForm";
import { validationNhaCungCap } from "../ValidationNhaCungCap";

const NhaCungCapEdit = () => {
  const toast = useToastCustom();
  const { mancc: manccParams } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
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

  useEffect(() => {
    if (!manccParams) return;

    const fetchData = async () => {
      const response = await NhaCungCapService.getDetailNhaCungCap(manccParams);
      const { mancc, tenncc, diachi, sdt, email } = response.data;

      setValue("mancc", mancc);
      setValue("tenncc", tenncc);
      setValue("diachi", diachi);
      setValue("sdt", sdt);
      setValue("email", email);
      setIsLoading(false);
    };
    fetchData();
  }, [manccParams]);

  const onSubmit = async (data: NhaCungCapFormType) => {
    try {
      await NhaCungCapService.updateNhaCungCap(data.mancc, {
        ...data,
        slug: slugify(
          toLowerCaseNonAccentVietnamese(data.tenncc) || "",
        ).toLowerCase(),
      });

      toast({
        title: "Update nhà cung cấp",
        description: "Update nhà cung cấp thành công!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Update nhà cung cấp",
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
      <NhaCungCapForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Cập nhật nhà cung cấp"
        isEdit
      />
    );
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/nhacungcap"}
        isShowButtonCreate={false}
        title="Update nhà cung cấp"
      />

      {renderForm()}
    </PageWrapper>
  );
};

export default NhaCungCapEdit;
