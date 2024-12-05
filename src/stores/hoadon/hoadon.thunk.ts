import { createAsyncThunk } from "@reduxjs/toolkit";

import { hoaDonService } from "../../api/hoadon";

export const getListHoaDon = createAsyncThunk(
  "hoadon/getListHoaDon",
  async (_, thunkApi) => {
    try {
      const response = await hoaDonService.getAllHoaDon();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
