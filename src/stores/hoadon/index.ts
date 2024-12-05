import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { HoaDonType } from "../../types/hoadon";
import extraReducers from "./hoadon.extraReducers";

export interface HoaDonStateType {
  listHoaDon: HoaDonType[];
  isLoading: boolean;
}

const initialState: HoaDonStateType = {
  listHoaDon: [],
  isLoading: false,
};

const hoadonSlice = createSlice({
  name: "hoadon",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListHoaDon = (state: ApplicationRootState) =>
  state.hoadon.listHoaDon;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.hoadon.isLoading;

export default hoadonSlice.reducer;
