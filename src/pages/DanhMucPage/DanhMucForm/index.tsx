import { Button, Flex } from "@chakra-ui/react";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

import { InputCustom } from "../../../components/form/InputCustom";
import { DanhMucFormType } from "../../../types/danhmuc";

interface Props {
  onSubmit: (data: DanhMucFormType) => void;
  handleSubmit: UseFormHandleSubmit<DanhMucFormType, undefined>;
  control: Control<DanhMucFormType, any>;
  errors: FieldErrors<DanhMucFormType>;
  titleButton: string;
  isEdit?: boolean;
}

export const DanhMucForm = (props: Props) => {
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
            name="madm"
            label="Mã danh mục"
            errors={errors}
            isRequired
            disabled={isEdit}
          />

          <InputCustom
            control={control}
            name="tendm"
            label="Tên danh mục"
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
