import { createAsyncThunk } from "@reduxjs/toolkit";

import { PhieuNhapService } from "../../api/phieunhap";

export const getListPhieuNhap = createAsyncThunk(
  "phieunhap/getListPhieuNhap",
  async (_, thunkApi) => {
    try {
      const response = await PhieuNhapService.getAllPhieuNhap();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
