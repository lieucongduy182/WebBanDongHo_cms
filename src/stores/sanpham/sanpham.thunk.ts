import { createAsyncThunk } from "@reduxjs/toolkit";

import { SanPhamService } from "../../api/sanpham";

export const getListSanPham = createAsyncThunk(
  "sanpham/getListSanPham",
  async (_, thunkApi) => {
    try {
      const response = await SanPhamService.getAllSanPham();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
