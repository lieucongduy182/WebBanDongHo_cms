import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { LoginResponse } from "../../types/auth";
import { AuthStateType } from ".";
import { signInWithCredentials } from "./auth.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<AuthStateType>>
) => {
  builder.addCase(signInWithCredentials.pending, (state: AuthStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    signInWithCredentials.fulfilled,
    (state: AuthStateType, action: PayloadAction<LoginResponse>) => {
      state.isLoading = false;

      if (!action.payload) return;

      if (action.payload.quyen === 2) return;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.quyen = action.payload.quyen;
      localStorage.setItem("username", action.payload.username);
      console.log(action.payload.username);
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(signInWithCredentials.rejected, (state: AuthStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
