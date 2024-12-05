import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { ReactComponent as EyeIcon } from "../../assets/icons/u_eye.svg";
import { ReactComponent as EyeSlashIcon } from "../../assets/icons/u_eye-slash.svg";

interface Props {
  errors: FieldErrors<{
    [type: string]: any;
  }>;
  control: Control<any, any>;
  name: string;

  label?: string;
  isRequired?: boolean;
  defaultValue?: string | number;
}

export const InputPasswordCustom = (props: Props) => {
  const { label, isRequired, errors, control, name, defaultValue } = props;

  const [isPasswordType, setPasswordType] = useState(false);
  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]}>
      {label && <FormLabel mb={"4px"}>{label}</FormLabel>}
      <Controller
        render={({ field }) => (
          <InputGroup>
            <Input {...field} type={isPasswordType ? "text" : "password"} />

            <InputRightElement
              children={
                <Box
                  as={isPasswordType ? EyeIcon : EyeSlashIcon}
                  cursor={"pointer"}
                  fill={"#3F4647"}
                  onClick={() => setPasswordType(!isPasswordType)}
                />
              }
            />
          </InputGroup>
        )}
        control={control}
        name={name}
        defaultValue={defaultValue}
      />
      <FormErrorMessage mt={"4px"}>
        {!!errors[name] && <Text>{errors[name]?.message as string}</Text>}
      </FormErrorMessage>
    </FormControl>
  );
};
