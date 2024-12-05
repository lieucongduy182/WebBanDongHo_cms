import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

export const ButtonDelete = (props: Props) => {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      backgroundColor={"#9c6e6e"}
      color={"white"}
      _hover={{
        backgroundColor: "#9c6e6e",
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s ease-in-out"
      width={"120px"}
    >
      Delete
    </Button>
  );
};
