import React, { useEffect, useState } from "react";
import st from "./GenrePage.module.scss";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/footer/Footer";
import GenreList from "../../components/layout/genreList/GenreList";
import { useAppDispatch } from "../../redux/store";
import { getGenres } from "../../redux/slices/genreReducer";
import MoviesInGenre from "../../components/layout/moviesInGenre/MoviesInGenre";

type Props = {};

export default function GenrePage({}: Props) {
  const dispatch = useAppDispatch();
  const [genre, setGenre] = useState("");
  function changeGenre(newGenre: string) {
    setGenre(newGenre);
  }
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        {genre ? <MoviesInGenre genre={genre} /> : <GenreList />}
        <Footer />
      </div>
    </div>
  );
}