import { createAsyncThunk } from "@reduxjs/toolkit";

import { DanhMucService } from "../../api/danhmuc";

export const getListDanhMuc = createAsyncThunk(
  "danhmuc/getListDanhMuc",
  async (_, thunkApi) => {
    try {
      const response = await DanhMucService.getAllDanhMuc();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
