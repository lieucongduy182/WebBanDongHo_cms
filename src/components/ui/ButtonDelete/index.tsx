import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

export const ButtonDelete = (props: Props) => {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      backgroundColor={"#e55353"}
      color={"white"}
      _hover={{
        backgroundColor: "#e55353",
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s ease-in-out"
      width={"120px"}
    >
      Xoá
    </Button>
  );
};
