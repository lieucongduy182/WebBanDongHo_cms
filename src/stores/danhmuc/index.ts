import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { DanhMucFormType } from "../../types/danhmuc";
import extraReducers from "./danhmuc.extraReducers";

export interface DanhMucStateType {
  listDanhMuc: DanhMucFormType[];
  isLoading: boolean;
}

const initialState: DanhMucStateType = {
  listDanhMuc: [],
  isLoading: false,
};

const danhmucSlice = createSlice({
  name: "danhmuc",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListDanhMuc = (state: ApplicationRootState) =>
  state.danhmuc.listDanhMuc;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.danhmuc.isLoading;

export default danhmucSlice.reducer;
