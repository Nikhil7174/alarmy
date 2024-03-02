// import { createSlice } from "@reduxjs/toolkit";
// import {
//   ALARMS_UPDATE_REQUEST,
//   ALARMS_UPDATE_SUCCESS,
//   ALARMS_UPDATE_FAIL,
//   ALARMS_CREATE_FAIL,
//   ALARMS_CREATE_REQUEST,
//   ALARMS_CREATE_SUCCESS,
//   ALARMS_DELETE_FAIL,
//   ALARMS_DELETE_REQUEST,
//   ALARMS_DELETE_SUCCESS,
//   ALARMS_LIST_FAIL,
//   ALARMS_LIST_REQUEST,
//   ALARMS_LIST_SUCCESS,
// } from "../constants/alarmsConstants";

// const initialState = {
//   alarmsList: { loading: false, alarms: [], error: null },
//   alarmCreate: { loading: false, success: false, error: null },
//   alarmDelete: { loading: false, success: false, error: null },
//   alarmUpdate: { loading: false, success: false, error: null },
// };

// const alarmsSlice = createSlice({
//   name: "alarms",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(ALARMS_LIST_REQUEST, (state) => {
//         state.alarmsList.loading = true;
//       })
//       .addCase(ALARMS_LIST_SUCCESS, (state, action) => {
//         state.alarmsList.loading = false;
//         state.alarmsList.alarms = action.payload;
//       })
//       .addCase(ALARMS_LIST_FAIL, (state, action) => {
//         state.alarmsList.loading = false;
//         state.alarmsList.error = action.payload;
//       })
//       .addCase(ALARMS_CREATE_REQUEST, (state) => {
//         state.alarmCreate.loading = true;
//       })
//       .addCase(ALARMS_CREATE_SUCCESS, (state) => {
//         state.alarmCreate.loading = false;
//         state.alarmCreate.success = true;
//       })
//       .addCase(ALARMS_CREATE_FAIL, (state, action) => {
//         state.alarmCreate.loading = false;
//         state.alarmCreate.error = action.payload;
//       })
//       .addCase(ALARMS_DELETE_REQUEST, (state) => {
//         state.alarmDelete.loading = true;
//       })
//       .addCase(ALARMS_DELETE_SUCCESS, (state) => {
//         state.alarmDelete.loading = false;
//         state.alarmDelete.success = true;
//       })
//       .addCase(ALARMS_DELETE_FAIL, (state, action) => {
//         state.alarmDelete.loading = false;
//         state.alarmDelete.error = action.payload;
//         state.alarmDelete.success = false;
//       })
//       .addCase(ALARMS_UPDATE_REQUEST, (state) => {
//         state.alarmUpdate.loading = true;
//       })
//       .addCase(ALARMS_UPDATE_SUCCESS, (state) => {
//         state.alarmUpdate.loading = false;
//         state.alarmUpdate.success = true;
//       })
//       .addCase(ALARMS_UPDATE_FAIL, (state, action) => {
//         state.alarmUpdate.loading = false;
//         state.alarmUpdate.error = action.payload;
//         state.alarmUpdate.success = false;
//       });
//   },
// });

// export default alarmsSlice.reducer;

//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const alarmSlice: any = createSlice({
  name: "alarm",
  initialState: {
    userAlarms: [],
    error: false,
    isFetching: false,
  },
  reducers: {
    // loginStart: (state) => {
    //   state.isFetching = true;
    // },
    alarmSuccess: (state, action) => {
      console.log(state);
      state.userAlarms.push(action.payload);
      state.isFetching = false;
      state.error = false;
    },
    alarmFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    getAlarmsStart: (state) => {
      state.isFetching = true;
    },
    getAlarmsSuccess: (state, action) => {
      state.isFetching = false;
      state.userAlarms = action.payload;
      state.error = false;
    },
    getAlarmsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    cleanAlarms: (state) => {
      state.userAlarms = [];
    },

    updateAlarmState: (state) => {
      state.userAlarms[
        state.userAlarms.findIndex(
          (item: any) => item._id === action.payload.id
        )
      ] = action.payload.alarm;
    },

    emptyAlarms: (state) => {
      state.alarms = [];
    },

    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetState: (state) => {
      state.userAlarms = [];
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;

      state.error = false;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  alarmSuccess,
  alarmFailure,
  getAlarmsFailure,
  getAlarmsStart,
  getAlarmsSuccess,
  updateAlarmState,
  cleanAlarms,
  resetState,
} = alarmSlice.actions;
export default alarmSlice.reducer;
