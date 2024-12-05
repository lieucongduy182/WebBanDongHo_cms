import * as yup from "yup";

export const validationThuongHieu = yup.object().shape({
  math: yup.string().required("Vui lòng nhập mã thương hiệu"),
  tenth: yup.string().required("Vui lòng nhập tên thương hiệu"),
});
