import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API } from "../utils/api";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${USER_API}/register`, userData, {
        withCredentials: true,
      });

      toast.success("Registration Successful");

      return data.user;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${USER_API}/login`, userData, {
        withCredentials: true,
      });

      toast.success("Login Successful");
      return data.user;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= LOAD USER =================
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${USER_API}/me`, {
        withCredentials: true,
      });

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

// ================= LOGOUT =================
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.get(`${USER_API}/logout`, {
        withCredentials: true,
      });

      toast.success("Logout Successfully.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    success: false,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== Register =====
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== Login =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== Load User =====
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // ===== Logout =====
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;
