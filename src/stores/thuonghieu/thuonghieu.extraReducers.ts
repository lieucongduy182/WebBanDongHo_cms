import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { ThuongHieuFormType } from "../../types/thuonghieu";
import { ThuongHieuStateType } from ".";
import { getListThuongHieu } from "./thuonghieu.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<ThuongHieuStateType>>
) => {
  builder.addCase(getListThuongHieu.pending, (state: ThuongHieuStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListThuongHieu.fulfilled,
    (
      state: ThuongHieuStateType,
      // eslint-disable-next-line prettier/prettier
      action: PayloadAction<ThuongHieuFormType[]>
    ) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listThuongHieu = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListThuongHieu.rejected, (state: ThuongHieuStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
