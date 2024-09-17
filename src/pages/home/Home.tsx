import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/Header/Header";
import Poster from "../../components/layout/Poster/Poster";
import TopMovies from "../../components/layout/topMovies/TopMovies";
import st from "./Home.module.scss";
import {
  getRandomMovie,
  getTopMovies,
} from "../../redux/slices/moviesReducer";

export default function Home() {
  const dispatch = useAppDispatch();
   const { randomMovie, randomLoading } = useAppSelector(
     (state) => state.movies
   );
  useEffect(() => {
    dispatch(getRandomMovie());
    dispatch(getTopMovies());
  }, []);
  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        <Poster onRefresh={() => dispatch(getRandomMovie())} movie={randomMovie} loading={randomLoading} />
        <TopMovies />
        <Footer />
      </div>
    </div>
  );
}