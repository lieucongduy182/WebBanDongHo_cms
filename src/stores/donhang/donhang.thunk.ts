import { createAsyncThunk } from "@reduxjs/toolkit";

import { DonHangService } from "../../api/donhang";

export const getListDonHang = createAsyncThunk(
  "donhang/getListDonHang",
  async (_, thunkApi) => {
    try {
      const response = await DonHangService.getAllDonHang();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
