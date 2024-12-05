import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
  titleButtonCreate: string;
}

export const ButtonCreate = (props: Props) => {
  const { onClick, titleButtonCreate } = props;
  return (
    <Button
      onClick={onClick}
      backgroundColor={"#6e9c92"}
      color={"white"}
      _hover={{
        backgroundColor: "#6e9c92",
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s ease-in-out"
      width={"200px"}
    >
      + {titleButtonCreate}
    </Button>
  );
};
