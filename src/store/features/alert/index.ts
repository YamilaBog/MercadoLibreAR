import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


export interface IAlert {
  open: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning" | undefined;
}

const initialState: IAlert = {
  open: false,
  message: "",
  type: undefined,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    display: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hide: (state) => {
      state.open = false;
      state.message = "";
      state.type = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { hide, display } = alertSlice.actions;

export default alertSlice.reducer;

export const selectAlert = (state: RootState) => state.alertReducer;
