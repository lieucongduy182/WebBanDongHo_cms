import { createAsyncThunk } from "@reduxjs/toolkit";

import { binhLuanService } from "../../api/binhluan";

export const getListBinhLuan = createAsyncThunk(
  "binhluan/getListBinhLuan",
  async (_, thunkApi) => {
    try {
      const response = await binhLuanService.getListBinhLuan();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
