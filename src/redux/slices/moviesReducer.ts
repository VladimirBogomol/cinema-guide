import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres: string[];
  plot: string;
  runtime: number;
  budget: any;
  revenue: any;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: any[];
  countriesOfOrigin: any[];
  languages: any[];
  cast: any[];
  director: any;
  production: any;
  awardsSummary: any;
};

interface IinitialState {
  loading: boolean;
  randomLoading: boolean,
  currentLoading: boolean,
  error: string;
  topMovies: Movie[];
  randomMovie: Movie | null;
  currentMovie: Movie | null;
}

const initialState: IinitialState = {
  loading: false,
  currentLoading: false,
  randomLoading: false,
  error: "",
  topMovies: [],
  randomMovie: null,
  currentMovie: null,
};

const getTopMovies = createAsyncThunk("movies/getTopMovies", (data) => {
  return axiosInstance.get(`/movie/top10`).then((res) => res.data);
});

const getRandomMovie = createAsyncThunk("movies/getRandomMovie", (data) => {
  return axiosInstance.get(`/movie/random`).then((res) => res.data);
});

const getCurrentMovie = createAsyncThunk("movies/getCurrentMovie", (id: any) => {
  return axiosInstance.get(`/movie/${id}`).then((res) => res.data);
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTopMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.topMovies = action.payload;
      state.error = "";
    });
    builder.addCase(getTopMovies.rejected, (state) => {
      state.loading = false;
      state.error = "Произошла ошибка";
    });
    builder.addCase(getRandomMovie.pending, (state) => {
      state.randomLoading = true;
    });
    builder.addCase(getRandomMovie.fulfilled, (state, action) => {
      state.randomLoading = false;
      state.randomMovie = action.payload;
      state.error = "";
    });
    builder.addCase(getRandomMovie.rejected, (state) => {
      state.randomLoading = false;
      state.error = "Произошла ошибка";
    });
     builder.addCase(getCurrentMovie.pending, (state) => {
      state.currentLoading = true;
    });
    builder.addCase(getCurrentMovie.fulfilled, (state, action) => {
      state.currentLoading = false;
      state.currentMovie = action.payload;
      state.error = "";
    });
    builder.addCase(getCurrentMovie.rejected, (state) => {
      state.currentLoading = false;
      state.error = "Произошла ошибка";
    });
  },
});

export { getTopMovies, getRandomMovie, getCurrentMovie };
// export const {  } = productsSlice.actions;
export default moviesSlice.reducer;
