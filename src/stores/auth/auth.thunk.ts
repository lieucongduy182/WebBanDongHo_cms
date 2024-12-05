import { createAsyncThunk } from "@reduxjs/toolkit";

import { AuthService } from "../../api/auth";
import { LoginFormType } from "../../pages/LoginPage";

export const signInWithCredentials = createAsyncThunk(
  "auth/signInWithCredentials",
  async (formData: LoginFormType, thunkApi) => {
    try {
      const response = await AuthService.signInWithCredentials(formData);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
    // eslint-disable-next-line prettier/prettier
  }
);
