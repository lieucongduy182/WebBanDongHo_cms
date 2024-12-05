import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { HoaDonType } from "../../types/hoadon";
import { HoaDonStateType } from ".";
import { getListHoaDon } from "./hoadon.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<HoaDonStateType>>
) => {
  builder.addCase(getListHoaDon.pending, (state: HoaDonStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListHoaDon.fulfilled,
    (state: HoaDonStateType, action: PayloadAction<HoaDonType[]>) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listHoaDon = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListHoaDon.rejected, (state: HoaDonStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
