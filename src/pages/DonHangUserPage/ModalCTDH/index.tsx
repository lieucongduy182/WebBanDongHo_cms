import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";

import { DonHangService } from "../../../api/donhang";
import { Loading } from "../../../components/ui/Loading";
import { ModalWrapper } from "../../../components/ui/ModalWrapper";
import { ConvertPrice } from "../../../helpers";
import { DonHangType } from "../../../types/donhang";
import { SanPhamType } from "../../../types/sanpham";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDH: DonHangType;
}

interface CTDHType {
  id: {
    madh: string;
    masp: string;
  };
  soluong: number;
  gia: number;
  sanpham: SanPhamType;
}

interface CTDonHangFilterType {
  masp: string;
  soluong: number;
  gia: number;
  tensp: string;
}

export const ModalCTGH = (props: Props) => {
  const { isOpen, onClose, selectedDH } = props;

  const [listSP, setListSP] = useState<CTDonHangFilterType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DonHangService.getCTDH(selectedDH.madh);

      const listdata: CTDHType[] = response.data;

      const returnData = listdata.map((item) => {
        return {
          masp: item.sanpham.masp,
          soluong: item.soluong,
          gia: item.gia,
          tensp: item.sanpham.tensp,
        };
      });
      setListSP(returnData);
    };

    fetchData();
  }, []);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      body={
        <Flex direction={"column"} gap={10}>
          {listSP.length <= 0 ? (
            <Loading />
          ) : (
            <>
              {" "}
              <Flex
                justifyContent={"space-between"}
                gap={4}
                direction={"column"}
              >
                {listSP.map((item) => (
                  <Fragment key={item.masp}>
                    <Flex justifyContent={"space-between"}>
                      <Text>
                        {item.masp} - {item.tensp} - x{item.soluong}
                      </Text>
                      <Text>{ConvertPrice(item.gia)}</Text>
                    </Flex>

                    <Box w={"100%"} borderBottom={"1px solid #b3c3d7"} />
                  </Fragment>
                ))}
              </Flex>
              <Flex justifyContent={"flex-end"}>
                <Text>
                  Tổng tiền:{" "}
                  {ConvertPrice(
                    listSP
                      .map((item) => item.gia)
                      .reduce((acc, el) => acc + el),
                  )}{" "}
                  đ
                </Text>
              </Flex>
            </>
          )}

          <Flex justifyContent={"flex-end"} direction={"row"} gap={10}>
            <Button
              background={"#862642"}
              color={"white"}
              _hover={{
                backgroundColor: "#862642",
                transform: "scale(1.1)",
              }}
              transition="transform 0.2s ease-in-out"
              onClick={onClose}
            >
              Huỷ
            </Button>
          </Flex>
        </Flex>
      }
      header={
        <Text textAlign={"center"} fontWeight={700} fontSize={24}>
          Chi tiết đơn hàng
        </Text>
      }
    />
  );
};
