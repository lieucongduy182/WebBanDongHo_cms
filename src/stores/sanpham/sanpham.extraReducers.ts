import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { SanPhamType } from "../../types/sanpham";
import { SanPhamStateType } from ".";
import { getListSanPham } from "./sanpham.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<SanPhamStateType>>
) => {
  builder.addCase(getListSanPham.pending, (state: SanPhamStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListSanPham.fulfilled,
    (state: SanPhamStateType, action: PayloadAction<SanPhamType[]>) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listSanPham = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListSanPham.rejected, (state: SanPhamStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
