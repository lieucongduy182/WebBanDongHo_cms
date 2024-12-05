import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { useParams } from "react-router-dom";

import { InputCustom } from "../../../components/form/InputCustom";
import {
  OptionSelect,
  SelectCustom,
} from "../../../components/form/SelectCustom";
import { useAppDispatch, useAppSelector } from "../../../hooks/app-hook";
import { selectListNCC } from "../../../stores/nhacungcap";
import { getListNCC } from "../../../stores/nhacungcap/nhacungcap.thunk";
import { getListSanPham } from "../../../stores/sanpham/sanpham.thunk";
import {
  DanhSachDonDatHangType,
  DonDatHangFormType,
} from "../../../types/dondathang";
import { ModalDSSanPham } from "../ModalDSSanPham";

interface Props {
  onSubmit: (data: DonDatHangFormType) => void;
  handleSubmit: UseFormHandleSubmit<DonDatHangFormType, undefined>;
  control: Control<DonDatHangFormType, any>;
  errors: FieldErrors<DonDatHangFormType>;
  titleButton: string;
  isEdit?: boolean;
  setValue: UseFormSetValue<DonDatHangFormType>;
  listDS: DanhSachDonDatHangType[];
  setListDS: Dispatch<SetStateAction<DanhSachDonDatHangType[]>>;
}

export const DonDatHangForm = (props: Props) => {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    titleButton,
    isEdit = false,
    setValue,
    listDS,
    setListDS,
  } = props;
  const dispatch = useAppDispatch();
  const listNCC = useAppSelector(selectListNCC);

  const { maddh: maddhParams } = useParams();
  const [listOptionNCC, setListOptionNCC] = useState<OptionSelect[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (maddhParams) return;
    dispatch(getListNCC());
    dispatch(getListSanPham());
  }, [maddhParams]);

  useEffect(() => {
    const listOption = listNCC.map((ncc) => {
      return {
        value: ncc.mancc,
        label: ncc.tenncc,
      };
    });

    setListOptionNCC(listOption);
    listOption.length > 0 && setValue("mancc", listOption[0].value);
  }, [listNCC]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex mt="20" w={"100%"} justifyContent={"center"}>
        <Flex w={"360px"} direction={"column"} gap={10}>
          <InputCustom
            control={control}
            name="maddh"
            label="Mã đơn đặt hàng"
            errors={errors}
            isRequired
            disabled={isEdit}
          />

          <SelectCustom
            control={control}
            errors={errors}
            name="mancc"
            isRequired
            label="Nhà cung cấp"
            listOption={listOptionNCC}
          />

          <div className="flex flex-col gap-4">
            <p>Danh sách sản phẩm đặt hàng</p>

            {listDS.length > 0 && (
              <Box
                width={"100%"}
                height={"100%"}
                border={"1px solid #e2e8f0"}
                borderRadius={"8px"}
                p="8px"
              >
                <TableContainer>
                  <Table variant="striped" colorScheme="gray">
                    <Thead>
                      <Tr>
                        <Th>Mã ĐĐH</Th>
                        <Th>Số lượng</Th>
                        <Th>Giá</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {listDS.map((ds: DanhSachDonDatHangType, index) => (
                        <Tr key={index}>
                          <Td>{ds.masp}</Td>
                          <Td>{ds.soluong}</Td>
                          <Td>{ds.gia}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </div>
          <Button
            colorScheme="blue"
            mt={"24px"}
            w={"50%"}
            h={"48px"}
            onClick={(e) => {
              // e.preventDefault();
              e.stopPropagation();
              setIsOpenModal(true);
            }}
            type="button"
          >
            + Thêm sản phẩm
          </Button>

          <Button
            colorScheme="blue"
            mt={"24px"}
            w={"100%"}
            h={"48px"}
            type="submit"
          >
            {titleButton}
          </Button>
        </Flex>
      </Flex>
      {isOpenModal && (
        <ModalDSSanPham
          handleOnCloseModal={() => {
            setIsOpenModal(false);
          }}
          handleSubmitData={(data) => {
            setListDS((prev) => [...prev, data]);
            setValue("ds", [...listDS, data]);
            setIsOpenModal(false);
          }}
          isOpenModal={isOpenModal}
        />
      )}
    </form>
  );
};
