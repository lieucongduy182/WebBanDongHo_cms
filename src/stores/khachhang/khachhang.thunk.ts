import { createAsyncThunk } from "@reduxjs/toolkit";

import { KhachHangService } from "../../api/khachhang";

export const getListKH = createAsyncThunk(
  "khachhang/getListKH",
  async (_, thunkApi) => {
    try {
      const response = await KhachHangService.getAllKhachHang();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
