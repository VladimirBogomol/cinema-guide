import React from "react";
import st from "./TopMovie.module.scss";
import FilmCard from "../../ui/filmCard/FilmCard";
import { useAppSelector } from "../../../redux/store";

type Props = {};

export default function TopMovies({}: Props) {
  const { topMovies, loading } = useAppSelector((state) => state.movies);
  return (
    <div className={st.root}>
      <h2>Топ 10 фильмов</h2>
      <div className={st.body}>
        {topMovies.map((movie, index) => {
          return (
            <FilmCard key={movie.id} img={movie.posterUrl} number={index + 1} id={movie.id} />
          );
        })}
      </div>
    </div>
  );
}
