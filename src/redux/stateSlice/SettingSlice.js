import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    loader: "d-none",
    recoverMode: false,
  },
  reducers: {
    ShowLoader: (state) => {
      state.loader = "";
    },
    HideLoader: (state) => {
      state.loader = "d-none";
    },
    onRecoverMode: (state) => {
      state.recoverMode = true;
    },
    offRecoverMode: (state) => {
      state.recoverMode = false;
    },
  },
});

export const { ShowLoader, HideLoader, onRecoverMode, offRecoverMode } =
  settingSlice.actions;
export default settingSlice.reducer;
