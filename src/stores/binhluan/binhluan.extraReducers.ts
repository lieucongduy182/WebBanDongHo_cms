import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { BinhLuanType } from "../../types/binhluan";
import { BinhLuanStateType } from ".";
import { getListBinhLuan } from "./binhluan.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<BinhLuanStateType>>
) => {
  builder.addCase(getListBinhLuan.pending, (state: BinhLuanStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListBinhLuan.fulfilled,
    (state: BinhLuanStateType, action: PayloadAction<BinhLuanType[]>) => {
      state.isLoading = false;

      if (!action.payload) return;

      state.listBinhLuan = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListBinhLuan.rejected, (state: BinhLuanStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
