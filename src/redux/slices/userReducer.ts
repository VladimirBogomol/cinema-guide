import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Movie } from "./moviesReducer";

type UserCredentialsT = {
  name: string,
  surname: string,
  email: string,
  favorites: Movie[],
} 

interface IinitialState {
  authorized: boolean;
  loading: boolean;
  completeRegister: boolean;
  error: string;
  userCredentials: UserCredentialsT | null,
}

const initialState: IinitialState = {
  authorized: false,
  loading: false,
  completeRegister: false,
  error: "",
  userCredentials: null,
};

type LoginCreadentials = {
  email: string;
  password: string;
};

type RegisterCreadentials = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

const handleLogin = createAsyncThunk(
  "user/handleLogin",
  (credentials: LoginCreadentials) => {
    return axiosInstance
      .post(`/auth/login/`, credentials)
      .then((res) => res.data);
  }
);

const handleRegister = createAsyncThunk(
  "user/handleRegister",
  (credentials: RegisterCreadentials) => {
    return axiosInstance.post(`/user`, credentials).then((res) => res.data);
  }
);

const getProfile = createAsyncThunk(
  "user/getProfile",
  () => {
    return axiosInstance.get(`/profile`).then((res) => res.data);
  }
);

const handleLogout = createAsyncThunk("user/handleLogout", () => {
  return axiosInstance.get(`/auth/logout`).then((res) => res.data);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.authorized = true;
    });
    builder.addCase(handleLogin.rejected, (state) => {
      state.loading = false;
      state.error = "Произошла ошибка";
      state.authorized = false;
    });
    builder.addCase(handleRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.completeRegister = true;
    });
    builder.addCase(handleRegister.rejected, (state) => {
      state.loading = false;
      state.error = "Произошла ошибка";
      state.completeRegister = false;
    });
      builder.addCase(getProfile.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authorized = true;
        state.userCredentials = action.payload;
      });
      builder.addCase(getProfile.rejected, (state) => {
        state.loading = false;
        state.error = "Произошла ошибка";
        state.authorized = false;
      });
     builder.addCase(handleLogout.fulfilled, (state, action) => {
       state.authorized = false;
       state.userCredentials = null;
     });
  },
});

export { handleLogin, handleLogout, handleRegister, getProfile };
// export const {  } = productsSlice.actions;
export default userSlice.reducer;
