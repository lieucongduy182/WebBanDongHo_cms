import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { DonHangType } from "../../types/donhang";
import { DonHangStateType } from ".";
import { getListDonHang } from "./donhang.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<DonHangStateType>>
) => {
  builder.addCase(getListDonHang.pending, (state: DonHangStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListDonHang.fulfilled,
    (
      state: DonHangStateType,
      // eslint-disable-next-line prettier/prettier
      action: PayloadAction<DonHangType[]>
    ) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listDH = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListDonHang.rejected, (state: DonHangStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
