import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ANALYSE_API } from "../utils/api.js";

// ✅ SINGLE THUNK (fixed name)
export const analyzeResume = createAsyncThunk(
  "resume/analyze",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await axios.post(
        `${ANALYSE_API}/analyze`,
        formData,
        { withCredentials: true }
      );

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Analyze failed");
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",

  initialState: {
    loading: false,
    result: null,
    error: null,
  },

  reducers: {
    clearResult: (state) => {
      state.result = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔄 START
      .addCase(analyzeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ SUCCESS
      .addCase(analyzeResume.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })

      // ❌ ERROR
      .addCase(analyzeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResult, clearError } = resumeSlice.actions;

export default resumeSlice.reducer;