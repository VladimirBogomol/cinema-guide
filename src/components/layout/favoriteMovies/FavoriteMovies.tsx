import st from "./FavoriteMovies.module.scss";
import { useAppSelector } from "../../../redux/store";
import FilmCard from "../../ui/filmCard/FilmCard";

export default function FavoriteMovies() {
  const { favoriteMovies } = useAppSelector((state) => state.favorites);
  return (
    <div className={st.root}>
      <div className={st.body}>
        {favoriteMovies.map((movie) => {
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
