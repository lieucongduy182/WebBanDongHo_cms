import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { DonDatHangType } from "../../types/dondathang";
import extraReducers from "./dondathang.extraReducers";

export interface DonDatHangStateType {
  listDonDatHang: DonDatHangType[];
  isLoading: boolean;
}

const initialState: DonDatHangStateType = {
  listDonDatHang: [],
  isLoading: false,
};

const dondathangSlice = createSlice({
  name: "dondathang",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListDonDatHang = (state: ApplicationRootState) =>
  state.dondathang.listDonDatHang;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.dondathang.isLoading;

export default dondathangSlice.reducer;
