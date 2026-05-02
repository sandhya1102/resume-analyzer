import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/authSlice.js";
import resumeReducer from "../redux/resumeSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    resume:resumeReducer
  },
});

export default store;
