import Roboto300Font from "@fontsource/roboto/files/roboto-vietnamese-300-normal.woff";
import Roboto400Font from "@fontsource/roboto/files/roboto-vietnamese-400-normal.woff";
import Roboto700Font from "@fontsource/roboto/files/roboto-vietnamese-700-normal.woff";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Font, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
import { useEffect, useState } from "react";

import { DonHangService } from "../../../api/donhang";
import { ConvertPrice } from "../../../helpers";
import { HoaDonType } from "../../../types/hoadon";
import { PhieuNhapDetailType } from "../../../types/phieunhap";
import { textHinhThucThanhThoan } from "../../DonHangUserPage";

Font.register({
  family: "Roboto",
  fonts: [
    {
      fontWeight: 400,
      src: Roboto400Font,
    },
    {
      fontWeight: 300,
      src: Roboto300Font,
    },
    {
      fontWeight: 700,
      src: Roboto700Font,
    },
  ],
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Roboto", fontSize: 12 },
  section: {
    display: "flex",
    margin: 10,
    padding: 10,
    flexDirection: "column",
    gap: "20px",
  },

  textHeader: {
    textAlign: "center",
    fontSize: "28px",
  },

  sectionInformation: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  textStyle: {
    fontWeight: 500,
    fontSize: "14px",
  },
});

export const HoaDonDocument = ({ hoadon }: { hoadon: HoaDonType }) => {
  const [ctdh, setCTDH] = useState<PhieuNhapDetailType[]>([]);

  useEffect(() => {
    const fetchCTPN = async () => {
      const response = await DonHangService.getCTDH(hoadon.donhang.madh);

      const data = response.data;

      setCTDH(data);
    };

    fetchCTPN();
  }, [hoadon.mahd]);

  console.log(ctdh);

  return (
    <Document>
      <Page style={styles.page}>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: "14px",
              maxWidth: "50%",
            }}
          >
            HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG CƠ SỞ TẠI TP HCM
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontSize: "12px",
            }}
          >
            Số 97 Man Thiện, Phường Hiệp Phú, Quận 9, Thành phố Hồ Chí Minh
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeader}>Hoá đơn bán hàng</Text>

          <View style={styles.sectionInformation}>
            <Text style={styles.textStyle}>
              Ngày lập phiếu: {moment(hoadon.ngaylap).format("DD-MM-YYYY")}
            </Text>

            <Text style={styles.textStyle}>Mã hoá đơn: {hoadon.mahd}</Text>

            <Text style={styles.textStyle}>
              Mã đơn đặt hàng: {hoadon.donhang.madh}
            </Text>

            <Text style={styles.textStyle}>
              Hình thức thanh toán:{" "}
              {textHinhThucThanhThoan(hoadon.donhang.hinhThucThanhToan)}
            </Text>

            <Text style={styles.textStyle}>
              Mã khách hàng: {hoadon.donhang.khachhang.makh}
            </Text>

            <Text style={styles.textStyle}>
              tên khách hàng: {hoadon.donhang.khachhang.hoTen}
            </Text>

            <View
              style={{
                marginTop: "10px",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Thông tin giao hàng:
              </Text>

              <Text>Họ tên: {hoadon.donhang.hoTen} </Text>
              <Text>Email: {hoadon.donhang.email}</Text>
              <Text>Số điện thoại: {hoadon.donhang.sdt}</Text>
              <Text>Địa chỉ: {hoadon.donhang.diaChi}</Text>
              <Text>Ghi chú: {hoadon.donhang.ghichu}</Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              gap: "8px",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              Thông tin chi tiết sản phẩm:
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {ctdh.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    <Text
                      style={{
                        width: "100%",
                      }}
                    >
                      {item.sanpham.tensp} - x{item.soluong}
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        width: "100%",
                      }}
                    >
                      {ConvertPrice(item.gia)}
                    </Text>
                  </View>
                ))}
              </View>

              <Text
                style={{
                  textAlign: "right",
                  fontSize: "16px",
                }}
              >
                Tổng tiền:{" "}
                {ConvertPrice(
                  ctdh.reduce((acc, el) => acc + el.soluong * el.gia, 0),
                )}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
