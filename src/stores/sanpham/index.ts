import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { SanPhamType } from "../../types/sanpham";
import extraReducers from "./sanpham.extraReducers";

export interface SanPhamStateType {
  listSanPham: SanPhamType[];
  isLoading: boolean;
}

const initialState: SanPhamStateType = {
  listSanPham: [],
  isLoading: false,
};

const sanphamSlice = createSlice({
  name: "sanpham",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListSanPham = (state: ApplicationRootState) =>
  state.sanpham.listSanPham;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.sanpham.isLoading;

export default sanphamSlice.reducer;
