import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { DanhMucFormType } from "../../types/danhmuc";
import { DanhMucStateType } from ".";
import { getListDanhMuc } from "./danhmuc.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<DanhMucStateType>>
) => {
  builder.addCase(getListDanhMuc.pending, (state: DanhMucStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListDanhMuc.fulfilled,
    (state: DanhMucStateType, action: PayloadAction<DanhMucFormType[]>) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listDanhMuc = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListDanhMuc.rejected, (state: DanhMucStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
