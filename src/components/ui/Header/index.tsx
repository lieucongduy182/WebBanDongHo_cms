import { Box, Button, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetAuth } from "../../../stores/auth";
import { resetNV } from "../../../stores/nhanvien";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(resetAuth());
    dispatch(resetNV());

    navigate("/admin/login");
  };

  const handleChangePassword = () => {
    navigate("/admin/doimatkhau");
  };

  const handleChangeInformation = () => {
    navigate("/admin/thongtintaikhoan");
  };
  return (
    <Box w={"100%"} height={"75px"} backgroundColor={"#6e9c92"}>
      <Box height={"100%"} px={{ lg: "60px", xl: "72px" }}>
        <Flex
          height={"100%"}
          justifyContent={"space-between"}
          mx={"0 auto"}
          alignItems={"center"}
        >
          <Flex
            alignItems={"center"}
            height={"100%"}
            color={"white"}
            fontSize={"36px"}
            fontWeight={700}
          >
            Trang quản trị
          </Flex>

          <Flex
            alignItems={"center"}
            height={"100%"}
            color={"white"}
            fontSize={"36px"}
            fontWeight={700}
          >
            <Button
              background={"transparent"}
              color={"white"}
              fontWeight={700}
              alignItems={"center"}
              _hover={{
                background: "transparent",
              }}
              onClick={handleChangeInformation}
            >
              Thông tin tài khoản
            </Button>

            <Button
              background={"transparent"}
              color={"white"}
              fontWeight={700}
              alignItems={"center"}
              _hover={{
                background: "transparent",
              }}
              onClick={handleChangePassword}
            >
              Đổi mật khẩu
            </Button>

            <Button
              background={"transparent"}
              color={"white"}
              fontWeight={700}
              alignItems={"center"}
              _hover={{
                background: "transparent",
              }}
              onClick={handleSignOut}
            >
              Đăng xuất
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
