import React from "react";
import st from "./Poster.module.scss";
import svg from "../../../assets/image.png";
import Raiting from "../../ui/raiting/Raiting";
import Button from "../../ui/button/Button";
import LikeIcon from "../../../assets/icons/LikeIcon";
import RefreshIcon from "../../../assets/icons/RefreshIcon";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Movie } from "../../../redux/slices/moviesReducer";
import { handleAddToFavorite, handleDeleteFavorite } from "../../../redux/slices/favoritesReducer";
import ActiveLikeIcon from "../../../assets/icons/ActiveLikeIcon";

type Props = {
  onRefresh?: () => void;
  movie: Movie | null;
  loading: boolean;
};

export function convertMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ч ${remainingMinutes} мин`;
}

export default function Poster({ onRefresh, movie, loading }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authorized } = useAppSelector((state) => state.user);
  const { favoriteMovies } = useAppSelector((state) => state.favorites);
  const isFav = favoriteMovies.find((item) => item.id === movie?.id);
  const location = useLocation();

  if (loading) {
    return <div className={st.root}>Loading...</div>;
  }

  if (movie) {
    return (
      <div className={st.root}>
        <img src={movie.backdropUrl} alt="Logo" />
        <div className={st.content}>
          <div className={st.top}>
            <Raiting rate={movie.tmdbRating.toFixed(1)} />
            <span>{movie.releaseYear}</span>
            <span>{movie.genres.join(", ")}</span>
            <span>{convertMinutesToHours(movie.runtime)}</span>
          </div>
          <div className={st.body}>
            <h1>{movie.title}</h1>
            <h3>{movie.plot}</h3>
          </div>
          <div className={st.btns}>
            <Button
              sx={{ width: "171px" }}
              variant="primary"
              onClick={() => {}}
            >
              Трейлер
            </Button>
            {onRefresh && (
              <Button
                sx={{ width: "171px" }}
                variant="secondary"
                onClick={() => {
                  navigate(`/movies/${movie.id}`);
                }}
              >
                О фильме
              </Button>
            )}
            {!authorized ? (
              <Link state={{ background: location }} to={"/login"}>
                <Button
                  sx={{ width: "68px" }}
                  variant="secondary"
                  onClick={() => {
                    dispatch(handleAddToFavorite({ id: movie.id }));
                  }}
                >
                  <LikeIcon />
                </Button>
              </Link>
            ) : isFav ? (
              <Button
                sx={{ width: "68px" }}
                variant="secondary"
                onClick={() => {
                  dispatch(handleDeleteFavorite(movie.id));
                }}
              >
                <ActiveLikeIcon />
              </Button>
            ) : (
              <Button
                sx={{ width: "68px" }}
                variant="secondary"
                onClick={() => {
                  dispatch(handleAddToFavorite({ id: movie.id }));
                }}
              >
                <LikeIcon />
              </Button>
            )}
            {onRefresh && (
              <Button
                sx={{ width: "68px" }}
                variant="secondary"
                onClick={() => {
                  onRefresh();
                }}
              >
                <RefreshIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
