import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { ThuongHieuFormType } from "../../types/thuonghieu";
import extraReducers from "./thuonghieu.extraReducers";

export interface ThuongHieuStateType {
  listThuongHieu: ThuongHieuFormType[];
  isLoading: boolean;
}

const initialState: ThuongHieuStateType = {
  listThuongHieu: [],
  isLoading: false,
};

const thuongHieuSlice = createSlice({
  name: "thuonghieu",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListThuongHieu = (state: ApplicationRootState) =>
  state.thuonghieu.listThuongHieu;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.thuonghieu.isLoading;

export default thuongHieuSlice.reducer;
