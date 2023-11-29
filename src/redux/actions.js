import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../helpers/contants";

export const getFlights = createAsyncThunk("flights/getFlight", async () => {
  // api'a istek atma
  const res = await axios.request(options);
  //   veri ile gelen dizileri objelere çevirme
  const newData = res.data.aircraft.map((flight) => ({
    id: flight[0],
    code: flight[1],
    lat: flight[2],
    lan: flight[3],
  }));

  //   veriyi slice'a aktarma
  return newData;
});
