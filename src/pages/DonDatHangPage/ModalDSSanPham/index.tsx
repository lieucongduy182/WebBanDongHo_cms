import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { InputCustom } from "../../../components/form/InputCustom";
import {
  OptionSelect,
  SelectCustom,
} from "../../../components/form/SelectCustom";
import { ModalWrapper } from "../../../components/ui/ModalWrapper";
import { useAppDispatch, useAppSelector } from "../../../hooks/app-hook";
import { useToastCustom } from "../../../hooks/useToastCustom";
import { selectListSanPham } from "../../../stores/sanpham";
import { getListSanPham } from "../../../stores/sanpham/sanpham.thunk";
import { DanhSachDonDatHangType } from "../../../types/dondathang";
import { validationDSSPDDH } from "../ValidationDonDatHang";

interface Props {
  handleOnCloseModal: () => void;
  handleSubmitData: (data: DanhSachDonDatHangType) => void;
  isOpenModal: boolean;
}

export const ModalDSSanPham = (props: Props) => {
  const { handleOnCloseModal, handleSubmitData, isOpenModal } = props;
  const dispatch = useAppDispatch();
  const listSP = useAppSelector(selectListSanPham);
  const { maddh: maddhParams } = useParams();

  const [listOptionSP, setListOptionSP] = useState<OptionSelect[]>([]);

  const toast = useToastCustom();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<DanhSachDonDatHangType>({
    mode: "onChange",
    resolver: yupResolver(validationDSSPDDH),
    defaultValues: {
      gia: 0,
      masp: "",
      soluong: 0,
    },
  });

  const maspForm = watch("masp");
  const giaForm = watch("gia");

  const onSubmit = async (data: DanhSachDonDatHangType) => {
    handleSubmitData(data);
    reset();
    toast({
      description: "Thêm thành công",
      status: "success",
      title: "Thêm sản phẩm đơn đặt hàng",
    });
  };

  useEffect(() => {
    if (maddhParams) return;
    dispatch(getListSanPham());
  }, [maddhParams]);

  useEffect(() => {
    const listOption: OptionSelect[] = listSP.map((sp) => {
      return {
        value: sp.masp,
        label: sp.tensp,
        price: sp.dongia,
      };
    });

    setListOptionSP(listOption);
    if (listOption.length > 0) {
      setValue("masp", listOption[0].value as string);
      setValue("gia", listOption[0].price as number);
    }
  }, [listSP]);

  useEffect(() => {
    const findGia = listOptionSP.find((item) => item.value === maspForm);

    if (!findGia) return;

    setValue("gia", findGia.price as number);
  }, [maspForm]);

  return (
    <ModalWrapper
      isOpen={isOpenModal}
      onClose={handleOnCloseModal}
      body={
        <form>
          <Flex mt="20" w={"100%"} justifyContent={"center"}>
            <Flex w={"360px"} direction={"column"} gap={10}>
              <SelectCustom
                control={control}
                errors={errors}
                name="masp"
                label="Sản phẩm"
                listOption={listOptionSP}
                isRequired
              />

              <InputCustom
                control={control}
                name="soluong"
                label="Số lượng"
                errors={errors}
                isRequired
              />

              <FormControl>
                <FormLabel mb={"4px"}>Đơn giá</FormLabel>
                <Controller
                  render={() => <Input disabled={true} value={giaForm} />}
                  control={control}
                  name={"gia"}
                />
              </FormControl>

              <Button
                colorScheme="blue"
                mt={"24px"}
                w={"100%"}
                h={"48px"}
                onClick={handleSubmit(onSubmit)}
              >
                Thêm
              </Button>
            </Flex>
          </Flex>
        </form>
      }
      header={
        <Text textAlign={"center"} fontWeight={700} fontSize={24}>
          Thông tin sản phẩm đặt hàng
        </Text>
      }
    />
  );
};
