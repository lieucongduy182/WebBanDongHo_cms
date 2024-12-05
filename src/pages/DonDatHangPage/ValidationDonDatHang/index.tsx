import * as yup from "yup";

export const validationDDH = yup.object().shape({
  maddh: yup.string().required("Vui lòng nhập mã danh mục"),
  //   manv: yup.string().required("Vui lòng nhập tên danh mục"),
  mancc: yup.string().required("Vui lòng nhập tên danh mục"),
  //   ds: yup.array().required("Vui lòng nhập danh sách sản phẩm"),
});

export const validationDSSPDDH = yup.object().shape({
  masp: yup.string().required("Vui lòng nhập mã sp"),
  soluong: yup
    .number() // Validates for numerical value
    .typeError("Chỉ được nhập số")
    .required("Nhập số lượng sản phẩm")
    .positive("Amount must be greater than 0"),
  gia: yup
    .number() // Validates for numerical value
    .typeError("Chỉ được nhập số")
    .required("Nhập giá sản phẩm")
    .positive("Amount must be greater than 0"),
});
