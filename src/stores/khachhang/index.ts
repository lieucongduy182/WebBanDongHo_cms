import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { KhachHangType } from "../../types/khachhang";
import extraReducers from "./khachhang.extraReducers";

export interface KhachHangStateType {
  listKH: KhachHangType[];
  isLoading: boolean;
}

const initialState: KhachHangStateType = {
  listKH: [],
  isLoading: false,
};

const khachhangSlice = createSlice({
  name: "khachhang",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListKH = (state: ApplicationRootState) =>
  state.khachhang.listKH;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.khachhang.isLoading;

export default khachhangSlice.reducer;
