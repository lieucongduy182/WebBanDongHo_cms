import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { PhieuNhapType } from "../../types/phieunhap";
import extraReducers from "./phieunhap.extraReducers";

export interface PhieuNhapStateType {
  listPhieuNhap: PhieuNhapType[];
  isLoading: boolean;
}

const initialState: PhieuNhapStateType = {
  listPhieuNhap: [],
  isLoading: false,
};

const phieunhapSlice = createSlice({
  name: "phieunhap",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListPhieuNhap = (state: ApplicationRootState) =>
  state.phieunhap.listPhieuNhap;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.phieunhap.isLoading;

export default phieunhapSlice.reducer;
