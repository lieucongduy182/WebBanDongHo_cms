import { Flex, Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import slugify from "slugify";

import axiosClient from "../../../api";
import { SanPhamService } from "../../../api/sanpham";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useAppDispatch, useAppSelector } from "../../../hooks/app-hook";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { selectListDanhMuc } from "../../../stores/danhmuc";
import { getListDanhMuc } from "../../../stores/danhmuc/danhmuc.thunk";
import { selectListNCC } from "../../../stores/nhacungcap";
import { getListNCC } from "../../../stores/nhacungcap/nhacungcap.thunk";
import { selectListThuongHieu } from "../../../stores/thuonghieu";
import { getListThuongHieu } from "../../../stores/thuonghieu/thuonghieu.thunk";
import { AddSanPhamFormType } from "../../../types/sanpham";
import { toLowerCaseNonAccentVietnamese } from "../SanPhamCreate";
import { SanPhamForm } from "../SanPhamForm";
import { validationSanPham } from "../ValidationSanPham";

const SanPhamEdit = () => {
  const dispatch = useAppDispatch();
  const listTH = useAppSelector(selectListThuongHieu);
  const listDM = useAppSelector(selectListDanhMuc);
  const listNCC = useAppSelector(selectListNCC);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const toast = useToastCustom();
  const { masp: maspParams } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
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

  const fetchData = async () => {
    if (!maspParams) return;
    await dispatch(getListThuongHieu());
    await dispatch(getListDanhMuc());
    await dispatch(getListNCC());

    const response = await SanPhamService.getDetailSanPham(maspParams);
    const {
      masp,
      tensp,
      soluong,
      chitietSP,
      thuonghieu,
      nhacungcap,
      danhmuc,
      image,
      image2,
      image3,
      dongia,
    } = response.data;

    setValue("masp", masp);
    setValue("tensp", tensp);
    setValue("dongia", dongia);
    setValue("soluong", soluong);
    setValue("chitietSP", chitietSP);
    setValue("madm", danhmuc.madm);
    setValue("mancc", nhacungcap.mancc);
    setValue("math", thuonghieu.math);
    setValue("image", image);
    setValue("image2", image2);
    setValue("image3", image3);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [maspParams]);

  const onSubmit = async (data: AddSanPhamFormType) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.image[0] as string);
    formData.append("upload_preset", "project_dongho");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    let image = data.image;

    setIsLoadingButton(true);
    if (typeof data.image !== "string" && data.image.length > 0) {
      await axiosClient
        .post(
          "https://api.cloudinary.com/v1_1/dt3ibkgcn/image/upload",
          formData,
        )
        .then((response) => {
          image = response.data.url;
        });
    }

    try {
      const thuonghieu = listTH.find((item) => item.math === data.math);
      const nhacungcap = listNCC.find((item) => item.mancc === data.mancc);
      const danhmuc = listDM.find((item) => item.madm === data.madm);

      await SanPhamService.updateSanPham(data.masp as string, {
        ...data,
        thuonghieu,
        nhacungcap,
        danhmuc,
        image,
        slug: slugify(
          toLowerCaseNonAccentVietnamese(data.tensp) || "",
        ).toLowerCase(),
      });

      toast({
        title: "Chỉnh sửa sản phẩm",
        description: "Chỉnh sửa sản phẩm thành công!",
        status: "success",
      });
      setIsLoadingButton(false);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Chỉnh sửa sản phẩm",
        description: "Đã xảy ra lỗi, vui lòng thử lại sau!",
        status: "error",
      });
    }
  };

  const renderForm = () => {
    if (isLoading && getValues("masp") !== "") {
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
      <SanPhamForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Cập nhật sản phẩm"
        isEdit
        register={register}
        setValue={setValue}
        getValues={getValues}
        isLoading={isLoadingButton}
      />
    );
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/sanpham"}
        isShowButtonCreate={false}
        title="Chỉnh sửa sản phẩm"
      />

      {renderForm()}
    </PageWrapper>
  );
};

export default SanPhamEdit;
