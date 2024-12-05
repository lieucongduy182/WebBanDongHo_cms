import { useToast } from "@chakra-ui/react";

interface ToastType {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}

export const useToastCustom = () => {
  const toast = useToast();

  return ({ title, description, status }: ToastType) =>
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
      position: "bottom-right",
    });
};
