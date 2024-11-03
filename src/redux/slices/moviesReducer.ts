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
  budget: string | null;
  revenue: string | null;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardsSummary: string;
};

interface IinitialState {
  loading: boolean;
  randomLoading: boolean,
  currentLoading: boolean,
  error: string;
  topMovies: Movie[];
  searchMovies: Movie[],
  randomMovie: Movie | null;
  currentMovie: Movie | null;
}

const initialState: IinitialState = {
  loading: false,
  currentLoading: false,
  randomLoading: false,
  error: "",
  topMovies: [],
  searchMovies: [],
  randomMovie: null,
  currentMovie: null,
};

const getTopMovies = createAsyncThunk("movies/getTopMovies", () => {
  return axiosInstance.get(`/movie/top10`).then((res) => res.data);
});

const handleSearchMovies = createAsyncThunk("movies/handleSearchMovies", (search: string) => {
  return axiosInstance.get(`/movie?title=${search}&count=5`).then((res) => res.data);
});

const getRandomMovie = createAsyncThunk("movies/getRandomMovie", () => {
  return axiosInstance.get(`/movie/random`).then((res) => res.data);
});

const getCurrentMovie = createAsyncThunk("movies/getCurrentMovie", (id: string) => {
  return axiosInstance.get(`/movie/${id}`).then((res) => res.data);
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setClearSearch: (state) => {
      state.searchMovies = [];
    }
  },
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
    builder.addCase(handleSearchMovies.fulfilled, (state, action) => {
      state.searchMovies = action.payload;
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

export { getTopMovies, handleSearchMovies, getRandomMovie, getCurrentMovie };
export const { setClearSearch } = moviesSlice.actions;
export default moviesSlice.reducer;
