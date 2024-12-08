import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

import axiosClient from "../../../api";
import { SanPhamService } from "../../../api/sanpham";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { AddSanPhamFormType } from "../../../types/sanpham";
import { SanPhamForm } from "../SanPhamForm";
import { validationSanPham } from "../ValidationSanPham";

export function toLowerCaseNonAccentVietnamese(str: string) {
  str = str.toLowerCase();

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

const SanPhamCreate = () => {
  const toast = useToastCustom();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm<AddSanPhamFormType>({
    mode: "onChange",
    resolver: yupResolver(validationSanPham),
    defaultValues: {
      chitietSP: "",
      dongia: 0,
      madm: "",
      mancc: "",
      masp: "",
      math: "",
      soluong: 0,
      tensp: "",
    },
  });

  const onSubmit = async (data: AddSanPhamFormType) => {
    const formData = new FormData();
    formData.append("file", data.image[0] as string);
    formData.append("upload_preset", "project_dongho");

    // const formData2 = new FormData();
    // formData2.append("file", data.image2[0] as string);
    // formData2.append("upload_preset", "project_dongho");

    // const formData3 = new FormData();
    // formData3.append("file", data.image3[0] as string);
    // formData3.append("upload_preset", "project_dongho");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    let image = "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    let image2 = "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    let image3 = "";

    setIsLoading(true);
    if (data.image.length > 0) {
      await axiosClient
        .post(
          "https://api.cloudinary.com/v1_1/dt3ibkgcn/image/upload",
          formData,
        )
        .then((response) => {
          image = response.data.url;
        });
    }

    // if (data.image2.length > 0) {
    //   await axiosClient
    //     .post(
    //       "https://api.cloudinary.com/v1_1/dt3ibkgcn/image/upload",
    //       formData2,
    //     )
    //     .then((response) => {
    //       image2 = response.data.url;
    //     });
    // }
    // if (data.image3.length > 0) {
    //   await axiosClient
    //     .post(
    //       "https://api.cloudinary.com/v1_1/dt3ibkgcn/image/upload",
    //       formData3,
    //     )
    //     .then((response) => {
    //       image3 = response.data.url;
    //     });
    // }

    try {
      const response = await SanPhamService.createSanPham({
        ...data,
        image,
        // image2,
        // image3,
        slug: slugify(
          toLowerCaseNonAccentVietnamese(data.tensp) || "",
        ).toLowerCase(),
      });

      toast({
        title: "Tạo sản phẩm thành công",
        description: response.data,
        status: "success",
      });

      reset();
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Đã xảy ra lỗi, tạo sản phẩm thất bại",
        description: (error as any).response.data,
        status: "error",
      });
    }
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/sanpham"}
        isShowButtonCreate={false}
        title="Tạo sản phẩm"
      />

      <SanPhamForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Tạo sản phẩm"
        setValue={setValue}
        register={register}
        isLoading={isLoading}
      />
    </PageWrapper>
  );
};

export default SanPhamCreate;
