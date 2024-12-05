import { Button, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AnyObject, TestContext } from "yup";
import * as yup from "yup";

import { AuthService } from "../../api/auth";
import { InputCustom } from "../../components/form/InputCustom";
import { PageWrapper } from "../../components/ui/PageWrapper";
import { TitlePage } from "../../components/ui/TitlePage";
import { useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectUsername } from "../../stores/auth";

export interface ChangePasswordForm {
  password: string;
  passwordConfirmation: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(
      6,
      "Mật khẩu phải trên 6 kí tự, có chữ hoa, chữ thường, số và kí tự đặc biệt",
    ),
  passwordConfirmation: yup
    .string()
    .trim()
    .required("Vui lòng nhập xác nhận mật khẩu")
    .test(
      "empty",
      "Xác nhận mật khẩu không trùng khớp",
      (
        confirm_password: string | undefined,
        testContext: TestContext<AnyObject>,
      ): boolean => {
        if (!testContext.parent.password) return true;
        return testContext.parent.password === confirm_password;
      },
    ),
});

const DoiMatKhauPage = () => {
  const toast = useToastCustom();
  const username =
    useAppSelector(selectUsername) || localStorage.getItem("username");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await AuthService.changePassword({
        password: data.password,
        username: username || "",
      });

      toast({
        title: "Đổi mật khẩu",
        description: "Đổi mật khẩu thành công",
        status: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Đổi mật khẩu",
        description: "Đã xảy ra lỗi, đổi mật khẩu thất bại",
        status: "error",
      });
    }
  };

  return (
    <PageWrapper>
      <Flex direction={"column"} gap={10}>
        <TitlePage title={"Đổi mật khẩu"} isShowButtonCreate={false} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex mt="20" w={"100%"} justifyContent={"center"}>
            <Flex w={"360px"} direction={"column"} gap={10}>
              <InputCustom
                control={control}
                name="password"
                label="Nhập mật khẩu"
                errors={errors}
                isRequired
              />

              <InputCustom
                control={control}
                name="passwordConfirmation"
                label="Xác nhận mật khẩu"
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
                Đổi mật khẩu
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </PageWrapper>
  );
};

export default DoiMatKhauPage;
