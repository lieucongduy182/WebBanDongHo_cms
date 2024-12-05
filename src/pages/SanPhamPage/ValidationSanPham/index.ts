import * as yup from "yup";

export const validationSanPham = yup.object().shape({
  masp: yup.string().required("Vui lòng nhập mã sản phẩm"),
  tensp: yup.string().required("Vui lòng nhập tên sản phẩm"),
  soluong: yup
    .number() // Validates for numerical value
    .typeError("Chỉ được nhập số")
    .required("Nhập số lượng sản phẩm"),
  dongia: yup
    .number() // Validates for numerical value
    .typeError("Chỉ được nhập số")
    .required("Nhập giá sản phẩm"),
  chitietSP: yup.string().required("Vui lòng nhập chi tiết sản phẩm"),
  math: yup.string().required("Thương hiệu không được để trống"),
  madm: yup.string().required("Mã danh mục không được để trống"),
  mancc: yup.string().required("Mã nhà cung cấp không được để trống"),
});
