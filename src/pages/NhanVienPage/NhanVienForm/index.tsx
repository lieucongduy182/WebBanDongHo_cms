import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

import { InputCustom } from "../../../components/form/InputCustom";
import { AddNhanVienFormType } from "../../../types/nhanvien";

interface Props {
  onSubmit: (data: AddNhanVienFormType) => void;
  handleSubmit: UseFormHandleSubmit<AddNhanVienFormType, undefined>;
  control: Control<AddNhanVienFormType, any>;
  errors: FieldErrors<AddNhanVienFormType>;
  titleButton: string;
  isEdit?: boolean;
  isDisableLuong?: boolean;
}

export const NhanVienForm = (props: Props) => {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    titleButton,
    isEdit = false,
    isDisableLuong = false,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex mt="20" w={"100%"} justifyContent={"center"}>
        <Flex w={"360px"} direction={"column"} gap={10}>
          {isEdit && (
            <InputCustom
              control={control}
              name="manv"
              label="Mã nhân viên"
              errors={errors}
              isRequired
              disabled={isEdit}
            />
          )}

          <InputCustom
            control={control}
            name="username"
            label="Username nhân viên"
            errors={errors}
            isRequired
            disabled={isEdit}
          />

          <InputCustom
            control={control}
            name="email"
            label="Email nhân viên"
            errors={errors}
            isRequired
          />

          <InputCustom
            control={control}
            name="hoten"
            label="Họ tên nhân viên"
            errors={errors}
            isRequired
          />

          <FormControl isRequired isInvalid={!!errors["gioitinh"]}>
            <FormLabel mb={"4px"}>Giới tính</FormLabel>
            <Controller
              render={({ field }) => (
                <RadioGroup onChange={field.onChange} value={field.value}>
                  <Stack direction="row" gap={20}>
                    <Radio value="Nam">Nam</Radio>
                    <Radio value="Nữ">Nữ</Radio>
                  </Stack>
                </RadioGroup>
              )}
              control={control}
              name={"gioitinh"}
            />
            <FormErrorMessage mt={"4px"}>
              {!!errors["gioitinh"] && (
                <Text>{errors["gioitinh"]?.message as string}</Text>
              )}
            </FormErrorMessage>
          </FormControl>

          <InputCustom
            control={control}
            name="diachi"
            label="Địa chỉ nhân viên"
            errors={errors}
            isRequired
          />

          <InputCustom
            control={control}
            name="sdt"
            label="SĐT nhân viên"
            errors={errors}
            isRequired
          />

          <InputCustom
            control={control}
            name="luong"
            label="Lương nhân viên"
            errors={errors}
            isRequired
            disabled={isDisableLuong}
          />

          <Button
            colorScheme="blue"
            mt={"24px"}
            w={"100%"}
            h={"48px"}
            type="submit"
          >
            {titleButton}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
