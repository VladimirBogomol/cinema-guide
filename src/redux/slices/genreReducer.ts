import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Movie } from "./moviesReducer";

interface IinitialState {
  loading: boolean;
  moviesLoading: boolean;
  error: string;
  genres: string[];
  moviesInGenre: Movie[];
}

const initialState: IinitialState = {
  loading: false,
  moviesLoading: false,
  error: "",
  genres: [],
  moviesInGenre: [],
};

type Filter = {
  genre: string;
  count: number,
};

const getGenres = createAsyncThunk("genre/getGenres", (data) => {
  return axiosInstance.get(`/movie/genres`).then((res) => res.data);
});

const getMoviesInGenre = createAsyncThunk(
  "genre/getMoviesInGenre",
  ({ genre, count }: Filter) => {
    const params = new URLSearchParams(); 
    params.append("genre", genre);
    params.append("count", String(count));
    return axiosInstance.get(`/movie`, { params }).then((res) => res.data);
  }
);

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.genres = action.payload;
      state.error = "";
    });
    builder.addCase(getGenres.rejected, (state) => {
      state.loading = false;
      state.error = "Произошла ошибка";
    });
    builder.addCase(getMoviesInGenre.pending, (state) => {
      state.moviesLoading = true;
    });
    builder.addCase(getMoviesInGenre.fulfilled, (state, action) => {
      state.moviesLoading = false;
      state.moviesInGenre = action.payload;
      state.error = "";
    });
    builder.addCase(getMoviesInGenre.rejected, (state) => {
      state.moviesLoading = false;
      state.error = "Произошла ошибка";
    });
  },
});

export { getMoviesInGenre, getGenres };
// export const {  } = productsSlice.actions;
export default genreSlice.reducer;
