import React from "react";
import st from "./FavoriteMovies.module.scss";
import { useAppSelector } from "../../../redux/store";
import FilmCard from "../../ui/filmCard/FilmCard";

type Props = {};

export default function FavoriteMovies({}: Props) {
  const { favoriteMovies, loading } = useAppSelector((state) => state.favorites);
  return (
    <div className={st.root}>
      <div className={st.body}>
        {favoriteMovies.map((movie, index) => {
          return (
            <FilmCard
              key={movie.id}
              img={movie.posterUrl}
              id={movie.id}
              isFavorite={true}
            />
          );
        })}
      </div>
    </div>
  );
}
