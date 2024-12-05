import { Button, Flex, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { InputCustom } from "../../../components/form/InputCustom";
import { ModalWrapper } from "../../../components/ui/ModalWrapper";
import { DonHangType } from "../../../types/donhang";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDH: DonHangType;
}

export const ModalDCGH = (props: Props) => {
  const { isOpen, onClose, selectedDH } = props;

  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      body={
        <Flex direction={"column"} gap={10}>
          <InputCustom
            control={control}
            name="hoTen"
            errors={errors}
            label="Họ tên"
            disabled={true}
            defaultValue={selectedDH.hoTen}
          />

          <InputCustom
            control={control}
            name="email"
            errors={errors}
            label="Email"
            disabled={true}
            defaultValue={selectedDH.email}
          />

          <InputCustom
            control={control}
            name="sdt"
            errors={errors}
            label="Số điện thoại"
            disabled={true}
            defaultValue={selectedDH.sdt}
          />

          <InputCustom
            control={control}
            name="diaChi"
            errors={errors}
            label="Địa chỉ"
            disabled={true}
            defaultValue={selectedDH.diaChi}
          />

          <InputCustom
            control={control}
            name="ghichu"
            errors={errors}
            label="Ghi chú"
            disabled={true}
            defaultValue={selectedDH.ghichu}
          />

          <Flex justifyContent={"flex-end"} direction={"row"} gap={10}>
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
          Địa chỉ giao hàng
        </Text>
      }
    />
  );
};
