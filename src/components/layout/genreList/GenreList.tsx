import React from "react";
import st from "./GenreList.module.scss";
import img from "../../../assets/genresImg.png";
import { useAppSelector } from "../../../redux/store";

type Props = {};

export default function GenreList({}: Props) {
  const { genres, loading, error } = useAppSelector((state) => state.genre);

  return (
    <div className={st.root}>
      <h1>Жанры фильмов</h1>
      <div className={st.body}>
        {genres.map((genre, index) => {
          return (
            <div key={index} className={st.card}>
              <img src={img} alt="Картинка жанра" />
              <div className={st.info}>
                <span>{genre}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
