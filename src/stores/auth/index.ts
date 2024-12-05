import { createSlice } from "@reduxjs/toolkit";

import { ApplicationRootState } from "../../types";
import extraReducers from "./auth.extraReducers";

export interface AuthStateType {
  username: string;
  quyen: 1 | 2 | 3;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const initialState: AuthStateType = {
  username: "",
  quyen: 1,
  isLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers,
});

export const selectUsername = (state: ApplicationRootState) =>
  state.auth.username;

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
