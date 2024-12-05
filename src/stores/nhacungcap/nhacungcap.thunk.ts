import { createAsyncThunk } from "@reduxjs/toolkit";

import { NhaCungCapService } from "../../api/nhacungcap";

export const getListNCC = createAsyncThunk(
  "nhacungcap/getListNCC",
  async (_, thunkApi) => {
    try {
      const response = await NhaCungCapService.getAllNhaCungCap();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
