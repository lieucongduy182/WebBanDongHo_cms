import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { DonHangType } from "../../types/donhang";
import extraReducers from "./donhang.extraReducers";

export interface DonHangStateType {
  listDH: DonHangType[];
  isLoading: boolean;
}

const initialState: DonHangStateType = {
  listDH: [],
  isLoading: false,
};

const donhangSlice = createSlice({
  name: "donhang",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListDonHang = (state: ApplicationRootState) =>
  state.donhang.listDH;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.donhang.isLoading;

export default donhangSlice.reducer;
