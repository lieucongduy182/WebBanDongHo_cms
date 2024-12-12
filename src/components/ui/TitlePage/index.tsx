import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ButtonCreate } from "../ButtonCreate";
import { ButtonReturn } from "../ButtonReturn";

interface Props {
  title: string;
  onClickCreate?: () => void;
  linkReturn?: string;
  isShowButtonCreate?: boolean;
  titleButtonCreate?: string;
  isHideButtonReturn?: boolean;
}

export const TitlePage = (props: Props) => {
  const {
    title,
    onClickCreate = () => console.log,
    isShowButtonCreate = true,
    linkReturn = "",
    titleButtonCreate = "",
    isHideButtonReturn = false,
  } = props;

  const navigate = useNavigate();
  return (
    <Flex direction={"column"} gap={10}>
      <Text fontWeight={700} fontSize={24}>
        {title}
      </Text>
      {isShowButtonCreate ? (
        <ButtonCreate
          titleButtonCreate={titleButtonCreate}
          onClick={onClickCreate}
        />
      ) : isHideButtonReturn ? (
        <></>
      ) : (
        <ButtonReturn onClick={() => navigate(linkReturn)} />
      )}
    </Flex>
  );
};
