import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { AuthService } from "../../api/auth";
import { InputCustom } from "../../components/form/InputCustom";
import { useAppSelector } from "../../hooks/app-hook";
import { useToastCustom } from "../../hooks/useToastCustom";
import { selectUsername } from "../../stores/auth";

export interface ForgetPasswordForm {
  username: string;
  sdt: string;
  email: string;
  quyen?: number;
}

const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập username"),
  sdt: yup.string().required("Vui lòng nhập số điện thoại"),
  email: yup
    .string()
    .required("Vui lòng nhập địa chỉ email")
    .email("Vui lòng nhập đúng định dạng email"),
});

const ForgetPasswordPage = () => {
  const username =
    useAppSelector(selectUsername) || localStorage.getItem("username");

  const toast = useToastCustom();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ForgetPasswordForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      quyen: 1,
      sdt: "",
      username: "",
    },
  });

  useEffect(() => {
    if (!username) return;
    navigate("/admin/danhmuc");
  }, [username]);

  const onSubmit = async (data: ForgetPasswordForm) => {
    try {
      setIsLoading(true);
      await AuthService.forgetPassword({ ...data, quyen: 1 });

      toast({
        title: "Lấy lại mật khẩu",
        description: "Lấy lại mật khẩu thành công, vui lòng kiểm tra mail!",
        status: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Lấy lại mật khẩu",
        description: (error as any).response.data as string,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width={"100%"} height={"100vh"}>
      <Flex
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={10}
        direction={"column"}
      >
        <Text align={"center"} fontSize={"48px"} fontWeight={700}>
          Lấy lại mật khẩu
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap={5} minWidth={"360px"}>
            <Box>
              <InputCustom
                control={control}
                name="username"
                label="Tên tài khoản"
                errors={errors}
                isRequired
              />
            </Box>

            <Box>
              <InputCustom
                control={control}
                name="email"
                label="Email"
                errors={errors}
                isRequired
              />
            </Box>

            <Box>
              <InputCustom
                control={control}
                name="sdt"
                label="Số điện thoại"
                errors={errors}
                isRequired
              />
            </Box>

            <Button
              colorScheme="blue"
              mt={"24px"}
              w={"100%"}
              h={"48px"}
              type="submit"
              isLoading={isLoading}
            >
              Xác nhận
            </Button>

            <Text
              textAlign={"center"}
              onClick={() => {
                navigate("/admin/login");
              }}
            >
              Bạn đã sẵn sàng đăng nhập?{" "}
              <span
                style={{
                  color: "#3182ce",
                  cursor: "pointer",
                }}
              >
                Đăng nhập ngay
              </span>{" "}
            </Text>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default ForgetPasswordPage;
