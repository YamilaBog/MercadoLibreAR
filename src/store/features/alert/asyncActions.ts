import { createAsyncThunk } from "@reduxjs/toolkit";

import { display, hide, IAlert } from "./index";

interface IDisplayAlertArgs extends Omit<IAlert, "open"> {
  timeOut?: number;
}
export const displayAlert = createAsyncThunk<void, IDisplayAlertArgs>(
  "alert/display",
  async ({ message, type, timeOut = 4000 }, { dispatch }) => {
    dispatch(display({ message, type }));
    setTimeout(() => {
      dispatch(hide());
    }, timeOut);
  }
);
