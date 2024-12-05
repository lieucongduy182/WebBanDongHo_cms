import { Button } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

export const ButtonReturn = (props: Props) => {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      _hover={{
        transform: "scale(1.1)",
      }}
      transition="transform 0.2s ease-in-out"
      width={"120px"}
    >
      Quay lại
    </Button>
  );
};
