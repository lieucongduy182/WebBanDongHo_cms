import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { InputCustom } from "../../components/form/InputCustom";
import { InputPasswordCustom } from "../../components/form/InputPasswordCustom";
import { useAppDispatch, useAppSelector } from "../../hooks/app-hook";
import { selectUsername } from "../../stores/auth";
import { signInWithCredentials } from "../../stores/auth/auth.thunk";

export interface LoginFormType {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập username"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const LoginPage = () => {
  const username =
    useAppSelector(selectUsername) || localStorage.getItem("username");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!username) return;
    navigate("/admin/danhmuc");
  }, [username]);

  const onSubmit = async (data: LoginFormType) => {
    const response = await dispatch(signInWithCredentials(data));

    if (response?.error?.message === "Rejected") {
      setMessage("Tài khoản hoặc mật khẩu không đúng!");
      return;
    }
    if (response.payload.quyen === 2) {
      setMessage("Tài khoản không phải là admin");
      return;
    }

    navigate("/admin/danhmuc");
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
          Login
          {message && (
            <Text align={"center"} fontSize={"14px"} color={"red"}>
              {message}
            </Text>
          )}
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
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <InputPasswordCustom
                control={control}
                name="password"
                label="Mật khẩu"
                errors={errors}
                isRequired
              />

              <Text
                textAlign={"right"}
                cursor={"pointer"}
                color={"#3182ce"}
                onClick={() => {
                  navigate("/admin/forget-password");
                }}
              >
                Quên mật khẩu?
              </Text>
            </Box>

            <Button
              colorScheme="blue"
              mt={"24px"}
              w={"100%"}
              h={"48px"}
              type="submit"
            >
              Đăng nhập
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default LoginPage;
