import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState, LoginDTO, RegisterDTO } from "../../types";
import API from "../../services/api";

const normalizeAuthError = (message: string, status?: number) => {
  const lower = message.toLowerCase();

  if (
    status === 409 ||
    lower.includes("already exists") ||
    lower.includes("already taken") ||
    lower.includes("duplicate") ||
    lower.includes("קיים")
  ) {
    if (lower.includes("email") || lower.includes("אימייל") || lower.includes("מייל")) {
      return "האימייל כבר קיים במערכת. אפשר להתחבר או לבחור אימייל אחר.";
    }
    return "שם המשתמש כבר קיים במערכת. בחר שם משתמש אחר.";
  }

  return message;
};

const getErrorMessage = (err: any, fallback: string) => {
  const data = err?.response?.data;
  const status = err?.response?.status;

  if (typeof data === "string" && data.trim()) {
    return normalizeAuthError(data, status);
  }

  if (Array.isArray(data)) {
    const message = data
      .map((item) => (typeof item === "string" ? item : item?.description || item?.message || item?.error))
      .filter(Boolean)
      .join(" ");
    if (message) return normalizeAuthError(message, status);
  }

  if (data?.errors && typeof data.errors === "object") {
    const message = Object.values(data.errors)
      .flat()
      .filter(Boolean)
      .join(" ");
    if (message) return normalizeAuthError(message, status);
  }

  const message = data?.message || data?.error || data?.title || data?.detail || err?.message;
  return message ? normalizeAuthError(message, status) : fallback;
};

// התחברות
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginDTO, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", credentials);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err, "האימייל או הסיסמה אינם נכונים"));
    }
  }
);

// הרשמה
export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterDTO, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", credentials);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(getErrorMessage(err, "לא הצלחנו להשלים את ההרשמה"));
    }
  }
);

// שחזור יוזר לפי token (אחרי רענון)
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async () => {
    const response = await API.get("/auth/me");
    return response.data;
  }
);

const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: null,
  token: token,
  isLoggedIn: !!token,
  loading: false,
  error: null,
  isInitialized: !token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isInitialized = true;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "שגיאה בהתחברות";
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "שגיאה בהרשמה";
      })

      // fetchMe — שחזור יוזר אחרי רענון
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isInitialized = true;
        // השרת מחזיר camelCase, ממפים ל-PascalCase
        state.user = {
          Id: action.payload.id,
          NameUser: action.payload.nameUser,
          Email: action.payload.email,
          Password: action.payload.password,
          role: action.payload.role,
        };
        state.isLoggedIn = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.isInitialized = true;
        // token לא תקף — ניקוי מלא
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
