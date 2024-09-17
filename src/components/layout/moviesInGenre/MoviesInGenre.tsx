import React from 'react'
import st from "./MoviesInGenre.module.scss"
import BackIcon from '../../../assets/icons/BackIcon'
import FilmCard from '../../ui/filmCard/FilmCard'
import Button from '../../ui/button/Button'

type Props = {
    genre: string,
}

export default function MoviesInGenre({genre}: Props) {
  return (
    <div className={st.root}>
      <div className={st.top}>
        <BackIcon />
        <h2>{genre}</h2>
      </div>
      <div className={st.body}>
        <FilmCard img={""} id={1} />
      </div>
      <div className={st.more}>
        <Button sx={{ width: "218px" }} variant="primary" onClick={() => {}}>
          Показать еще
        </Button>
      </div>
    </div>
  );
}