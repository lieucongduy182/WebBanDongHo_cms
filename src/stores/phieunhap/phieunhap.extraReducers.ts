import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { PhieuNhapType } from "../../types/phieunhap";
import { PhieuNhapStateType } from ".";
import { getListPhieuNhap } from "./phienhap.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<PhieuNhapStateType>>
) => {
  builder.addCase(getListPhieuNhap.pending, (state: PhieuNhapStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListPhieuNhap.fulfilled,
    (state: PhieuNhapStateType, action: PayloadAction<PhieuNhapType[]>) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listPhieuNhap = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListPhieuNhap.rejected, (state: PhieuNhapStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
