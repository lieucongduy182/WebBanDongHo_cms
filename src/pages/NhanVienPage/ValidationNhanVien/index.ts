import * as yup from "yup";

export const validationNhanVien = yup.object().shape({
  username: yup.string().required("Vui lòng nhập username"),
  email: yup.string().required("Vui lòng nhập email").email(),
  sdt: yup.string().required("Vui lòng nhập số điện thoại"),
  hoten: yup.string().required("Vui lòng nhập họ tên"),
  gioitinh: yup.string().required("Vui lòng chọn giới tính"),
  diachi: yup.string().required("Vui lòng nhập địa chỉ"),
  luong: yup
    .number() // Validates for numerical value
    .typeError("Chỉ được nhập số")
    .required("Lương không được để trống"),
});
