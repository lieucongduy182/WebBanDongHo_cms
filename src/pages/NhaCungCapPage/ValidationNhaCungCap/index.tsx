import * as yup from "yup";

export const validationNhaCungCap = yup.object().shape({
  mancc: yup.string().required("Vui lòng nhập mã nhà cung cấp"),
  tenncc: yup.string().required("Vui lòng nhập tên nhà cung cấp"),
  diachi: yup.string().required("Vui lòng nhập địa chỉ nhà cung cấp"),
  sdt: yup.string().required("Vui lòng nhập sđt nhà cung cấp"),
  email: yup.string().required("Vui lòng nhập email nhà cung cấp"),
});
