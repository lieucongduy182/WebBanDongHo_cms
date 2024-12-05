import { createAsyncThunk } from "@reduxjs/toolkit";

import { DonDatHangService } from "../../api/dondathang";

export const getListDonDatHang = createAsyncThunk(
  "dondathang/getListDonDatHang",
  async (_, thunkApi) => {
    try {
      const response = await DonDatHangService.getAllDonDatHang();

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
