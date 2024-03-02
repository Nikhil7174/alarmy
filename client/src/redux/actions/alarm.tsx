import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../apiRequest";
import {
  alarmSuccess,
  alarmFailure,
  getAlarmsFailure,
  getAlarmsStart,
  getAlarmsSuccess,
  updateAlarmState,
} from "../reducers/alarmReducer";

export const addAlarm = createAsyncThunk(
  "alarms/addAlarm",
  async (alarm, { dispatch }) => {
    try {
      const res = await userRequest.post("/alarms/createAlarm", alarm);
      dispatch(alarmSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(alarmFailure());
      // You can throw the error to be handled by the component if needed
      throw err;
    }
  }
);

export const getAlarms = createAsyncThunk(
  "alarms/getAlarms",
  async (dispatch: any) => {
    dispatch(getAlarmsStart());
    try {
      const res = await userRequest.get("/alarms/fetchAllAlarms");
      dispatch(getAlarmsSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(getAlarmsFailure());
      throw err;
    }
  }
);

export const deleteAlarm = createAsyncThunk(
  "alarms/deleteAlarm",
  async (id, { dispatch }) => {
    try {
      const res = await userRequest.delete(`/alarms/deleteAlarm/${id}`);
      dispatch(deleteAlarm());
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const updateAlarm = createAsyncThunk(
  "alarms/updateAlarm",
  async (id, { dispatch }) => {
    try {
      const res = await userRequest.put(`/alarms/updateAlarm/${id}`);
      console.log(id);
      dispatch(updateAlarmState());
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);
