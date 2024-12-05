import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { DonHangService } from "../../../api/donhang";
import { InputCustom } from "../../../components/form/InputCustom";
import {
  OptionSelect,
  SelectCustom,
} from "../../../components/form/SelectCustom";
import { ModalWrapper } from "../../../components/ui/ModalWrapper";
import { useAppDispatch, useAppSelector } from "../../../hooks/app-hook";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { selectUsername } from "../../../stores/auth";
import { getListDonHang } from "../../../stores/donhang/donhang.thunk";
import { selectDetailNV, selectListNV } from "../../../stores/nhanvien";
import {
  getDetailNVByUsername,
  getListNV,
} from "../../../stores/nhanvien/nhanvien.thunk";
import { DonHangType } from "../../../types/donhang";
import { listOptionTrangThai } from "..";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDH: DonHangType;
}

export const ModalTrangThai = (props: Props) => {
  const { isOpen, onClose, selectedDH } = props;
  const toast = useToastCustom();
  const dispatch = useAppDispatch();
  const username =
    useAppSelector(selectUsername) || localStorage.getItem("username");
  const detailNV = useAppSelector(selectDetailNV);
  const listNV = useAppSelector(selectListNV);

  const [listOptionNV, setListOptionNV] = useState<OptionSelect[]>([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const trangthai = watch("trangthai");

  useEffect(() => {
    if (!selectedDH) return;

    setValue("trangthai", selectedDH.trangThai);
  }, [selectedDH]);

  useEffect(() => {
    if (!username) return;
    dispatch(getDetailNVByUsername(username));
  }, [username]);

  useEffect(() => {
    dispatch(getListNV());
  }, []);

  useEffect(() => {
    const listOption = listNV.map((nv) => {
      return {
        value: nv.manv,
        label: nv.hoten,
      };
    });

    setListOptionNV(listOption || []);
  }, [listNV.length]);

  const onSubmit = async (data: any) => {
    const trangthai = Number(data.trangthai);

    try {
      await DonHangService.updateDonHang({
        hinhThucThanhToan: selectedDH.hinhThucThanhToan,
        madh: selectedDH.madh,
        manv: detailNV.manv,
        manvgh: data.manvgh ? data.manvgh : undefined,
        trangthai,
      });

      toast({
        title: "Update trạng thái đơn hàng",
        status: "success",
        description: "Update trạng thái đơn hàng thành công",
      });
      dispatch(getListDonHang());
    } catch (error) {
      toast({
        title: "Update trạng thái đơn hàng",
        status: "error",
        description: "Đã xảy ra lỗi, update đơn hàng thất bại",
      });
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      body={
        <Flex direction={"column"} gap={10}>
          <InputCustom
            control={control}
            name="madh"
            errors={errors}
            label="Mã đơn hàng"
            disabled={true}
            defaultValue={selectedDH.madh}
          />

          <SelectCustom
            control={control}
            errors={errors}
            name="trangthai"
            label="Trạng thái"
            listOption={listOptionTrangThai}
            disabled={trangthai === 4}
          />

          {Number(trangthai) === 2 && (
            <SelectCustom
              control={control}
              errors={errors}
              name="manvgh"
              label="Nhân viên giao hàng"
              listOption={listOptionNV}
            />
          )}

          <Flex justifyContent={"flex-end"} direction={"row"} gap={10}>
            <Button
              background={"#6e9c92"}
              color={"white"}
              _hover={{
                backgroundColor: "#6e9c92",
                transform: "scale(1.1)",
              }}
              transition="transform 0.2s ease-in-out"
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Lưu
            </Button>
            <Button
              background={"#862642"}
              color={"white"}
              _hover={{
                backgroundColor: "#862642",
                transform: "scale(1.1)",
              }}
              transition="transform 0.2s ease-in-out"
              onClick={onClose}
            >
              Huỷ
            </Button>
          </Flex>
        </Flex>
      }
      header={
        <Text textAlign={"center"} fontWeight={700} fontSize={24}>
          Trạng thái đơn hàng
        </Text>
      }
    />
  );
};
