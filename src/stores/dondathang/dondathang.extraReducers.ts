import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { DonDatHangType } from "../../types/dondathang";
import { DonDatHangStateType } from ".";
import { getListDonDatHang } from "./dondathang.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<DonDatHangStateType>>
) => {
  builder.addCase(getListDonDatHang.pending, (state: DonDatHangStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListDonDatHang.fulfilled,
    (state: DonDatHangStateType, action: PayloadAction<DonDatHangType[]>) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listDonDatHang = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListDonDatHang.rejected, (state: DonDatHangStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
