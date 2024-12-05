import { Button, Flex } from "@chakra-ui/react";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

import { InputCustom } from "../../../components/form/InputCustom";
import { NhaCungCapFormType } from "../../../types/nhacungcap";

interface Props {
  onSubmit: (data: NhaCungCapFormType) => void;
  handleSubmit: UseFormHandleSubmit<NhaCungCapFormType, undefined>;
  control: Control<NhaCungCapFormType, any>;
  errors: FieldErrors<NhaCungCapFormType>;
  titleButton: string;
  isEdit?: boolean;
}

export const NhaCungCapForm = (props: Props) => {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    titleButton,
    isEdit = false,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex mt="20" w={"100%"} justifyContent={"center"}>
        <Flex w={"360px"} direction={"column"} gap={10}>
          <InputCustom
            control={control}
            name="mancc"
            label="Mã nhà cung cấp"
            errors={errors}
            isRequired
            disabled={isEdit}
          />

          <InputCustom
            control={control}
            name="tenncc"
            label="Tên nhà cung cấp"
            errors={errors}
            isRequired
          />

          <InputCustom
            control={control}
            name="diachi"
            label="Địa chỉ nhà cung cấp"
            errors={errors}
            isRequired
          />

          <InputCustom
            control={control}
            name="email"
            label="Email nhà cung cấp"
            errors={errors}
            isRequired
          />

          <InputCustom
            control={control}
            name="sdt"
            label="SĐT nhà cung cấp"
            errors={errors}
            isRequired
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
