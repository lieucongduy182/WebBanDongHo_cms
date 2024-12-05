import { Button, Flex } from "@chakra-ui/react";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";

import { InputCustom } from "../../../components/form/InputCustom";
import { ThuongHieuFormType } from "../../../types/thuonghieu";

interface Props {
  onSubmit: (data: ThuongHieuFormType) => void;
  handleSubmit: UseFormHandleSubmit<ThuongHieuFormType, undefined>;
  control: Control<ThuongHieuFormType, any>;
  errors: FieldErrors<ThuongHieuFormType>;
  titleButton: string;
  isEdit?: boolean;
}

export const ThuongHieuForm = (props: Props) => {
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
            name="math"
            label="Mã thương hiệu"
            errors={errors}
            isRequired
            disabled={isEdit}
          />

          <InputCustom
            control={control}
            name="tenth"
            label="Tên thương hiệu"
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
