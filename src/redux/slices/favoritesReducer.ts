import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Movie } from "./moviesReducer";

interface IinitialState {
  loading: boolean;
  error: string;
  favoriteMovies: Movie[];
}

const initialState: IinitialState = {
  loading: false,
  error: "",
  favoriteMovies: [],
};

const getFavoriteMovies = createAsyncThunk(
  "favorites/getFavoriteMovies",
  () => {
    return axiosInstance.get(`/favorites`).then((res) => res.data);
  }
);

const handleAddToFavorite = createAsyncThunk(
  "user/handleAddToFavorite",
  async (movieId: { id: number }, { dispatch }) => {
    const res = await axiosInstance.post(`/favorites`, movieId, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (res.data) {
      dispatch(getFavoriteMovies());
    }
    return res.data;
  }
);

const handleDeleteFavorite = createAsyncThunk(
  "user/handleDeleteFavorite",
  async (movieId: number, { dispatch }) => {
    const res = await axiosInstance.delete(`/favorites/${movieId}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (res.data) {
      dispatch(getFavoriteMovies());
    }
    return res.data;
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavoriteMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.favoriteMovies = action.payload;
    });
    builder.addCase(getFavoriteMovies.rejected, (state) => {
      state.loading = false;
      state.error = "Произошла ошибка";
    });
  },
});

export { getFavoriteMovies, handleAddToFavorite, handleDeleteFavorite };
// export const { } = productsSlice.actions;
export default favoritesSlice.reducer;
