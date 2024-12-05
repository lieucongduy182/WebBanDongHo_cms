import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { NhanVienType } from "../../types/nhanvien";
import { NhanVienStateType } from ".";
import { getDetailNVByUsername, getListNV } from "./nhanvien.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<NhanVienStateType>>
) => {
  builder.addCase(getListNV.pending, (state: NhanVienStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListNV.fulfilled,
    (
      state: NhanVienStateType,
      // eslint-disable-next-line prettier/prettier
      action: PayloadAction<NhanVienType[]>
    ) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listNV = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListNV.rejected, (state: NhanVienStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });

  builder.addCase(getDetailNVByUsername.pending, (state: NhanVienStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getDetailNVByUsername.fulfilled,
    (
      state: NhanVienStateType,
      // eslint-disable-next-line prettier/prettier
      action: PayloadAction<NhanVienType>
    ) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.detailNhanVien = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(
    getDetailNVByUsername.rejected,
    (state: NhanVienStateType) => {
      state.isLoading = false;
      // eslint-disable-next-line prettier/prettier
    }
  );
};

export default extraReducers;
