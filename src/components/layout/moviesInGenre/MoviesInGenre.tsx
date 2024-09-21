import React, { useEffect, useState } from "react";
import st from "./MoviesInGenre.module.scss";
import BackIcon from "../../../assets/icons/BackIcon";
import FilmCard from "../../ui/filmCard/FilmCard";
import Button from "../../ui/button/Button";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getMoviesInGenre } from "../../../redux/slices/genreReducer";

type Props = {};

export default function MoviesInGenre({ }: Props) {
  const dispatch = useAppDispatch();
  const { name } = useParams();
  const { moviesInGenre } = useAppSelector((state) => state.genre)

  const [count, setCount] = useState(15)

  useEffect(() => {
    if (name) { dispatch(getMoviesInGenre({genre: name, count})) }
  }, [count])
  return (
    <div className={st.root}>
      <div className="container">
        <Link to={"/genres"} className={st.top}>
          <BackIcon />
          <h2>{name}</h2>
        </Link>
        <div className={st.body}>
          {moviesInGenre.map((movie) => { return <FilmCard key={movie.id} img={movie.posterUrl} id={movie.id} />; })}
        </div>
        {count < 55 && <div className={st.more}>
          <Button sx={{ width: "218px" }} variant="primary" onClick={() => {setCount((prev) => prev + 10)}}>
            Показать еще
          </Button>
        </div>}
      </div>
    </div>
  );
}
