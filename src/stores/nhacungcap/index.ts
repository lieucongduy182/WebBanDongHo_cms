import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import { NhaCungCapFormType } from "../../types/nhacungcap";
import extraReducers from "./nhacungcap.extraReducers";

export interface NhaCungCapStateType {
  listNCC: NhaCungCapFormType[];
  isLoading: boolean;
}

const initialState: NhaCungCapStateType = {
  listNCC: [],
  isLoading: false,
};

const nhacungcapSlice = createSlice({
  name: "nhacungcap",
  initialState,
  reducers: {},
  extraReducers,
});

export const selectListNCC = (state: ApplicationRootState) =>
  state.nhacungcap.listNCC;

export const selectIsLoading = (state: ApplicationRootState) =>
  state.nhacungcap.isLoading;

export default nhacungcapSlice.reducer;
