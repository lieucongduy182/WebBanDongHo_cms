import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

export const ButtonEdit = (props: Props) => {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      backgroundColor={"#3399ff"}
      color={"white"}
      _hover={{
        backgroundColor: "#3399ff",
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s ease-in-out"
      width={"120px"}
    >
      Chỉnh sửa
    </Button>
  );
};
