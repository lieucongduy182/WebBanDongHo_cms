import * as yup from "yup";

export const validationDanhMuc = yup.object().shape({
  madm: yup.string().required("Vui lòng nhập mã danh mục"),
  tendm: yup.string().required("Vui lòng nhập tên danh mục"),
});
