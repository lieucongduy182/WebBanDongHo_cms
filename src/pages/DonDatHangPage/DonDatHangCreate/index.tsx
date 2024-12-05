import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DonDatHangService } from "../../../api/dondathang";
import { PhieuNhapService } from "../../../api/phieunhap";
import { PageWrapper } from "../../../components/ui/PageWrapper";
import { TitlePage } from "../../../components/ui/TitlePage";
import { useAppSelector } from "../../../hooks/app-hook";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { selectDetailNV } from "../../../stores/nhanvien";
import {
  DanhSachDonDatHangType,
  DonDatHangFormType,
} from "../../../types/dondathang";
import { DonDatHangForm } from "../DonDatHangForm";
import { validationDDH } from "../ValidationDonDatHang";

const DonDatHangCreate = () => {
  const toast = useToastCustom();
  const profile = useAppSelector(selectDetailNV);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DonDatHangFormType>({
    mode: "onChange",
    resolver: yupResolver(validationDDH),
    defaultValues: {
      ds: [],
      maddh: "",
      mancc: "",
    },
  });

  const [listDS, setListDS] = useState<DanhSachDonDatHangType[]>([]);

  const onSubmit = async (data: DonDatHangFormType) => {
    try {
      await DonDatHangService.createDonDatHang({ ...data, manv: profile.manv });
      await PhieuNhapService.createPhieuNhap({
        manv: profile.manv,
        maddh: data.maddh,
        ds: data.ds as any,
        mapn: "",
      });
      setListDS([]);
      toast({
        title: "Tạo danh sách đơn đặt hàng",
        description: "Tạo danh sách đơn đặt hàng thành công",
        status: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Tạo đơn đặt hàng",
        description: (error as any).response.data,
        status: "error",
      });
    }
  };

  return (
    <PageWrapper>
      <TitlePage
        linkReturn={"/admin/dondathang"}
        isShowButtonCreate={false}
        title="Tạo đơn đặt hàng"
      />

      <DonDatHangForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        titleButton="Tạo đơn đặt hàng"
        setValue={setValue}
        listDS={listDS}
        setListDS={setListDS}
      />
    </PageWrapper>
  );
};

export default DonDatHangCreate;
