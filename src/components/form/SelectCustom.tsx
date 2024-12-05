import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";

export interface OptionSelect {
  value: string | number;
  label: string;
  price?: number;
}

interface Props {
  errors: FieldErrors<{
    [type: string]: any;
  }>;
  control: Control<any, any>;
  name: string;

  label?: string;
  isRequired?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  listOption: OptionSelect[];
}

export const SelectCustom = (props: Props) => {
  const {
    label,
    isRequired,
    errors,
    control,
    name,
    defaultValue,
    disabled = false,
    listOption = [],
  } = props;
  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]}>
      {label && <FormLabel mb={"4px"}>{label}</FormLabel>}
      <Controller
        render={({ field }) => (
          <Select disabled={disabled} {...field}>
            {listOption.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
