import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "./actions";

const initialState = {
  flights: [],
  isLoading: true,
  isError: false,
};

const flightSlice = createSlice({
  name: "flightSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFlights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getFlights.rejected, (state) => {
        state.isLoading = false;
        state.isError = "An error occured while retrieving flight data.";
      });
  },
});

export default flightSlice.reducer;
