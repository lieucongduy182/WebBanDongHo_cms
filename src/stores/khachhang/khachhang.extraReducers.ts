import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { KhachHangType } from "../../types/khachhang";
import { KhachHangStateType } from ".";
import { getListKH } from "./khachhang.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<KhachHangStateType>>
) => {
  builder.addCase(getListKH.pending, (state: KhachHangStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListKH.fulfilled,
    (
      state: KhachHangStateType,
      // eslint-disable-next-line prettier/prettier
      action: PayloadAction<KhachHangType[]>
    ) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listKH = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListKH.rejected, (state: KhachHangStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
