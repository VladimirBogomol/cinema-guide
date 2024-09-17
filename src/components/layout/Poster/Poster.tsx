import React from 'react'
import st from "./Poster.module.scss"
import svg from "../../../assets/image.png"
import Raiting from '../../ui/raiting/Raiting'
import Button from '../../ui/button/Button'
import LikeIcon from '../../../assets/icons/LikeIcon'
import RefreshIcon from '../../../assets/icons/RefreshIcon'
import { useAppSelector } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { Movie } from '../../../redux/slices/moviesReducer'

type Props = {
  onRefresh?: () => void,
  movie: Movie | null,
  loading: boolean,
}

function convertMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} ч ${remainingMinutes} мин`
}

export default function Poster({onRefresh, movie, loading}: Props) {
  
  const navigate = useNavigate();

  if (loading) {
    return <div className={st.root}>Loading...</div>
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
            <Button
              sx={{ width: "68px" }}
              variant="secondary"
              onClick={() => {}}
            >
              <LikeIcon />
            </Button>
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