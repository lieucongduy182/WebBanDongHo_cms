import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { BinhLuanType } from "../../types/binhluan";
import extraReducers from "./binhluan.extraReducers";

export interface BinhLuanStateType {
  listBinhLuan: BinhLuanType[];
  isLoading: boolean;
}

const initialState: BinhLuanStateType = {
  listBinhLuan: [],
  isLoading: false,
};

const binhluanSlice = createSlice({
  name: "binhluan",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListBinhLuan = (state: ApplicationRootState) =>
  state.binhluan.listBinhLuan;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.binhluan.isLoading;

export default binhluanSlice.reducer;
