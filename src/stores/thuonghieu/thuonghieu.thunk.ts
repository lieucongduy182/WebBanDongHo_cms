import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThuongHieuService } from "../../api/thuonghieu";

export const getListThuongHieu = createAsyncThunk(
  "thuonghieu/getListThuongHieu",
  async (_, thunkApi) => {
    try {
      const response = await ThuongHieuService.getAllThuongHieu();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
