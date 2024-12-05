import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { NoInfer } from "react-redux";

import { NhaCungCapFormType } from "../../types/nhacungcap";
import { NhaCungCapStateType } from ".";
import { getListNCC } from "./nhacungcap.thunk";

const extraReducers = (
  // eslint-disable-next-line prettier/prettier
  builder: ActionReducerMapBuilder<NoInfer<NhaCungCapStateType>>
) => {
  builder.addCase(getListNCC.pending, (state: NhaCungCapStateType) => {
    state.isLoading = true;
  });
  builder.addCase(
    getListNCC.fulfilled,
    (
      state: NhaCungCapStateType,
      // eslint-disable-next-line prettier/prettier
      action: PayloadAction<NhaCungCapFormType[]>
    ) => {
      state.isLoading = false;
      if (!action.payload) return;

      state.listNCC = action.payload;
      // eslint-disable-next-line prettier/prettier
    }
  );
  builder.addCase(getListNCC.rejected, (state: NhaCungCapStateType) => {
    state.isLoading = false;
    // eslint-disable-next-line prettier/prettier
  });
};

export default extraReducers;
