import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserState, User } from "../../types";
import API from "../../services/api";

const getErrorMessage = (err: any, fallback: string) => {
  const message = err?.response?.data?.message || err?.response?.data?.error || err?.message;
  return message || fallback;
};

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/User");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err, "שגיאה בטעינת משתמשים"));
    }
  }
);

export const deactivateUser = createAsyncThunk(
  "users/deactivate",
  async (user: User, { rejectWithValue }) => {
    const userId = (user as any).id ?? user.Id;
    if (!userId) {
      return rejectWithValue("לא נמצא מזהה עובד למחיקה");
    }

    try {
      await API.delete(`/User/${userId}`);
      return { id: userId, deleted: true };
    } catch (err: any) {
      const status = err?.response?.status;
      if (status !== 404 && status !== 405) {
        return rejectWithValue(getErrorMessage(err, "שגיאה במחיקת עובד"));
      }
    }

    try {
      const updatedUser = {
        ...user,
        id: userId,
        Id: userId,
        isActive: false,
        IsActive: false,
      };
      const response = await API.put(`/User/${userId}`, updatedUser);
      return { ...response.data, id: userId, Id: userId, deleted: false };
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err, "שגיאה במחיקת עובד"));
    }
  }
);

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "שגיאה בטעינת משתמשים";
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const payload = action.payload as any;
        const payloadId = payload.id ?? payload.Id;
        const index = state.users.findIndex((u: any) => (u.id ?? u.Id) === payloadId);

        if (index !== -1 && payload.deleted) {
          state.users.splice(index, 1);
        } else if (index !== -1) {
          state.users[index] = payload;
        }
      });
  },
});

export default usersSlice.reducer;
